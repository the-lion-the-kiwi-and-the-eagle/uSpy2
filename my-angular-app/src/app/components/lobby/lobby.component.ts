import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SocketIO } from 'nativescript-socketio/socketio';

@Component({
  selector: 'ns-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  public games:any = [];
  public gameHash:any = {};
  public joinGame:string = 'created a game';
  public gameCount:number = 0;

  constructor(private router: RouterExtensions, private socketIO: SocketIO, private ref: ChangeDetectorRef) {}
// in here we are successfully receiving the host emails after they have created a game and joined a room
  ngOnInit() {
    // game created by user
    this.socketIO.on('game created', (hostEmail) => {
      // game added to queue if it doesn't already exist
      if (!this.games.includes(hostEmail)) {
        this.games.push(hostEmail);
        this.gameHash[this.gameCount] = hostEmail;
        this.gameCount += 1;
        console.log('a game was created by: ' + this.games[this.gameCount - 1] + "there are " + this.gameCount + " games available to join");
      } else {
        console.log('duplicate game created')
      }
      //refresh game list for all users
      this.socketIO.emit('refresh games', this.games);
      this.socketIO.on('refreshed list', (list) => {
      // adds games to games list from other users and refresh list
        list.forEach((game) => {
        if (!this.games.includes(game)) {
          this.games.unshift(game)
        this.ref.detectChanges(); 
      }
      this.ref.detectChanges(); 
    })
    this.ref.detectChanges(); 
  })
})
}
  startGame() {
    this.router.navigate(['/list'])
  }
  routeToGame(game) {
    // need to pass in id of game as parameter in route to route to individual game.
    // can access host's email via passing game into function that button fires with 
    console.log(game); 
    this.router.navigate([`/home/${game}`])
  }
  
}
