import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent implements OnInit {

  constructor(public formB:FormBuilder) { }
  public staffLogin = this.formB.group({
    email:[],
    password:['']
  })

  ngOnInit(): void {
  }

}
