import {Component, computed, effect, inject, input, OnInit} from '@angular/core';
import {LogListComponent} from '../../logs/log-list/log-list.component';
import {Router} from '@angular/router';
import {TourManagerService} from '../../../service/tour/tour-manager.service';
import {LogManagerService} from '../../../service/log/log-manager.service';

@Component({
  selector: 'app-tour-details',
  imports: [
    LogListComponent
  ],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss'
})
export class TourDetailsComponent implements OnInit {
  private router = inject(Router);
  public tourManager = inject(TourManagerService);
  public logManager = inject(LogManagerService);

  id = input<string | null>(null);
  tour = this.tourManager.selectedTour

  constructor() {
    effect(() => {
      const tourID = this.id()
      this.tourManager.setSelectedTour(tourID);

      if(tourID) {
        this.logManager.getTourLogByTour(tourID)
      }

    })
  }

  ngOnInit() {
    this.tourManager.setSelectedTour(this.id());
  }

  ngOnDestroy() {
    this.tourManager.setSelectedTour(null);
  }

  close(){
    this.tourManager.setSelectedTour(null)
    this.router.navigate(['/dashboard']);
  }


  edit() {
    /// Open Tour-Editor
  }

  addLog() {
    /// Open Log Editor
  }

  deleteTour() {
    /// Prompt "Are you sure or something"
  }
}
