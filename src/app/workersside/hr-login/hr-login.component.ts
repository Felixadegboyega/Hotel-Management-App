import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-hr-login',
  templateUrl: './hr-login.component.html',
  styleUrls: ['./hr-login.component.css']
})
export class HrLoginComponent implements OnInit {

  constructor(public snackBarService:SnackbarService,public router:Router , public formB:FormBuilder, public postSerice:PostService) { }
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
      this.type = "text"
    } else{
      this.type = "password"
    }
  }
  login(){
    this.loading = true;
    this.postSerice.HRSignIn(this.loginDetails.value).subscribe(
      (data)=>{
        console.log(data)
        if(data.token && data.id){
          localStorage.setItem('token', data.token)
          this.router.navigate([`worker/hr/${data.id}`])
        } else {
          this.loading = false
          this.snackBarService.snack('Invalid Details', 'snackBarDanger')
        }
      }, (error:HttpErrorResponse)=>{
        this.loading = false;
        this.snackBarService.snack('An error occured', 'snackBarDanger')
      }
    )
  }

}
