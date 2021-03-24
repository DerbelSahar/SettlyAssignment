import { Directive } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]'
})
export class ConfirmPasswordDirective {

  constructor() { }

}


export const confirmPasswordValidator = (control: FormGroup): ValidationErrors | any => {
  const pass = control.get('password');
  const confirmPass = control.get('confirmPassword');

  return pass && confirmPass && pass.value !== confirmPass.value ? { 'passwordDenied': true } : null;
};
