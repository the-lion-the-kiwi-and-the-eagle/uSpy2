import { Component, OnInit, OnDestroy, Injectable } from "@angular/core";
import { SocketIO } from "nativescript-socketio/socketio";


@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})

export class AppComponent implements OnInit, OnDestroy { 
    constructor(private socketIO:SocketIO) {}
   
    
    ngOnInit() {
        // this.socketIO.connect();
        // console.log('user created a socket')
        // this.socketIO.on('this', (data) => {
        //     console.log('this contains the socket created:  ' + data);
        // })
    }

    ngOnDestroy() {
        // this.socketIO.disconnect();
    }
}
