import {computed, inject, Injectable, signal} from '@angular/core';
import {Log} from '../../data/models/log';
import {TourManagerService} from '../tour/tour-manager.service';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogManagerService {

  private http = inject(HttpClient);
  private LogList = signal<Log[]>([])
  displayLogs = computed(() => {
    return this.mockedLogs
  })

  private TourManager = inject(TourManagerService)

  constructor() { }


  fetchTourLogs(TourId: string) {
    this.http.get<{logs: Log[]}>(`/api/tours/${TourId}/logs`).subscribe({
      next: (tour) => {
        this.LogList.set(tour.logs || [])
      },
      error: (err) => {
        /// Error
      }
    })
  }

  postTourLog(tourID: string, log: Log){
    return this.http.post<Log>(`/api/tours/${tourID}/log`, log).pipe(
      tap(log => {
        this.LogList.update(logs => [...logs, log]);
      })
    )
  }

  deleteTourLog(logID: string){
    this.http.delete(`/api/logs/${logID}`).subscribe({
      next: (log) => {
        this.LogList.update(logs => logs.filter(log => log.id !== logID));
      },
      error: (err) => {
        /// Error
      }
    })
  }

  updateTourLog(logID: string, log: Log){
    return this.http.put<Log>(`/api/logs/${logID}`, log).pipe(
      tap(updatedLog => {
        this.LogList.update(logs =>
          logs.map(l => l.id === logID ? updatedLog : l)
        )
      })
    )
  }



  getTourLogByID(id: string): Log{
    return this.mockedLogs[0]
  }

  getTourLogByTour(id: string): Log[]{
    return [];
  }




  private mockedLogs: Log[] = [
    {
      id: 'log1',
      dateTime: '1234.24.45-12.34.56',
      comment: 'first log: all good',
      difficulty: 2,
      totalDistance: 10,
      totalTime: 15,
      rating: 3
    },{
      id: 'log2',
      dateTime: '4321.24.45-12.34.56',
      comment: 'second log: all bad',
      difficulty: 5,
      totalDistance: 15,
      totalTime: 20,
      rating: 1
    },{
      id: 'log3',
      dateTime: '1234.24.45-12.34.56',
      comment: 'third log: asdf',
      difficulty: 5,
      totalDistance: 9,
      totalTime: 16,
      rating: 5
    },{
      id: 'log4',
      dateTime: '1234.24.45-12.34.56',
      comment: 'forth log: lol',
      difficulty: 5,
      totalDistance: 10,
      totalTime: 80,
      rating: 2
    }
  ]
}
