import {computed, inject, Injectable, signal} from '@angular/core';
import {Tour, TourUpdate, TourRequest} from '../../data/models/tour';
import {TransportType} from '../../data/models/transportType';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, tap, Observable} from 'rxjs';
import {SearchManagerService} from '../search/search-manager.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private http = inject(HttpClient)
  private readonly baseURL = '/api/tours';


  fetchUserTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.baseURL);
  }

  getTourById(tourID: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.baseURL}/${tourID}`);
  }

  postTour(tour:TourRequest): Observable<Tour> {
    return this.http.post<Tour>(this.baseURL, tour);
  }

  updateTour(tourId: number, tour_update:TourUpdate): Observable<Tour> {
    return this.http.put<Tour>(`${this.baseURL}/${tourId}`, tour_update);
  }

  deleteTour(tourID: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${tourID}`);
  }

}
