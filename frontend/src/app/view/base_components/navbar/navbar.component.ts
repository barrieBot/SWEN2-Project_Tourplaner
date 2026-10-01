import { Component } from '@angular/core';
import {SearchBarComponent} from '../../search/search-bar/search-bar.component';
import {Router, RouterLink} from '@angular/router';
import {AuthServiceService} from '../../../service/auth/auth-service.service';
import {TuiButtonLoading, TuiFade, TuiTabs} from '@taiga-ui/kit';
import {TuiNavigation} from '@taiga-ui/layout';
import {TuiButton, TuiIcon} from '@taiga-ui/core';

@Component({
  selector: 'app-navbar',
  imports: [
    SearchBarComponent,
    RouterLink,
    TuiTabs,
    TuiNavigation,
    TuiIcon,
    TuiFade,
    TuiButton,
    TuiButtonLoading,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public router: Router, public auth: AuthServiceService) {}


  get isHome(): boolean{
    return !this.router.url.includes('auth')
  }

  get authLabel(): string{
    return this.router.url.includes('register') ? 'Login' : 'Register'
  }

  get authLink(): string{
    return this.router.url.includes('register') ? '/auth/login' : '/auth/register'
  }

}
