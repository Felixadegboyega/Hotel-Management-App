import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent implements OnInit {

  constructor(public formB:FormBuilder) { }
  hide = true;
  public loginDetails = this.formB.group({
    email:['',[Validators.required, Validators.email]],
    password:['', Validators.required],
  })
  public type = "passowrd";
  public loading = false;
  ngOnInit(): void {
  }
  get form() { return this.loginDetails.controls; }


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
