import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {
  item1: string;
  item2: string;
  item3: string;
  item4: string;

  currentList = []

  constructor() { }

  itemChange(obj) {
    this.currentList.push(obj.item1, obj.item2, obj.item3, obj.item4)
    console.log(this.currentList, 'helllllllo')
  }

}
