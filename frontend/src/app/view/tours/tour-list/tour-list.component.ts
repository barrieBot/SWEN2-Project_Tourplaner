import {Component, inject, signal} from '@angular/core';
import {Tour} from '../../../data/models/tour';
import {TourItemComponent} from '../tour-item/tour-item.component';
import {TourManagerService} from '../../../service/tour/tour-manager.service';

@Component({
  selector: 'app-tour-list',
  imports: [
    TourItemComponent
  ],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss'
})
export class TourListComponent {

  constructor(public tourManager: TourManagerService) {}

}
