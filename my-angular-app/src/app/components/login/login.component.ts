import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';
import { TextField } from 'tns-core-modules/ui/text-field';

import { LoginService } from './login.service';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id
})
export class LoginComponent implements OnInit {
  // form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  isLogin = true;
  isLoading = false;
  @ViewChild('passwordEl', {static: false}) passwordEl: ElementRef<TextField>;
  @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;

  constructor(private router: RouterExtensions, private LoginService: LoginService) {}
  credentials = {
    email: "",
    password: ""
  }
  form = new FormGroup({
    email: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.minLength(6)]
    })
  });
  ngOnInit() {
    
    //this could be a problem here. Its doing a form.get to email, but theres not value on intiation of app. 
    // const email = this.form.get('email').value;
    // const password = this.form.get('password').value;
    // console.log({email, password})
    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = status === 'VALID';
    });
  }

  onSubmit() {
    console.log('heyyyy')
    console.log(this.credentials)
    // return;
    // this.emailEl.nativeElement.focus();
    // this.passwordEl.nativeElement.focus();
    // this.passwordEl.nativeElement.dismissSoftInput();

    // if (!this.form.valid) {
    //   console.log('ooopsy')
    //   return;
    // }

    // const email = this.form.get('email').value;
    // const password = this.form.get('password').value;
    // this.form.reset();
    const { email, password } = this.credentials;
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    this.isLoading = true;
    if (this.isLogin) {
      console.log({email, password})
      this.LoginService.login(email, password).subscribe(
        resData => {
          this.isLoading = false;
          this.router.navigate(['/profile']);
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      console.log({email, password}, 'this is signup')
      this.LoginService.signUpFirebase(email, password).subscribe(
        resData => {
          this.isLoading = false;
          this.router.navigate(['/profile']);
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
      this.LoginService.signUp(email, password).subscribe((dbData) => {
        console.log(dbData, 'this is the database data')
      })
    }
  }

  onDone() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}