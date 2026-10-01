import {Component, computed, inject, signal} from '@angular/core';
import {LogItemComponent} from '../log-item/log-item.component';
import {LogManager} from '../../../viewmodel/log/log-manager';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import {TourManager} from '../../../viewmodel/tour/tour-manager';
import { LogEditorComponent } from '../log-editor/log-editor.component';
import {LogPostRequest} from '../../../data/models/log'
import {TuiButton, TuiDialogService} from '@taiga-ui/core';


@Component({
  selector: 'app-log-list',
  imports: [
    LogItemComponent,
    TuiButton,
  ],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss'
})
export class LogListComponent {

  logManager = inject(LogManager);
  tourManager = inject(TourManager);
  private readonly dialogs = inject(TuiDialogService);

  //logList =  this.logManager.displayLogs
  openedLogItem = signal<number|null>(null);


  toggleLogDetails(LogId: number): void {
    this.openedLogItem.update(open => open === LogId ? null : LogId);
  }

  addLog(): void {
    const tourId = this.tourManager.activeTourID();
    if (!tourId) return;

    this.dialogs
      .open<LogPostRequest>(new PolymorpheusComponent(LogEditorComponent), {
        dismissible: true,
        label: 'Create Tour Log',
      })
      .subscribe({
        next: (newLogData) => {
          // Replace with your actual LogManager create method
          this.logManager.postTourLog(tourId, newLogData);
        }
      });
  }

  refresh(tourId: number){
    const tour = this.tourManager.activeTourID();
    if(!tour) return;
    this.logManager.fetchTourLogs(tour)
    /// Get Selected tour from TourManager instead
  }

}
