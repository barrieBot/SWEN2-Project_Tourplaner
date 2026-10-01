import {inject, Injectable, Service, signal} from '@angular/core';
import {LocationService} from '../../service/location/location.service';
import {Location, LocationGeoRequest} from '../../data/models/location';
import {finalize} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationManager {

  private locationService = inject(LocationService);

  readonly userLocations = signal<Location[]>([]);
  readonly searchLocations = signal<Location[]>([]);
  readonly geoResolvedLocation = signal<Location | undefined | null>(null);

  readonly isLoading = signal<boolean>(false);

  fetchUserLocations(){
    this.isLoading.set(true);

    this.locationService.getUserLocations().pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (locations) => {
        console.log("Fetching User-locations: SUCCESS", locations.length)
        this.userLocations.set(locations);
      },
      error: (error) => {
        console.error("Failed to fetch user-locations", error);
      }
    })
  }

  resolveAddressForLocation(location: LocationGeoRequest){
    this.isLoading.set(true);
    this.geoResolvedLocation.set(null);

    this.locationService.getAddressForLocation(location).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (locations) => {
        console.log("Fetching Address: SUCCESS")
        this.geoResolvedLocation.set(locations);
      },
      error: (error) => {
        this.geoResolvedLocation.set(undefined);
        console.error("Failed to fetch address for location", error);
      }
    })
  }

  searchLocationsForAddress(address: String){
    const searchForAddress = address.trim();
    if(searchForAddress.length < 3){
      this.searchLocations.set([]);
      return
    }

    this.isLoading.set(true);
    this.locationService.searchLocations(searchForAddress).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (locations) => {
        console.log("Fetching Locations for Address: SUCCESS")
        this.searchLocations.set(locations);
      },
      error: (error) => {
        this.geoResolvedLocation.set(undefined);
        console.error("Failed to fetch Address-Lookup", error);
      }
    })

  }

  clearSearch(){
    this.searchLocations.set([]);
  }

}
