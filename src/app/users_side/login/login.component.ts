import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
