import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-admin-login',
  templateUrl: './main-admin-login.component.html',
  styleUrls: ['./main-admin-login.component.css']
})
export class MainAdminLoginComponent implements OnInit {

  constructor(public formB:FormBuilder) { }
  public mainAdminLogin = this.formB.group({
    email:[''],
    password:['']
  })
  public type = "passowrd";
  public loading = false;
  ngOnInit(): void {
  }

  changetype(){
    if(this.type === "password"){
      this.type = "text"
    } else{
      this.type = "password"
    }
  }
  login(){
    this.loading = true
  }

}
