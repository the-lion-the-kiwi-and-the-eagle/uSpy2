import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';
import { TextField } from 'tns-core-modules/ui/text-field';

// import { FriendService } from './friends.service';
import { FrameService } from 'nativescript-angular/platform-providers';
import { FriendsService } from '../friends/friends.service';

@Component({
  selector: 'ns-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

    emailControlIsValid = true;
    @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;

  constructor(private router: RouterExtensions, private loginService: FrameService, private friendsService: FriendsService) { }
  credentials = {
    email: "",
  }

  form = new FormGroup({
    email: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email]
    }),
  });

  ngOnInit() {
    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });
  } 

  onSubmit(arg) {
    //  console.log(this.credentials)
    const friendEmail = arg;
    const userEmail = this.loginService.credentials.email;
    this.emailControlIsValid = true;
      console.log(friendEmail, "{{{{{{{{{{")
      this.friendsService.inviteFriend(friendEmail, userEmail).subscribe(tasks =>{
        console.log(tasks);
      });

  }
//     this.isLoading = true;
//     if (this.isLogin) {
//       this.LoginService.login(email, password).subscribe(
//         resData => {
//           this.isLoading = false;
//           this.router.navigate(['/profile']);login.service.ts
//         },
//         err => {
//           console.log(err);
//           this.isLoading = false;
//         }
//       );
//     } else {
//       console.log({email, password}, 'this is signup')
//       this.LoginService.signUpFirebase(email, password).subscribe(
//         resData => {
//           this.isLoading = false;
//           this.router.navigate(['/profile']);
//         },
//         err => {
//           console.log(err);
//           this.isLoading = false;
//         }
//       );
//       this.LoginService.signUp(email, password).subscribe((dbData) => {
//         console.log(dbData, 'this is the database data')
//       })
//     }
//   }

//   onDone() {
//     this.emailEl.nativeElement.focus();
//     this.passwordEl.nativeElement.focus();
//     this.passwordEl.nativeElement.dismissSoftInput();
//   }

//   onSwitch() {
//     this.isLogin = !this.isLogin;
//   }

}
