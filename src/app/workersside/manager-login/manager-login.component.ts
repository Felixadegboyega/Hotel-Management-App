import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  constructor(public formB:FormBuilder) { }
  public loginDetails = this.formB.group({
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
