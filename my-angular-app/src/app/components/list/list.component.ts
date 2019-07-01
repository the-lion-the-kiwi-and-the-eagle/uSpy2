import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from "tns-core-modules/data/observable";
import { RouterExtensions } from 'nativescript-angular/router';
import { ListServiceService } from './list-service.service';


@Component({
  selector: 'ns-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  moduleId: module.id,
})
@Injectable({ providedIn: 'root' })
export class ListComponent extends Observable {
  constructor(private router: RouterExtensions, private listService: ListServiceService) { 
    super();
    this.list = new Items(null, null, null, null);
  }

  set list(value: Items) {
    this.set("_list", value)
  }

  setList(value: Items) {
    this.set("_list", value);
  }

  get list(): Items {
    return this.get("_list")
  }

  onSubmit() {
    this.listService.itemChange(this.list)
    this.router.navigate(['/home']);
    console.log(this.list);
    // return this.get()
  }

  profileNav() {
    this.router.navigate(['/profile'])
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