import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  constructor(public formB:FormBuilder) { }
  public managersLogin = this.formB.group({
    email:[],
    password:['']
  })

  ngOnInit(): void {
  }

}
