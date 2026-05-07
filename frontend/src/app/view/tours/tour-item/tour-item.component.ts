import {Component, computed, EventEmitter, inject, Input, Output} from '@angular/core';
import {Tour} from '../../../data/models/tour';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TourManagerService} from '../../../service/tour/tour-manager.service';

@Component({
  selector: 'app-tour-item',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss'
})
export class TourItemComponent {
  @Input({required: true}) tourID?: string;
  private tourManager = inject(TourManagerService);

  tour = computed(() =>
    this.tourManager.displayTourList().find(t => t.id === this.tourID));

}
