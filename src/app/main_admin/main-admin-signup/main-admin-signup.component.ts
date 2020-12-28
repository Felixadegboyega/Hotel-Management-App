import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-main-admin-signup',
  templateUrl: './main-admin-signup.component.html',
  styleUrls: ['./main-admin-signup.component.css'],
})
export class MainAdminSignupComponent implements OnInit {

  constructor(public router:Router, public formB:FormBuilder, public postService:PostService) { }
  
  public mainAdminSignup = this.formB.group({
    first_name:[''],
    last_name:[''],
    phone_number:[''],
    email:[''],
    profile_picture:[''],
    password:[''],
    confirm_password:['']
  })
  public type = "password"
  public type2 = "password"
  public loading = false;
  ngOnInit(): void {
  }
  register(){
    this.loading = true;
    this.postService.sendDetails("main_admin/signup.php", this.mainAdminSignup.value).subscribe(
      (data:any)=>{
        console.log(data)
        this.router.navigate(["/main-admin"])
      }, (err:HttpErrorResponse)=>{
        console.log(err.error)
      }
      )
  }
  changetype(){
    if(this.type === "password"){
      this.type = "text"
    } else{
      this.type = "password"
    }
  }
  changetype2(){
    if(this.type2 === "password"){
      this.type2 = "text"
    } else{
      this.type2 = "password"
    }
  }
    
}
