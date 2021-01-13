import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userProfile = {user_id:0, first_name:"Felix", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:"", room_id:""}

  constructor(
    public getService:GetService,
    public actRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getService.getAllUsers().subscribe(
      (data:any)=>{
        this.userProfile = data.users_details.find((each, i)=>each.user_id == this.actRoute.snapshot.params.id)
      }
    )
  }

}
