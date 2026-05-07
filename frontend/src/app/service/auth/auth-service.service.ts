import {computed, inject, Injectable, signal} from '@angular/core';
import { User } from '../../data/models/user';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {TokenResponse} from '../../data/models/tokenResponse';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private http = inject(HttpClient);

  loggedInUser = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.loggedInUser());

  constructor() { }

  registerUser(user: User) {
    return this.http.post<User>(`/api/register`, user);
  }

  loginUser(user: User) {
    return this.http.post<TokenResponse>(`/api/login`, user).pipe(
      tap( response => {
        this.loggedInUser.set(response.user);
        localStorage.setItem('motp_auth_token', response.token);
        }
      )
    )
  }

  logoutUser() {
    localStorage.removeItem('motp_auth_token');
    this.loggedInUser.set(null);
  }

}
