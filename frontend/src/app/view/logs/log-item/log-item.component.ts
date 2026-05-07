import {Component, computed, inject, input, output, signal} from '@angular/core';
import {LogManagerService} from '../../../service/log/log-manager.service';
import {Log} from '../../../data/models/log';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-log-item',
  imports: [
    FormsModule
  ],
  templateUrl: './log-item.component.html',
  styleUrl: './log-item.component.scss'
})
export class LogItemComponent {

  private logManager = inject(LogManagerService)

  logID = input.required<string>()
  log = computed(() =>{
    return this.logManager.displayLogs().filter(Log => Log.id === this.logID())[0] || null
  });

  isExpanded = input.required<boolean>()

  isEditing = signal<boolean>(false)
  editingBuffer = signal<Log | null>(null)

  dirty = computed(() => {
    if(!this.editingBuffer()){ return false; }
    return JSON.stringify(this.editingBuffer()) !== JSON.stringify(this.log());
  })


  /// events
  open = output<void>()


  openEditor(){
    this.editingBuffer.set(this.log())
    this.isEditing.set(true)
  }

  discardEdits(){
    this.editingBuffer.set(null)
    this.isEditing.set(false)
  }

  saveEdits(){
    if(this.dirty()){
      this.logManager.updateTourLog('Placeholder', this.editingBuffer() as Log)
      /// Make updateTourLog async -> .then { ....
      this.isEditing.set(false)
      this.editingBuffer.set(null)
    }
  }

  deleteLog(){
    /// Confirm?
    this.logManager.deleteTourLog(this.logID())
  }




}
