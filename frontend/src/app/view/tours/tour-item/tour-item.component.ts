import {Component, computed, EventEmitter, inject, Input, Output} from '@angular/core';
import {Tour} from '../../../data/models/tour';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TourManager} from '../../../viewmodel/tour/tour-manager';
import {TuiBadge, TuiRating} from '@taiga-ui/kit';
import {TuiCardLarge} from '@taiga-ui/layout';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tour-item',
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiRating,
    TuiCardLarge,
    TuiBadge,
    FormsModule
  ],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss'
})
export class TourItemComponent {
  @Input({required: true}) tourID?: number;
  private tourManager = inject(TourManager);

  tour = computed(() =>
    this.tourManager.tourList().find(t => t.id === this.tourID));

  difficultyTag = computed(() =>{
    const diff = this.tour()?.difficulty ?? 0;
    if (diff <= 4) {
      return { label: `Easy (${diff})`, appearance: 'success' as const };
    }
    if(diff <= 8) {
      return { label: `Advanced (${diff})`, appearance: 'warning' as const };
    }
    return { label: `Difficult (${diff})`, appearance: 'critical' as const };
  });

}
