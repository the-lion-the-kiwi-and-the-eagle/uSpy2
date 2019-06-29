import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SocketIO } from "nativescript-socketio/socketio";

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: RouterExtensions, private socketIO:SocketIO) { }

  ngOnInit() {
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
    this.socketIO.connect();
    this.router.navigate(['/list']);
    console.log('this is gonna work!!!!!!')
  }
}
