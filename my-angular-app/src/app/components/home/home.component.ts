import { Component, OnInit, Inject, Input, ChangeDetectorRef, NgZone } from '@angular/core';
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import * as imageSource from "tns-core-modules/image-source";
import { TextField } from "tns-core-modules/ui/text-field";
import { TNSFancyAlert } from 'nativescript-fancyalert';
import { ListServiceService } from '../list/list-service.service'
import { SocketIO } from "nativescript-socketio/socketio";
import { Vision } from "../../services/vision";
import { ImageFormat } from "tns-core-modules/ui/enums";
import { ListComponent } from '../list/list.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginService } from '../login/login.service';
import { mainThreadify } from 'tns-core-modules/utils/utils';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public player1:string = '';
  public player2:string = '';
  public player3:string = '';
  public isCorrect1:boolean = false;
  public isCorrect2:boolean = false;
  public isCorrect3:boolean = false;
  public isCorrect4:boolean = false;
  public isCorrect5:boolean = false;
  public isCorrect6:boolean = false;
  public isCorrect7:boolean = false;
  public isCorrect8:boolean = false;
  public isCorrect9:boolean = false;
  public isCorrect10:boolean = false;
  public isCorrect11:boolean = false;
  public isCorrect12:boolean = false;
  public lastPicture:any;
  public imageDescription:any;
  public firstTx: string = "";
  public isLoading:boolean = false;
  public item1:string = "";
  public item2:string = "";
  public item3:string = "";
  public item4:string = "";
  // public item5:string = "";
  // public item6:string = "";
  // public item7:string = "";
  // public item8:string = "";
  // public count:number = 0;
  // public test:string = "";
  @Input() list: ListComponent;
  
  constructor(
  @Inject(Vision) private vision: Vision, 
  @Inject(ListComponent) private ListComponent: ListComponent, 
  @Inject(ListServiceService) private ListServiceService: ListServiceService,
  @Inject(LoginService) private LoginService: LoginService, 
  private socketIO:SocketIO,
  private router: RouterExtensions,
  private ref: ChangeDetectorRef,
  private ngZone: NgZone,
  ) {}


  ngOnInit() {
    const object = this.ListServiceService.currentList;
    this.item1 = object[0]
    this.item2 = object[1]
    this.item3 = object[2]
    this.item4 = object[3]
    // this.item5 = object[0]
    // this.item6 = object[1]
    // this.item7 = object[2]
    // this.item8 = object[3]
    this.socketIO.on('join', (players) => {
      console.log(players)
      this.player1 = players.host
      this.player2 = players[1];
      this.player3 = players[2];
      this.ref.detectChanges();
      console.log(`${this.player1} is the host, ${this.player2} is player 2, ${this.player3} is player 3`);
    })
    this.ref.detectChanges();
    this.socketIO.on('render list', (list) => {
      console.log("this is a list" + list);
      if (this.ListServiceService.currentList.length === 0) {
        this.item1 = list[0]
        this.item2 = list[1]
        this.item3 = list[2]
        this.item4 = list[3]
        // this.item5 = list[0]
        // this.item6 = list[1]
        // this.item7 = list[2]
        // this.item8 = list[3]
        this.ref.detectChanges();
      }
    })
    this.socketIO.on('they scored1', (yes) => {
      console.log("light 1 turned on")
      this.isCorrect1 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored2', (yes) => {
      console.log("light 2 turned on")
      this.isCorrect2 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored3', (yes) => {
      console.log("light 3 turned on")
      this.isCorrect3 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored4', (yes) => {
      console.log("light 4 turned on")
      this.isCorrect4 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored5', (yes) => {
      console.log("light 5 turned on")
      this.isCorrect5 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored6', (yes) => {
      console.log("light 6 turned on")
      this.isCorrect6 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored7', (yes) => {
      console.log("light 7 turned on")
      this.isCorrect7 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored8', (yes) => {
      console.log("light 8 turned on")
      this.isCorrect8 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored9', (yes) => {
      console.log("light 9 turned on")
      this.isCorrect9 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored10', (yes) => {
      console.log("light 10 turned on")
      this.isCorrect10 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored11', (yes) => {
      console.log("light 11 turned on")
      this.isCorrect11 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored12', (yes) => {
      console.log("light 12 turned on")
      this.isCorrect12 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('finish', (message) => {
      console.log(message);
      this.ngZone.run(() => this.router.navigate(['/winner']).then());
    })
  }
  showEmail() {
    console.log("PLAYER1: " + this.player1, "PLAYER2: " + this.player2, "PLAYER3: " + this.player3);
  }

  getItems() {
    this.socketIO.emit('items', ({list: this.ListServiceService.currentList, username:this.LoginService.userEmail}));
  }

  public openCam() {
    camera.requestPermissions()
    .then(function success() {
          var options = { width: 150, height: 150, keepAspectRatio: false };
        //intitates camera passing in photo options
    return camera.takePicture(options)})
    .then((picture:any) => {
          this.isLoading = true;
          return imageSource.fromAsset(picture)
        })
    .then((img) => {
          this.lastPicture = img;
          console.log('request payload size is: ', this.lastPicture.toBase64String(ImageFormat.jpeg, 80).length);
          return this.vision.evaluatePicture(this.lastPicture.toBase64String(ImageFormat.jpeg, 80)) 
        })
    .then((evaluation) => {
          this.imageDescription = evaluation.things;

          //GAME LOGIC
          if(this.imageDescription.includes(this.item1)) {
            if (this.LoginService.userEmail === this.player1) {
            this.isCorrect1 = true;
            // coreect picture, emit to everyone to turn coreect 5 = true;
            this.socketIO.emit('correct1', ({correct: true, username: this.LoginService.userEmail}));
            
            TNSFancyAlert.showSuccess(
              `You found the ${this.item1}!`,
             );
            } else if (this.LoginService.userEmail === this.player2) {
              this.isCorrect5 = true;
            // coreect picture, emit to everyone to turn coreect 5 = true;
            this.socketIO.emit('correct5', ({correct: true, username: this.LoginService.userEmail}));
            
            TNSFancyAlert.showSuccess(
              `You found the ${this.item1}!`,
              "Sweet!"
             );
            } else if (this.LoginService.userEmail === this.player3) {
              this.isCorrect9 = true;
              this.socketIO.emit('correct9', ({correct: true, username: this.LoginService.userEmail}));
              TNSFancyAlert.showSuccess(
                `You found the ${this.item1}!`,
                "Sweet!"
               );
            }
             if(this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true || this.isCorrect9 === true && this.isCorrect10 === true && this.isCorrect11 === true && this.isCorrect12 === true) {
              this.socketIO.emit('end game', 'game is won'); 
              this.router.navigate(['/winner']);
             }
     
          } else if(this.imageDescription.includes(this.item2)) {
            if (this.LoginService.userEmail === this.player1) {
              this.isCorrect2 = true;
              this.socketIO.emit('correct2', ({correct: true, username: this.LoginService.userEmail}));
              TNSFancyAlert.showSuccess(
                `You found the ${this.item2}!`,
                "Sweet!"
               );
            } else if (this.LoginService.userEmail === this.player2) {
              this.isCorrect6 = true;
              this.socketIO.emit('correct6', ({correct: true, username: this.LoginService.userEmail}));
              TNSFancyAlert.showSuccess(
                `You found the ${this.item2}!`,
                "Sweet!"
               );
            } else {
              this.isCorrect10 = true;
              this.socketIO.emit('correct10', ({correct: true, username: this.LoginService.userEmail}));
            TNSFancyAlert.showSuccess(
              `You found the ${this.item2}!`,
             );
            }
           if(this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true || this.isCorrect9 === true && this.isCorrect10 === true && this.isCorrect11 === true && this.isCorrect12 === true) {
              this.socketIO.emit('end game', 'game is won');
              this.router.navigate(['/winner']);
            }
           
          } else if(this.imageDescription.includes(this.item3)) {
            if (this.LoginService.userEmail === this.player1) {
              this.isCorrect3 = true;

            this.socketIO.emit('correct3', ({correct: true, username: this.LoginService.userEmail}));
            TNSFancyAlert.showSuccess(
              `You found the ${this.item3}!`,
             );
            } else if (this.LoginService.userEmail === this.player2) {
              this.isCorrect7 = true;
              this.socketIO.emit('correct7', ({correct: true, username: this.LoginService.userEmail}));
              TNSFancyAlert.showSuccess(
                `You found the ${this.item3}!`,
                "Sweet!"
               );
            } else {
              this.isCorrect11 = true;
              this.socketIO.emit('correct11', ({correct: true, username: this.LoginService.userEmail}));
              TNSFancyAlert.showSuccess(
                `You found the ${this.item3}!`,
                "Sweet!"
               );
            }
          if(this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true || this.isCorrect9 === true && this.isCorrect10 === true && this.isCorrect11 === true && this.isCorrect12 === true) {
              this.socketIO.emit('end game', 'game is won');
              this.router.navigate(['/winner']);
            }
      
          } else if(this.imageDescription.includes(this.item4)) {
              if (this.LoginService.userEmail === this.player1) {
                this.isCorrect4 = true;
                this.socketIO.emit('correct4', ({correct: true, username: this.LoginService.userEmail}));
              TNSFancyAlert.showSuccess(
              `You found the ${this.item4}!`,
              "Sweet!"
             );
          } else if (this.LoginService.userEmail === this.player2) {
            this.isCorrect8 = true;
            this.socketIO.emit('correct8', ({correct: true, username: this.LoginService.userEmail}));
            TNSFancyAlert.showSuccess(
              `You found the ${this.item4}!`,
             );
          } else {
            this.isCorrect12 = true;
            this.socketIO.emit('correct12', ({correct: true, username: this.LoginService.userEmail}));
            TNSFancyAlert.showSuccess(
              `You found the ${this.item4}!`,
              "Sweet!"
             );
          }
            
          if(this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true || this.isCorrect9 === true && this.isCorrect10 === true && this.isCorrect11 === true && this.isCorrect12 === true) {
              this.socketIO.emit('end game', 'game is won');
              this.router.navigate(['/winner']);
            }
            
          } else if (this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true || this.isCorrect9 === true && this.isCorrect10 === true && this.isCorrect11 === true && this.isCorrect12 === true) {
            this.socketIO.emit('end game', 'game is won');
            this.router.navigate(['/winner']);
          } 
          else {
            TNSFancyAlert.showError(
              "Try again!"
             );
            console.log('you lost')
          }
          this.isLoading = false;
        })
    .catch((err) => {
      console.log(err);
          console.log("Error -> " + err.message);
          function failure() {
          console.log('wap wap waaammmmmm');
      }
    });
  }
}
