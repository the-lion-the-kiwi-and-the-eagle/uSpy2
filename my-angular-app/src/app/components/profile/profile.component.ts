import { Component, OnInit, Injectable, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FriendsService } from '../friends/friends.service';
import { SocketIO } from 'nativescript-socketio/socketio';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
@Injectable({ providedIn: 'root' })
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private socketIO:SocketIO, private LoginService: LoginService) { }

  ngOnInit() {
    console.log(this.LoginService.userEmail);
  }
  
  
  
  backButton() {
    this.router.navigate(['/list'])
  }
  
  homeNav() {
    this.router.navigate(['/home'])
  }
  
  friendNav() {
    this.router.navigate(['/friends']);
  }
  createGame() {
 
    this.socketIO.emit('create game', this.LoginService.userEmail) //need to emit the user who created the game's email.
    this.router.navigate(['/lobby'])
  }


}
