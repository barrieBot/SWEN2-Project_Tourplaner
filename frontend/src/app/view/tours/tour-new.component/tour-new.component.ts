import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiButton, TuiDataList, TuiInput, TuiLabel, TuiTitle} from '@taiga-ui/core';
import {TransportType} from '../../../data/models/transportType';
import {TourManager} from '../../../viewmodel/tour/tour-manager';
import {TuiCard, TuiHeader} from '@taiga-ui/layout';
import {TuiDataListWrapper, TuiSelect, TuiTabs, TuiTextarea} from '@taiga-ui/kit';
import {Router} from '@angular/router';
import {Location} from '../../../data/models/location';
import {LocationPicker} from '../../base_components/location-picker/location-picker';
import {MapComponent} from '../../base_components/map/map.component';
import {TourRequest} from '../../../data/models/tour'

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiLabel,
    TuiInput,
    TuiButton,
    TuiHeader,
    TuiCard,
    TuiTitle,
    TuiSelect,
    TuiDataListWrapper,
    TuiDataList,
    TuiTextarea,
    TuiTabs,
    LocationPicker,
    MapComponent
  ],
  selector: 'app-tour-new.component',
  styleUrl: './tour-new.component.scss',
  templateUrl: './tour-new.component.html',
})
export class TourNewComponent {
  tours = inject(TourManager);
  fb = inject(FormBuilder);
  router = inject(Router);

  protected activeTab = 0;

  tourForm = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    transportType: [TransportType.FOOT_WALKING, [Validators.required]],
    startLocation: [null as Location | null, [Validators.required]],
    endLocation: [null as Location | null, [Validators.required]],
  })

  protected readonly transportTypes = Object.values(TransportType);

  onRouteConfirmed(routeDetails: {start: Location, end:Location, transportType?: TransportType}): void {
    this.tourForm.patchValue({
      startLocation: routeDetails.start,
      endLocation: routeDetails.end,
      ...(routeDetails.transportType && { transportType: routeDetails.transportType }),
    })
  }

  onSubmit(){
    if(this.tourForm.invalid){
      return;
    }

    const newTour: TourRequest = {
      name: this.tourForm.value.name as string,
      description: this.tourForm.value.description as string,
      transportType: this.tourForm.value.transportType || TransportType.FOOT_WALKING,
      startLocationId: this.tourForm.value.startLocation?.id as number,
      endLocationId: this.tourForm.value.endLocation?.id as number
    }

    this.tours.postNewTour(newTour);
  }

  onCancel(){
    this.router.navigate(['/dashboard']);

  }

  setActiveTab(activeTab: number) {
    this.activeTab = activeTab;
  }
}
