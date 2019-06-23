import { Component, OnInit, Inject } from '@angular/core';
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import * as imageSource from "tns-core-modules/image-source";
import { TextField } from "tns-core-modules/ui/text-field";


import {Vision} from "../../services/vision";
import {ImageFormat} from "tns-core-modules/ui/enums";

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public lastPicture:any;
  public imageDescription:any;
  public firstTx: string = "";
  public isLoading:boolean = false;

//   public onTextChange(args) {
//     let textField = <TextField>args.object;

//     console.log("onTextChange");
//     this.firstTx = textField.text;
    
// }

//   public onReturn(args) {
//     let textField = <TextField>args.object;

//     console.log("onReturn");
//     this.firstTx = textField.text;
// }

//   public showAlert(result) {
//     alert("Text: " + result);
// }

//   public submit(result) {
//     alert("Text: " + result);
// }
  constructor(@Inject(Vision) private vision: Vision) { }

  ngOnInit() {
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
