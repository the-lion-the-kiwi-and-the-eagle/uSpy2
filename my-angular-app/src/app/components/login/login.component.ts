import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

var firebase = require('nativescript-plugin-firebase')

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    firebase.login({
      type: firebase.LoginType.GOOGLE,
      // Optional 
      googleOptions: {
        hostedDomain: "mygsuitedomain.com",
        // NOTE: no need to add 'profile' nor 'email', because they are always provided
        // NOTE 2: requesting scopes means you may access those properties, but they are not automatically fetched by the plugin
        scopes: ['https://www.googleapis.com/auth/user.birthday.read']
      }
    }).then(
        function (result) {
          JSON.stringify(result);
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
    );
    
  }

}
