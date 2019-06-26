import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: RouterExtensions) { }

  ngOnInit() {
  }

  

  backButton() {
    this.router.navigate(['/list'])
  }

  homeNav() {
    this.router.navigate(['/home'])
  }

}
