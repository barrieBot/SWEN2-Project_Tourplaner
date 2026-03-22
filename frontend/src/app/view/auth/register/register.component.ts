import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServiceService} from '../../../service/auth/auth-service.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  auth = inject(AuthServiceService);
  form = inject(FormBuilder);

  protected registerForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password_confirm: ['', [Validators.required]],
  });


  protected onSubmit(): void {
    if (this.registerForm.valid) {

      ///send to auth.register
      ///wait for response
      /// display error

      this.auth.registerUser({
        username: this.registerForm.getRawValue().username!.toString(),
        email: this.registerForm.getRawValue().email!.toString(),
        password: this.registerForm.getRawValue().password!.toString()
      })
    }
  }


}
