import {computed, inject, Injectable, signal} from '@angular/core';
import { User, LoginRequest, RegisterRequest } from '../../data/models/user';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, throwError} from 'rxjs';
import {TokenResponse} from '../../data/models/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private http = inject(HttpClient);
  private readonly API_URL = "/api/auth";
  private readonly TOKEN_STORE = "motp_auth_token";

  readonly token = signal<string |  null >(null);
  readonly loggedInUser = signal<User | null>(null);
  readonly isLoggedIn = computed(() => !!this.token());


  registerUser(user: RegisterRequest) {
    console.log("Post: RegisterRequest", {...user, password: "[hidden]"});

    return this.http.post<User>(`${this.API_URL}/register`, user).pipe(
      tap(response => {
        console.log("Registration: SUCCESS", response);
      }),
      catchError((error) => {
        console.error("Registration: FAILED", error);
        return throwError(error);
      })
    );
  }

  loginUser(user: LoginRequest) {
    console.log("Post: LoginRequest", {...user, password: "[hidden]"});

    return this.http.post<TokenResponse>(`${this.API_URL}/login`, user).pipe(
      tap( response => {
        console.log("Login: SUCCESS", response.user);
        this.token.set(response.token);
        this.loggedInUser.set(response.user);
        localStorage.setItem(this.TOKEN_STORE, response.token);
        }
      ),
      catchError((error) =>{
        console.error("Login: FAILED", error);
        return throwError(error);
      })
    )
  }

  logoutUser() {
    localStorage.removeItem(this.TOKEN_STORE);
    this.loggedInUser.set(null);
  }

  getToken() {
    return this.token();
  }




}
