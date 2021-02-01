import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {

  constructor() { }
  public count = 0;

  countDown(){
    setTimeout(() => {
      // alert('hey')

    }, 2000);
  }

}
