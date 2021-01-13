import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public formB:FormBuilder,
    public router:Router,
    public postService:PostService,
    public snackBarService:SnackbarService
  ) { }
  hide = true;
  public loginDetails = this.formB.group({
    email:['',[Validators.required, Validators.email]],
    password:['', Validators.required],
  })
  public type = "password";
  public loading = false;
  ngOnInit(): void {
  }
  get form() { return this.loginDetails.controls; }


  changetype(){
    if(this.type === "password"){
      this.type = "text";
    } else{
      this.type = "password";
    }
  }
  login(){
    this.loading = true
    this.postService.UserSignIn(this.loginDetails.value).subscribe(
      (data:any)=>{
        console.log(data)
        this.loading = false;
        if(!data.email_verify){
          this.snackBarService.snack("Email does not exist", "snackBarDanger")
        } else if(!data.verify_password){
          this.snackBarService.snack("Password is not correct", "snackBarDanger")
        } else if(data.verify_password){
          this.router.navigate([`/user/profile/${data.id}`])
          localStorage.setItem('token', data.token)
          this.snackBarService.snack("Signin Successful", "snackBarSuccess")
        } else{
          this.snackBarService.snack("An error occured", "snackBarDanger")
        }
      },(err:HttpErrorResponse)=>{
        this.snackBarService.snack("An error occured", "snackBarDanger")
      }
    )
  }


}
