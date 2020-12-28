import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manager-registration',
  templateUrl: './manager-registration.component.html',
  styleUrls: ['./manager-registration.component.css']
})
export class ManagerRegistrationComponent implements OnInit {

  constructor(public formB:FormBuilder) { }

  public mangerSignup = this.formB.group({
    first_name:[''],
    last_name:[''],
    phone_number:[''],
    email:[''],
    dob:[''],
    profile_picture:[''],
    password:[''],
    confirm_password:['']
  })
  ngOnInit(): void {
  }

}
