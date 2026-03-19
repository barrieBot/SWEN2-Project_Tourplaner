import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MapComponent} from '../../view/base_components/map/map.component';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterOutlet,
    MapComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
