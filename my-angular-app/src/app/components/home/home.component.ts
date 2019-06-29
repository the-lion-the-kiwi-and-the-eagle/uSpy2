import { Component, OnInit, Inject, Input } from '@angular/core';
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import * as imageSource from "tns-core-modules/image-source";
import { TextField } from "tns-core-modules/ui/text-field";
import { TNSFancyAlert } from 'nativescript-fancyalert';
import { ListServiceService } from '../list/list-service.service'
import { RouterExtensions } from 'nativescript-angular/router';

import { Vision } from "../../services/vision";
import { ImageFormat } from "tns-core-modules/ui/enums";
import { ListComponent } from '../list/list.component';

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
  public lastPicture:any;
  public imageDescription:any;
  public firstTx: string = "";
  public isLoading:boolean = false;
  public item1:string = "";
  public item2:string = "";
  public item3:string = "";
  public item4:string = "";
  public count:number = 0;
  @Input() list: ListComponent;
  
  constructor(private router: RouterExtensions, @Inject(Vision) private vision: Vision, @Inject(ListComponent) private ListComponent: ListComponent, @Inject(ListServiceService) private ListServiceService: ListServiceService) {

  }


  ngOnInit() {
    const object = this.ListServiceService.currentList;
    console.log(object, 'fdsjhakfhdska')
    this.item1 = object[0]
    this.item2 = object[1]
    this.item3 = object[2]
    this.item4 = object[3]
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
            TNSFancyAlert.showSuccess(
              `You found the ${this.item1}!`,
              "Sweet!"
             );
             if(this.count === 4) {
               this.router.navigate(['/winner']);
             }
            console.log(this.count);
          } else if(this.imageDescription.includes(this.item2)) {
            this.count++;
            this.isCorrect2 = true;
            TNSFancyAlert.showSuccess(
              `You found the ${this.item2}!`,
              "Sweet!"
             );
             if(this.count === 4) {
              this.router.navigate(['/winner']);
            }
            console.log(this.count);
          } else if(this.imageDescription.includes(this.item3)) {
            this.count++;
            this.isCorrect3 = true;
            TNSFancyAlert.showSuccess(
              `You found the ${this.item3}!`,
              "Sweet!"
             );
             if(this.count === 4) {
              this.router.navigate(['/winner']);
            }
            console.log(this.count);
          } else if(this.imageDescription.includes(this.item4)) {
            this.count++;
            this.isCorrect4 = true;
            TNSFancyAlert.showSuccess(
              `You found the ${this.item4}!`,
              "Sweet!"
             );
             if(this.count === 4) {
              this.router.navigate(['/winner']);
            }
            console.log(this.count); 
          } else if (this.count === 4) {
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
