import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public formB:FormBuilder) { }

  public userReg = this.formB.group({
    first_name:[''],
    last_name:[''],
    phone_number:[''],
    email:[''],
    profile_picture:[''],
    password:[''],
    confirm_password:['']
  })


  ngOnInit(): void {
  }

}
