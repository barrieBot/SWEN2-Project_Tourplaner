import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tour} from '../../../data/models/tour';

@Component({
  selector: 'app-tour-item',
  imports: [],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss'
})
export class TourItemComponent {
  @Input({required: true}) tourID?: string;
  @Output() selectTour = new EventEmitter<any>();

}
