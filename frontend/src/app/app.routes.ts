import { Routes } from '@angular/router';
import {LoginComponent} from './view/auth/login/login.component';
import {RegisterComponent} from './view/auth/register/register.component';
import {TourDashboardPageComponent} from './pages/tour-dashboard-page/tour-dashboard-page.component';
import {authGuardGuard} from './guard/auth-guard.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'home',
    component: TourDashboardPageComponent,
    canActivate: [authGuardGuard]
  }, {
    path: '**', redirectTo: '/home'
  }

];
