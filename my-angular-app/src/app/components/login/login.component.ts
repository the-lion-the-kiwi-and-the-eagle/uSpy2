import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { RouterExtensions } from 'nativescript-angular/router';


@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id
})
export class LoginComponent implements OnInit {


  constructor(private router: RouterExtensions) { }

  ngOnInit() {
    
  }

  onSignin() {
    this.router.navigate(['/home'], { clearHistory: true });
  }

}
