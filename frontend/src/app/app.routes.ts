import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {TourDashboardPageComponent} from './pages/tour-dashboard-page/tour-dashboard-page.component';
import {authGuardGuard} from './guard/auth-guard.guard';
import {LoginComponent} from './view/auth/login/login.component';
import {RegisterComponent} from './view/auth/register/register.component';
import {TourDetailsComponent} from './view/tours/tour-details/tour-details.component';

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
    path: 'dashboard',
    component: TourDashboardPageComponent,
    canActivate: [authGuardGuard],
    children: [
      {
        path: 'tour/:id',
        component: TourDetailsComponent
      }
    ]
  }, {
    path: 'tour',
    component: TourDashboardPageComponent,
    canActivate: [authGuardGuard]
  }, {
    path: '**', redirectTo: '/dashboard'
  }

];
