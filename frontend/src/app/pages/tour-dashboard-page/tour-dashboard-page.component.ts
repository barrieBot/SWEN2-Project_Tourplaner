import {Component, inject} from '@angular/core';
import {TourListComponent} from '../../view/tours/tour-list/tour-list.component';
import {MapComponent} from '../../view/base_components/map/map.component';
import {TourDetailsComponent} from '../../view/tours/tour-details/tour-details.component';
import {RouterOutlet} from '@angular/router';
import {TourManagerService} from '../../service/tour/tour-manager.service';

@Component({
  selector: 'app-tour-dashboard-page',
  imports: [
    TourListComponent,
    MapComponent,
    RouterOutlet
  ],
  templateUrl: './tour-dashboard-page.component.html',
  styleUrl: './tour-dashboard-page.component.scss'
})
export class TourDashboardPageComponent {
  tours = inject(TourManagerService)
}
