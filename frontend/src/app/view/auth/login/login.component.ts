import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../service/auth/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth = inject(AuthServiceService);
  form = inject(FormBuilder);

  protected loginForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {}


  protected onSubmit() {
    if (this.loginForm.valid){

      /// send to auth.login
      /// Wait for response
      /// Display error?

      this.auth.loginUser({
        email: this.loginForm.getRawValue().email!.toString(),
        password: this.loginForm.getRawValue().password!.toString()
      })
    }
  }
}
