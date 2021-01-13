import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public formB:FormBuilder, public postService: PostService,public router:Router, public snackService:SnackbarService) { }

  
  public signUpDetails = this.formB.group({
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
      if(max_control.value != this.signUpDetails.controls['password'].value){
        return {"confirm_password": true}
      }else{
        return null;
      }
    }
  }

  get form() { return this.signUpDetails.controls; }
  // public signInDetails = this.formB.group({
  //   email:[''],
  //   password:[''],
  // })
  public type = "password"
  public type2 = "password"
  public loading = false;
  ngOnInit(): void {
  }
  // public login = () =>{
  //   if (this.signUpDetails.invalid) {
  //     return;
  //   }
  //   this.postService.mainAdminSignIn(this.signInDetails.value).subscribe(
  //     (data:any)=>{
  //       console.log(data);
  //       if(data.token != null){
  //         localStorage.setItem("token", data.token);
  //         this.router.navigate(["/worker/main-admin"])
  //       }
  //     }, (err:HttpErrorResponse)=>{
  //       console.log(err.error)
  //       this.loading = false;
  //     }
  //   )
  // }
    register(){
      this.loading = true;
      this.postService.UserSignUp(this.signUpDetails.value).subscribe(
        (data:any)=>{
          if(data.query_status){
            this.snackService.snack("Registration Successful", "snackBarSuccess")
            this.router.navigate(["/user/login"])
          } else if(!data.query_status){
            this.snackService.snack("Email already exist", "snackBarDanger")
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
