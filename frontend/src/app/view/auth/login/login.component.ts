import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../service/auth/auth-service.service';

import {LoginRequest, User} from '../../../data/models/user';
import {TuiButton, TuiError, TuiIcon, TuiInput, TuiNotification, TuiTextfield} from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';


@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    TuiButton,
    TuiError,
    TuiNotification,
    TuiTextfield,
    TuiPassword,
    TuiError,
    TuiError,
    AsyncPipe,
    ReactiveFormsModule,
    TuiInput,
    TuiIcon,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth = inject(AuthServiceService);
  form = inject(FormBuilder);
  router = inject(Router);

  protected loginForm = this.form.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor() {}


  protected onSubmit() {
    if (this.loginForm.valid){
      const user_credentials = this.loginForm.value as LoginRequest;

      this.auth.loginUser(user_credentials).subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }
}
