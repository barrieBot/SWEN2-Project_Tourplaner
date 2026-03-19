import { Component } from '@angular/core';
import {SearchBarComponent} from '../../search/search-bar/search-bar.component';
import {Router, RouterLink} from '@angular/router';
import {AuthServiceService} from '../../../service/auth/auth-service.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    SearchBarComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public router: Router, public authService: AuthServiceService) {}


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
