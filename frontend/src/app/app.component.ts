import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from './services/get.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';
  
  constructor(
    public getService:GetService
  ) {}

  ngOnInit():void{
    setTimeout(() => {
      this.countDown();
    }, 600000);
  }
  
  countDown(){
    this.getService.refreshToken().subscribe((data:any)=>{
      if(data.token){
        localStorage.setItem('token', data.token)
      }
    })
    setTimeout(() => {
      this.countDown();
    }, 600000);

  }

  

}
