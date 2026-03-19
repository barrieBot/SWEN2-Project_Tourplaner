import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {TourDashboardPageComponent} from './pages/tour-dashboard-page/tour-dashboard-page.component';
import {authGuardGuard} from './guard/auth-guard.guard';
import {LoginComponent} from './view/auth/login/login.component';
import {RegisterComponent} from './view/auth/register/register.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: LoginPageComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
  },  {
    path: 'home',
    component: TourDashboardPageComponent,
    canActivate: [authGuardGuard]
  }, {
    path: 'search',
    component: TourDashboardPageComponent,
    canActivate: [authGuardGuard]
  }, {
    path: '**', redirectTo: '/home'
  }

];
