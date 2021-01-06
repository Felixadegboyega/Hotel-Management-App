import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
    first_name:['', Validators.required],
    last_name:['', Validators.required],
    phone_number:['', Validators.required],
    email:['',[Validators.required, Validators.email]],
    profile_picture:[''],
    password:['', [Validators.required, Validators.minLength(6)]],
    confirm_password:['',[this.validatePassword.bind(this)]]
  })
  validatePassword(max_control:AbstractControl){
    if(max_control.value){
      if(max_control.value != this.mainAdminSignup.controls['password'].value){
        return {"confirm_password": true}
      }else{
        return null;
      }
    }
  }

  get form() { return this.mainAdminSignup.controls; }
  public mainAdminLogin = this.formB.group({
    email:[''],
    password:[''],
  })
  public type = "password"
  public type2 = "password"
  public loading = false;
  public adminExistError;
  ngOnInit(): void {
  }
  public login = () =>{
    if (this.mainAdminSignup.invalid) {
      return;
    }
    this.postService.mainAdminSignIn(this.mainAdminLogin.value).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.token != null){
          localStorage.setItem("token", data.token);
          this.router.navigate(["/worker/main-admin"])
        }
      }, (err:HttpErrorResponse)=>{
        console.log(err.error)
        this.loading = false;
      }
      )
    }
    register(){
      this.loading = true;
      this.postService.mainAdminSignup(this.mainAdminSignup.value).subscribe(
        (data:any)=>{
          if(data.query_status && data.confirm_one_admin){
          this.router.navigate(["/main-admin/login"])
          // this.login();
        } else {
          this.adminExistError = "You can't signup as an admin for this application, kindly Login"
          this.loading = false;
        }
      }, (err:HttpErrorResponse)=>{
        this.loading = false;
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
