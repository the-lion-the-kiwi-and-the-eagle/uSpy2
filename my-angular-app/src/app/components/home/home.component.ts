import { Component, OnInit, Inject, Input, ChangeDetectorRef } from '@angular/core';
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

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isCorrect1:boolean = false;
  public isCorrect2:boolean = false;
  public isCorrect3:boolean = false;
  public isCorrect4:boolean = false;
  public isCorrect5:boolean = false;
  public isCorrect6:boolean = false;
  public isCorrect7:boolean = false;
  public isCorrect8:boolean = false;
  public lastPicture:any;
  public imageDescription:any;
  public firstTx: string = "";
  public isLoading:boolean = false;
  public item1:string = "";
  public item2:string = "";
  public item3:string = "";
  public item4:string = "";
  public item5:string = "";
  public item6:string = "";
  public item7:string = "";
  public item8:string = "";
  public count:number = 0;
  public test:string = "";
  @Input() list: ListComponent;
  
  constructor(
  @Inject(Vision) private vision: Vision, 
  @Inject(ListComponent) private ListComponent: ListComponent, 
  @Inject(ListServiceService) private ListServiceService: ListServiceService,
  @Inject(LoginService) private LoginService: LoginService, 
  private socketIO:SocketIO,
  private router: RouterExtensions,
  private ref: ChangeDetectorRef
  ) {}


  ngOnInit() {
    const object = this.ListServiceService.currentList;
    
    this.item1 = object[0]
    this.item2 = object[1]
    this.item3 = object[2]
    this.item4 = object[3]
    this.item5 = object[0]
    this.item6 = object[1]
    this.item7 = object[2]
    this.item8 = object[3]
    this.socketIO.on('join', (message) => {
      console.log(message);
      this.test = message;
      this.ref.detectChanges();
    })
    this.ref.detectChanges();
    this.socketIO.on('render list', (list) => {
      console.log("this is a list" + list);
      if (this.ListServiceService.currentList.length === 0) {
        this.item1 = list[0]
        this.item2 = list[1]
        this.item3 = list[2]
        this.item4 = list[3]
        this.item5 = list[0]
        this.item6 = list[1]
        this.item7 = list[2]
        this.item8 = list[3]
        this.ref.detectChanges();
      }
    })
    this.socketIO.on('they scored5', (yes) => {
      console.log(yes);
      this.isCorrect5 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored6', (yes) => {
      console.log(yes);
      this.isCorrect6 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored7', (yes) => {
      console.log(yes);
      this.isCorrect7 = yes;
      this.ref.detectChanges();
    })
    this.socketIO.on('they scored8', (yes) => {
      console.log(yes);
      this.isCorrect8 = yes;
      this.ref.detectChanges();
    })
  }
  endGame() {
    this.socketIO.disconnect();
    this.router.navigate(['/profile'])
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
      console.log(evaluation);
          this.imageDescription = evaluation.things;
          console.log(typeof this.imageDescription, 'hel;llllo')
          if(this.imageDescription.includes(this.item1)) {
            this.count++;
            this.isCorrect1 = true;
            // coreect picture, emit to everyone to turn coreect 5 = true;
            this.socketIO.emit('correct1', ({correct: true, username: this.LoginService.userEmail}));
            
            TNSFancyAlert.showSuccess(
              `You found the ${this.item1}!`,
              "Sweet!"
             );
             if(this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true) {
               this.router.navigate(['/winner']);
             }
            console.log(this.count);
          } else if(this.imageDescription.includes(this.item2)) {
            this.count++;
            this.isCorrect2 = true;

            this.socketIO.emit('correct2', ({correct: true, username: this.LoginService.userEmail}));
            TNSFancyAlert.showSuccess(
              `You found the ${this.item2}!`,
              "Sweet!"
             );
             if(this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true) {
              this.router.navigate(['/winner']);
            }
            console.log(this.count);
          } else if(this.imageDescription.includes(this.item3)) {
            this.count++;
            this.isCorrect3 = true;

            this.socketIO.emit('correct3', ({correct: true, username: this.LoginService.userEmail}));
            TNSFancyAlert.showSuccess(
              `You found the ${this.item3}!`,
              "Sweet!"
             );
             if(this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true) {
              this.router.navigate(['/winner']);
            }
            console.log(this.count);
          } else if(this.imageDescription.includes(this.item4)) {
            this.count++;
            this.isCorrect4 = true;

            this.socketIO.emit('correct4', ({correct: true, username: this.LoginService.userEmail}));
            TNSFancyAlert.showSuccess(
              `You found the ${this.item4}!`,
              "Sweet!"
             );
             if(this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true) {
              this.router.navigate(['/winner']);
            }
            console.log(this.count); 
          } else if (this.isCorrect1 === true && this.isCorrect2 === true && this.isCorrect3 === true && this.isCorrect4 === true || this.isCorrect5 === true && this.isCorrect6 === true && this.isCorrect7 === true && this.isCorrect8 === true) {
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
