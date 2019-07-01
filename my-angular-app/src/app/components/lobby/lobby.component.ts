import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SocketIO } from 'nativescript-socketio/socketio';

@Component({
  selector: 'ns-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  public games:Array<string> = ["default game"];
  public test: string = 'init';

  constructor(private router: RouterExtensions, private socketIO: SocketIO) {}
// in here we are successfully receiving the host emails after they have created a game and joined a room
  ngOnInit() {
    this.socketIO.on('game created', (hostEmail) => {
      this.games.push(hostEmail);
      this.test = 'done'  + Math.random();
      console.log('a game was created by: ' + this.games);
    })
  }

  startGame() {
    this.router.navigate(['/home'])
  }

  showGames() {
    console.log(this.games);
  }
}
