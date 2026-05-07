import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../service/auth/auth-service.service';
import {User} from '../../../data/models/user';

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
  router = inject(Router);

  protected loginForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required, Validators.minLength(8)],
  });

  constructor() {}


  protected onSubmit() {
    if (this.loginForm.valid){
      const user_credentials = this.loginForm.value as User;

      this.auth.loginUser(user_credentials).subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard'])
        },
        error: (err) => {
          /// empty the form
          /// set error-msg/error-label
        }
      })
    }
  }
}
