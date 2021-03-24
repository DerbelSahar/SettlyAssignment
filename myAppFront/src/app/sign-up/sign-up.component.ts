import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { confirmPasswordValidator } from 'src/app/Directives/confirm-password.directive';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({});
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void { 
    this.signUpForm = this.formBuilder.group({
      firstname:['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      recaptchaReactive: ['', [Validators.required]]
     
    });
  }
  get f() { return this.signUpForm.controls; }
  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
   
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
        return;
    }
    this.auth.signUp(this.f.firstname.value,this.f.email.value, this.f.password.value, this.f.confirmPassword.value).subscribe(data => {
    if (data.success)
      {
        localStorage.setItem("currentUser", data.success.name);
        this.router.navigate(["/login"]);
      }

    });
}

onReset() {
    this.submitted = false;
    this.signUpForm.reset();
}
}