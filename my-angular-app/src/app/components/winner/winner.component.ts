import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { messageType } from 'tns-core-modules/trace/trace';

@Component({
  selector: 'ns-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  constructor(private router: RouterExtensions) { }

  ngOnInit() {
  }




  profileNav() {
    this.router.navigate(['/profile']);
  }

}
