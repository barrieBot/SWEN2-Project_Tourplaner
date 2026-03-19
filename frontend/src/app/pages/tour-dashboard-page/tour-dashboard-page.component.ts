import { Component } from '@angular/core';
import {TourListComponent} from '../../view/tours/tour-list/tour-list.component';
import {MapComponent} from '../../view/base_components/map/map.component';
import {TourDetailsComponent} from '../../view/tours/tour-details/tour-details.component';

@Component({
  selector: 'app-tour-dashboard-page',
  imports: [
    TourListComponent,
    MapComponent,
    TourDetailsComponent
  ],
  templateUrl: './tour-dashboard-page.component.html',
  styleUrl: './tour-dashboard-page.component.scss'
})
export class TourDashboardPageComponent {

}
