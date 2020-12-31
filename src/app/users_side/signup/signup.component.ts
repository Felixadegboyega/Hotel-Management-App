import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public formB:FormBuilder, public postService: PostService,public router:Router) { }

  public signupDetails = this.formB.group({
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
    this.postService.sendDetails("main_admin/signup.php", this.signupDetails.value).subscribe(
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
