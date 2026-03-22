import {computed, inject, Injectable, signal} from '@angular/core';
import { User } from '../../data/models/user';
import {Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  router = inject(Router)

  loggedInUser = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.loggedInUser);

  constructor() { }

  registerUser(user: User) {
    /// Send to /api/register

    /// Error-Response -> Reset Form, Error-Msg

    /// Success-Response
    /// Succes-msg?

    /// Forward to Login:
    this.router.navigate(['/auth/login']);
  }

  loginUser(user: User) {
    /// Send to /api/login

    /// Error-Response -> Reset form? Error-Msg

    /// Success-Response
    this.loggedInUser.set(user);
    /// Switch to /dashboard
    this.router.navigate(['/dashboard']);

  }

  logoutUser() {
    this.loggedInUser.set(null);
    /// Forward to Login? -> Router/Auth-Guard?
  }

}
