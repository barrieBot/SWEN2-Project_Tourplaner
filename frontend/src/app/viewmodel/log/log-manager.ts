import {inject, signal, computed, Injectable} from '@angular/core';
import { LogService } from '../../service/log/log.service'
import {Tour} from '../../data/models/tour';
import {Log, LogUpdateRequest, LogPostRequest} from '../../data/models/log';
import {finalize} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogManager {

  private logService = inject(LogService);

  public logList = signal<Log[]>([]);
  private activeLogID = signal<number | null>(null);

  readonly selectedLog =signal<Log | null>(null);
  readonly isLogSelected = computed(() => !!this.selectedLog());

  readonly isLoading = signal<boolean>(false);


  fetchTourLogs(tourId: number){
    this.isLoading.set(true);

    this.logService.fetchLogsForTour(tourId).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (response: any) => {
        const log = response.logs ? response.logs : response;
        this.logList.set(log || []);
      },
      error: error => {
        console.error(error);
      }
    })
  }


  postTourLog(tourId: number, log: LogPostRequest){
    this.logService.postLogToTour(tourId, log).subscribe({
      next: (postedLog: Log) => {
        this.logList.update(logs => [...logs, postedLog]);
      },
      error: error => {
        console.error(error);
      }
    });
  }


  updateTourLog(tourId: number, logId: number, log: LogUpdateRequest){
    this.logService.updateLog(tourId, logId, log).subscribe({
      next: (updatedLog: Log) => {
        this.logList.update(
          logs => logs.map(
            l => l.id === updatedLog.id ? updatedLog : l
          ));
      },
      error: error => {
        console.error(error);
      }
    });
  }


  deleteTourLog(tourId: number, logId: number){
    this.logService.deleteLog(tourId, logId).subscribe({
      next: () => {
        this.logList.update(logs => logs.filter(
          l => l.id !== logId
        ));
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getTourLogById(logId: number){
    return this.logList().find(log => log.id === logId) || null;
  }

  clearLogs(): void{
    this.logList.set([])
  }

}


