import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { LoginComponent } from "./components/login/login.component";
import { ListComponent } from "./components/list/list.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "list", component: ListComponent },
    { path: "home", component: HomeComponent },
    
    // { path: "", redirectTo: "/items", pathMatch: "full" },
    // { path: "items", component: ItemsComponent },
    // { path: "item/:id", component: ItemDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
