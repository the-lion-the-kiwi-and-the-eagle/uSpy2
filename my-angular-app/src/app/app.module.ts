import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
<<<<<<< HEAD
import { NativeScriptHttpModule } from 'nativescript-angular/http'

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./components/item/items.component";
import { ItemDetailComponent } from "./components/item/item-detail.component";
=======
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular/dataform-directives'

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LoginComponent } from "./components/login/login.component";
>>>>>>> cb05eeff2401cb05464de9d3c96af0fe158d7d6a
import { HomeComponent } from "./components/home/home.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


import { Vision } from "./services/vision";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
<<<<<<< HEAD
        NativeScriptHttpModule,
        AppRoutingModule
=======
        NativeScriptUIDataFormModule,
        NativeScriptUISideDrawerModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
>>>>>>> cb05eeff2401cb05464de9d3c96af0fe158d7d6a
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        LoginComponent,
        HomeComponent,
        ItemDetailComponent
    ],
    providers: [
        Vision
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
