import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SocketIO } from 'nativescript-socketio/socketio';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'ns-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  public games:any = ["CohortTroll", "spyMaster101_x", "mooty_ya_beuty"];
  public gameHash:any = {};
  public joinGame:string = 'created a game';
  public gameCount:number = 0;

  constructor(private router: RouterExtensions, private socketIO: SocketIO, private ref: ChangeDetectorRef, private LoginService: LoginService) {}
// in here we are successfully receiving the host emails after they have created a game and joined a room
  ngOnInit() {
    if (this.games.length === 0) {
      this.socketIO.emit('get games');

    }
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

      this.socketIO.on('give games', (allGames) => {
        allGames.forEach((game) => {

          this.games.unshift(game);
        })
        this.ref.detectChanges();
      })
      //refresh game list for all users
      this.socketIO.emit('refresh games', this.games);
      this.socketIO.on('refreshed list', (list) => {
      // adds games to games list from other users and refresh list
        list.forEach((game) => {
        if (!this.games.includes(game)) {
          this.games.unshift(game)
        
      }
      this.ref.detectChanges();
    })
  })
})
}

routeToGame(hostEmail) {
  let emails = {}
  emails['hostEmail'] = hostEmail;
  emails['playerEmail'] = this.LoginService.userEmail;
  // need to pass in id of game as parameter in route to route to individual game.
    // can access host's email via passing game into function that button fires with 
    console.log("this is the game you are joining:  " + hostEmail); 
    this.router.navigate([`/home/${hostEmail}`])
    // we need to send email from users who join games.
    // could inject from LoginService. this works
  console.log("this is the user who has joined the game:  " + this.LoginService.userEmail);
// send both hosts email and players email so that player can join hosts channel
this.socketIO.emit('user joined', (emails));

  }
  
}
