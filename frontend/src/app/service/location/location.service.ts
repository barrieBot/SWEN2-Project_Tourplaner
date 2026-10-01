import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location, LocationGeoRequest} from '../../data/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api/locations';

  getUserLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.baseUrl);
  }


  getAddressForLocation(GeoRequest: LocationGeoRequest): Observable<Location> {
    return this.http.post<Location>(this.baseUrl, GeoRequest);
  }


  searchLocations(lookup: string): Observable<Location[]> {
    const params = new HttpParams().set('lookup', lookup);
    return this.http.get<Location[]>(`${this.baseUrl}/search`, { params });
  }

}
