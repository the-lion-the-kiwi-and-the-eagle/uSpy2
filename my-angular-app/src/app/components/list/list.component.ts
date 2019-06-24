import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from "tns-core-modules/data/observable";
import { RouterExtensions } from 'nativescript-angular/router';;

@Component({
  selector: 'ns-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  moduleId: module.id,
})
@Injectable({ providedIn: 'root' })
export class ListComponent extends Observable {

  constructor(private router: RouterExtensions) { 
    super();
    this.list = new Items("Headphones", "dog", "Pen", "bike");
  }

  set list(value: Items) {
    this.set("_list", value)
  }

  get list(): Items {
    return this.get("_list")
  }

  onSubmit() {
    this.router.navigate(['/home']);
  }

  navigateProfile() {
    this.router.navigate(['/profile']);
  }

  getList()  {
    return this.get("_list");
  }

  ngOnInit() {
    
  }

}

export class Items {
  public item1: string;
  public item2: string;
  public item3: string;
  public item4: string;


  constructor(item1, item2, item3, item4) {
      this.item1 = item1;
      this.item2 = item2;
      this.item3 = item3;
      this.item4 = item4;
  }
}