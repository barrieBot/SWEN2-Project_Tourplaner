import {Component, computed, inject, signal} from '@angular/core';
import {LogItemComponent} from '../log-item/log-item.component';
import {LogManagerService} from '../../../service/log/log-manager.service';

@Component({
  selector: 'app-log-list',
  imports: [
    LogItemComponent
  ],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss'
})
export class LogListComponent {
  logManager = inject(LogManagerService);
  logList =  this.logManager.displayLogs
  openedLogItem = signal<string|null>(null);

  toggleLogDetails(LogId: string): void {
    this.openedLogItem.update(open => open === LogId ? null : LogId);
  }

  addLog(){

  }

  refresh(){
    this.logManager.fetchTourLogs('Placeholder')
    /// Get Selected tour from TourManager instead
  }

}
