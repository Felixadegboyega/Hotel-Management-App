import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managers-profile',
  templateUrl: './managers-profile.component.html',
  styleUrls: ['./managers-profile.component.css']
})
export class ManagersProfileComponent implements OnInit {

  constructor() { }

  public managerInfo = {manager_id:0, first_name:"Felix", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:""}

  ngOnInit(): void {
  }

}
