
import { Component, OnInit, Injectable, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FriendsService } from '../friends/friends.service';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { SocketIO } from 'nativescript-socketio/socketio';

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
@Injectable({ providedIn: 'root' })
export class ProfileComponent implements OnInit {
  public profilePics:Array<string> = ["Kramer.jpg", "danny.jpg", "michael.png", "peter.png", "stewie.png"]

  public profilePic:string = this.profilePics[Math.floor(Math.random() * this.profilePics.length)]
  constructor(private router: Router, private socketIO:SocketIO, private LoginService: LoginService, private FriendsService: FriendsService) { }

  ngOnInit() {
    this.LoginService.profilePic
  }
  
  
  backButton() {
    this.router.navigate(['/list'])
  }
  
  lobbyNav() {
    this.router.navigate(['/lobby'])
  }
  
  friendNav() {
    this.router.navigate(['/friends']);
  }
  onSubmit() {
    console.log( this.LoginService.userEmail, "###########");
    this.FriendsService.getFriends(this.LoginService.userEmail)
    .subscribe(friends =>{
      console.log(friends);
    });
    console.log(this.FriendsService.getFriends);

  }
  createGame() {
    this.socketIO.emit('create game', this.LoginService.userEmail) //need to emit the user who created the game's email.
    this.router.navigate(['/list'])
  }

}
