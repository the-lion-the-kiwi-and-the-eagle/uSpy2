import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular/dataform-directives'
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Vision } from "./services/vision";
import { ListComponent } from "./components/list/list.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { FriendsComponent } from "./components/friends/friends.component";
import { SocketIOModule } from "nativescript-socketio/angular";
import { LobbyComponent } from "./components/lobby/lobby.component";
import { registerElement } from "nativescript-angular/element-registry"
import { WinnerComponent } from "./components/winner/winner.component";
var server = "https://1552262b.ngrok.io";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
// registerElement('Card:CardView', () => require('nativescript-cardview').Card);
registerElement('AnimatedCircle', () => require('nativescript-animated-circle').AnimatedCircle);


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptUIDataFormModule,
        NativeScriptUISideDrawerModule,
        AppRoutingModule,
        HttpClientModule,
        NativeScriptHttpModule,
        ReactiveFormsModule,
        FormsModule,
        NativeScriptFormsModule,
        SocketIOModule.forRoot(server)
    ],
    declarations: [
        HomeComponent,
        AppComponent,
        LoginComponent,
        ListComponent,
        ProfileComponent,
        FriendsComponent,
        LobbyComponent,
        WinnerComponent
    ],
    providers: [
        Vision,
        LoginComponent,
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
