import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userProfile = {user_id:0, first_name:"Felix", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:"", room_id:""}

  constructor() { }

  ngOnInit(): void {
  }

}
