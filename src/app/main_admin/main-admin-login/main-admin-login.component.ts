import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-main-admin-login',
  templateUrl: './main-admin-login.component.html',
  styleUrls: ['./main-admin-login.component.css']
})
export class MainAdminLoginComponent implements OnInit {

  constructor(public formB:FormBuilder, public postService : PostService, public router:Router) { }
  public mainAdminLogin = this.formB.group({
    email:[''],
    password:['']
  })
  public type = "password";
  public loading = false;
  public loginError;
  ngOnInit(): void {
  }

  changetype(){
    if(this.type == "password"){
      this.type = "text"
    } else{
      this.type = "password"
    }
  }
  login(){
    this.loading = true;
    this.postService.mainAdminSignIn(this.mainAdminLogin.value).subscribe(
      (data:any)=>{
        if(data.token != null){
          localStorage.setItem("token", data.token);
          this.router.navigate(["/worker/main-admin"])
        } else if(data.email_verify && !data.verify_password){
          this.loginError = "Invalid Details"
          this.loading = false;
        } else{
          this.loginError = "Email does not exist"
          this.loading = false;
        }
      }, (err:HttpErrorResponse)=>{
        console.log(err.error)
        this.loading = false;
      }
    )
  }

}
