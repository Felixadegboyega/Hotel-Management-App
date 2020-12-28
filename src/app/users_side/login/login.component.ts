import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public formBuild:FormBuilder) { }

  public userLogin = this.formBuild.group({
    email:[''],
    password:['']
  })

  ngOnInit(): void {
  }

}
