import {Component, effect, inject, output, signal} from '@angular/core';
import {LocationManager} from '../../../viewmodel/location/location-manager';
import {Location, LocationGeoRequest} from '../../../data/models/location';
import {LatLng} from 'leaflet';
import {TuiButton, TuiDataList, TuiFilterByInputPipe, TuiIcon, TuiLoader} from '@taiga-ui/core';
import {
  TuiChevron, TuiComboBox,
  TuiDataListWrapperComponent,
  TuiSelect,
  TuiStringifyContentPipe,
  TuiStringifyPipe
} from '@taiga-ui/kit';
import {MapComponent} from '../map/map.component';
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import {TransportType} from '../../../data/models/transportType';


type ActiveLocationPicker = "from" | "to" | null;

@Component({
  standalone: true,
  imports: [
    TuiLoader,
    TuiDataListWrapperComponent,
    MapComponent,
    TuiButton,
    TuiIcon,
    FormsModule,
    TuiDataList,
    TuiSelect,
    TuiStringifyPipe,
    TuiChevron,
    TuiStringifyContentPipe,
    TuiFilterByInputPipe,
    TuiComboBox,
    ReactiveFormsModule,
  ],
  selector: 'app-location-picker',
  styleUrl: './location-picker.scss',
  templateUrl: './location-picker.html',
})
export class LocationPicker {
  readonly locationManager = inject(LocationManager);
  readonly activeLocationPicker = signal<ActiveLocationPicker>(null);
  private pendingLocationRequestPicker = signal<ActiveLocationPicker>(null);

  readonly startLocation = signal<Location | null>(null);
  readonly startPreselection = signal<LocationGeoRequest | null>(null);

  readonly endLocation = signal<Location | null>(null);
  readonly endPreselection = signal<LocationGeoRequest | null>(null);

  selectedTransportType = new FormControl<TransportType>(TransportType.DRIVING_CAR, {
    nonNullable: true
  });
  protected readonly transportTypes = Object.values(TransportType);


  readonly confirmedRoute = output<{start: Location, end: Location, transportType?: TransportType}>();
  readonly stringifyLocation = (item: Location): string => item?.address || '';

  constructor() {
    this.locationManager.fetchUserLocations();

    effect(() => {
      const resolvedAddressLookup = this.locationManager.geoResolvedLocation();
      const resolverTarget = this.pendingLocationRequestPicker();

      if(resolvedAddressLookup && resolverTarget) {
        if(resolverTarget == 'from') {
          this.startLocation.set(resolvedAddressLookup);
          this.startPreselection.set(null);
        } else if(resolverTarget == 'to') {
          this.endLocation.set(resolvedAddressLookup);
          this.endPreselection.set(null);
        }
        this.pendingLocationRequestPicker.set(null);
      }
    })
  }


  toggle(target: 'from' | 'to') {
    const setPickerState: ActiveLocationPicker = this.activeLocationPicker() === target ? null : target;
    this.activeLocationPicker.set(setPickerState);
  }


  onMapLocationSelection(coords: LatLng){
    const target = this.activeLocationPicker();
    if(!target) {
      return;
    }
    const geoRequest = {latitude: coords.lat, longitude: coords.lng};
    if(target == 'from') {
      this.startPreselection.set(geoRequest);
    } else if(target == 'to') {
      this.endPreselection.set(geoRequest);
    }
    this.activeLocationPicker.set(null)
  }


  confirmPreselection(target: ActiveLocationPicker) {
    if(this.locationManager.isLoading() || !target) {
      return
    }
    const confirmLocation = target === 'from' ?
      this.startPreselection() : this.endPreselection();
    if(!confirmLocation) {
      return;
    }
    this.pendingLocationRequestPicker.set(target);
    this.locationManager.resolveAddressForLocation(confirmLocation);
  }


  clearSelection(target: ActiveLocationPicker) {
    if(!target){
      return;
    }

    if(this.locationManager.isLoading()
      && target === this.pendingLocationRequestPicker()
    ) { return; }

    if(target == 'from') {
      this.startLocation.set(null);
      this.startPreselection.set(null);
    } else if(target == 'to') {
      this.endLocation.set(null);
      this.endPreselection.set(null);
    }
  }


  confirmRoute(){
    const start = this.startLocation();
    const end = this.endLocation();
    const transportType = this.selectedTransportType.value;

    if(start && end ) {
      this.confirmedRoute.emit({start, end, transportType});
    }
  }

  onSelectExisting(location: Location, target: ActiveLocationPicker) {
    if(!target || !location) {
      return;
    }
    if(target === 'from') {
      this.startLocation.set(location);
      this.startPreselection.set(null);
    } else if(target == 'to') {
      this.endLocation.set(location);
      this.endPreselection.set(null);
    }
    this.activeLocationPicker.set(null);

  }

}
