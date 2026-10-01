import {computed, inject, Injectable, signal} from '@angular/core';
import {Log, LogUpdateRequest} from '../../data/models/log';
import {TourService} from '../tour/tour.service';
import {HttpClient} from '@angular/common/http';
import { LogPostRequest } from '../../data/models/log'
import {tap, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private http = inject(HttpClient);


  private getBaseUrl(tourId: number){
    return 'api/tours/' + tourId + '/logs'
  }


  fetchLogsForTour(tourId: number): Observable<Log[]>{
    return this.http.get<Log[]>(this.getBaseUrl(tourId));
  }

  getLogById(tourId: number, LogId: number): Observable<Log>{
    return this.http.get<Log>(`${this.getBaseUrl(tourId)}/${LogId}`)
  }

  postLogToTour(tourId: number, LogPostRequest: LogPostRequest): Observable<Log> {
    return this.http.post<Log>(this.getBaseUrl(tourId), LogPostRequest)
  }

  updateLog(tourId: number, logId: number, LogUpdate: LogUpdateRequest): Observable<Log> {
    return this.http.put<Log>(`${this.getBaseUrl(tourId)}/${logId}`, LogUpdate)
  }

  deleteLog(tourId: number, logId: number): Observable<void> {
    return this.http.delete<void>(`${this.getBaseUrl(tourId)}/${logId}`)
  }

}
