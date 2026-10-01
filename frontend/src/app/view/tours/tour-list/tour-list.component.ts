import {Component, inject, signal} from '@angular/core';
import {Tour} from '../../../data/models/tour';
import {TourItemComponent} from '../tour-item/tour-item.component';
import {TourManager} from '../../../viewmodel/tour/tour-manager';
import {RouterLink} from '@angular/router';
import { TuiButton, TuiScrollbar } from '@taiga-ui/core';
import {TuiBadge, TuiRating} from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout'
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tour-list',
  imports: [
    RouterLink,
    TourItemComponent,
    TuiButton,
    TuiBadge,
    TuiCardLarge,
    TuiScrollbar,
    TuiRating,
    RouterLink,
    FormsModule
  ],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss'
})
export class TourListComponent {
  readonly tourManager = inject(TourManager);

  ngOnInit() {
    this.tourManager.fetchUserTours();
  }

}
