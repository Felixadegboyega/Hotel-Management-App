import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  constructor() { }
  public details;
  confirm(dor){
    this.details = dor
  }
  yeah(){
    return this.details
  }
}
