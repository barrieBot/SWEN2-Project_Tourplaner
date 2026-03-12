import { Component } from '@angular/core';
import {SearchBarComponent} from '../../search/search-bar/search-bar.component';

@Component({
  selector: 'app-navbar',
  imports: [
    SearchBarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
