import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/// Q03 - Input validation

export const passwordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pwd = control.get('password');
  const pwd_confirm = control.get('password_confirm');

  return pwd && pwd_confirm && pwd.value !== pwd_confirm.value ? { passwordMismatch: true } : null;
}
