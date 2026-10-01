import { Component, computed, effect, inject, input, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common'
import { Tour } from '../../../data/models/tour';
import {Location} from '../../../data/models/location';
import { LogListComponent } from '../../logs/log-list/log-list.component';
import { Router } from '@angular/router';
import { TourManager } from '../../../viewmodel/tour/tour-manager';
import { LogManager } from '../../../viewmodel/log/log-manager';
import { TuiButton, TuiScrollbar} from '@taiga-ui/core';
import { TuiTabs, TuiBadge, TuiRating } from '@taiga-ui/kit';
import {MapComponent} from '../../base_components/map/map.component'
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-tour-details',
  imports: [
    MapComponent,
    LogListComponent,
    CommonModule,
    FormsModule,
    TuiButton,
    TuiTabs,
    TuiBadge,
    TuiRating,
    TuiScrollbar,
    TuiTabs
  ],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss'
})
export class TourDetailsComponent {

  private tourManager = inject(TourManager);
  private logManager = inject(LogManager);
  private router = inject(Router);

  activeTabIndex = signal<number>(0);


  id = input<string | null>(null);
  tour = computed(() => this.tourManager.selectedTour());


  difficultyTag = computed(() =>{
    const diff = this.tour()?.difficulty ?? 0;
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


  onTapChange(tapIndex: number) {
    this.activeTabIndex.set(tapIndex)
    if(tapIndex === 0){

    }
  }

  close(){
    this.tourManager.setSelectedTour(null);
    this.router.navigate(['/dashboard']);
  }


  edit() {
    /// Open Tour-Editor
  }

  addLog() {
    /// Open Log Editor
    this.activeTabIndex.set(1);
  }

  deleteTour() {
    /// Prompt "Are you sure or something"
    if (confirm('Are you sure you want to delete this tour?')) {
      this.tourManager.deleteSelectedTour();
    }
  }
}
