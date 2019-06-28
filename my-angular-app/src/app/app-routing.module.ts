import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { LoginComponent } from "./components/login/login.component";
import { ListComponent } from "./components/list/list.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { FriendsComponent } from "./components/friends/friends.component";
import { LobbyComponent } from "./components/lobby/lobby.component";
import { WinnerComponent } from "./components/winner/winner.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "list", component: ListComponent },
    { path: "home", component: HomeComponent },
    { path: "profile", component: ProfileComponent },
    { path: "friends", component: FriendsComponent },
    { path: "lobby", component: LobbyComponent },
    { path: "winner", component: WinnerComponent },
    // { path: "", redirectTo: "/items", pathMatch: "full" },
    // { path: "items", component: ItemsComponent },
    // { path: "item/:id", component: ItemDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
