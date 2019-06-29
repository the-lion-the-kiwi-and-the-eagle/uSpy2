import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FriendsService } from '../friends/friends.service';

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: RouterExtensions, public friendsService: FriendsService) { }

  ngOnInit() {
  }

  

  backButton() {
    this.router.navigate(['/list'])
  }

  homeNav() {
    this.router.navigate(['/home'])
  }

  friendNav() {
    this.router.navigate(['/friends']);
  }

}
