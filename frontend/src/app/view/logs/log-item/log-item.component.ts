import {Component, computed, inject, input, output, signal} from '@angular/core';
import {LogManager} from '../../../viewmodel/log/log-manager';
import {Log, LogPostRequest} from '../../../data/models/log';
import {FormsModule} from '@angular/forms';
import {TuiBadge, TuiRating} from '@taiga-ui/kit';
import {TuiButton, TuiExpand, TuiDialogService, TuiIcon} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@taiga-ui/polymorpheus';
import {LogEditorComponent} from '../log-editor/log-editor.component';
import {TourManager} from '../../../viewmodel/tour/tour-manager';

@Component({
  selector: 'app-log-item',
  imports: [
    FormsModule,
    TuiRating,
    TuiBadge,
    TuiExpand,
    TuiButton,
    TuiIcon
  ],
  templateUrl: './log-item.component.html',
  styleUrl: './log-item.component.scss'
})
export class LogItemComponent {

  private tourManager = inject(TourManager);
  private logManager = inject(LogManager);
  private readonly dialogs = inject(TuiDialogService);

  logID = input.required<number>();
  isExpanded = input.required<boolean>();
  open = output<void>();

  log = computed(() =>{
    return this.logManager.logList().filter(Log => Log.id === this.logID())[0] || null
  });


  difficultyTag = computed(() =>{
    const diff = this.log()?.difficulty ?? 0;
    if (diff <= 4) {
      return {
        label: `Easy (${diff})`,
        appearance: 'success' as const
      };
    }
    if(diff <= 8) {
      return {
        label: `Advanced (${diff})`,
        appearance: 'warning' as const
      };
    }
    return {
      label: `Difficult (${diff})`,
      appearance: 'critical' as const
    };
  });


  deleteLog(tourId: number){
    this.logManager.deleteTourLog(tourId, this.logID())
  }



  openEditor(){
    const currentLog = this.log();
    if (!currentLog) return;

    this.dialogs
      .open<LogPostRequest>(new PolymorpheusComponent(LogEditorComponent), {
        data: currentLog, // Pre-fills the modal
        dismissible: true,
        label: 'Edit Tour Log',
      })
      .subscribe({
        next: (updatedLogData) => {
          // Replace with your actual LogManager update method
          const tourId = this.tourManager.activeTourID();
          if(!tourId) return;
          this.logManager.updateTourLog(tourId, currentLog.id, updatedLogData);
        }
      });
  }



}
