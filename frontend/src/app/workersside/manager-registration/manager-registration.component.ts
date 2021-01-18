import { MediaMatcher } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-manager-registration',
  templateUrl: './manager-registration.component.html',
  styleUrls: ['./manager-registration.component.css']
})
export class ManagerRegistrationComponent implements OnInit {

  constructor(public navSerice:NavService, public snackBarService:SnackbarService,public formB:FormBuilder, public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher, public postService:PostService, public router:Router) { }
  public date = new Date();
  public managerSignup = this.formB.group({
    first_name:['', Validators.required],
    last_name:['', Validators.required],
    phone_number:['', Validators.required],
    email:['',[Validators.required, Validators.email]],
    profile_picture:[''],
    password:['', [Validators.required, Validators.minLength(6)]],
    confirm_password:['',[this.validatePassword.bind(this)]],
    date_of_birth:['', Validators.required],
    date_employed:[`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`]
  })
  
  public error;
  public type = "password"
  public type2 = "password"
  public loading = false;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }
  get form() { return this.managerSignup.controls; }

  validatePassword(max_control:AbstractControl){
    if(max_control.value){
      if(max_control.value != this.managerSignup.controls['password'].value){
        return {"confirm_password": true}
      }else{
        return null;
      }
    }
  }
  
  
    
  register(){
    this.loading = true;
    this.postService.managerSignUp(this.managerSignup.value).subscribe(
      (data:any)=>{
        if(data.verify && data.query_status){
          this.navSerice.confirm(data)
          this.snackBarService.snack("Manager Registration successful", "snackBarSuccess")
          this.loading = false;
        } else if(!data.verify){
          this.snackBarService.snack("Access Denied", "snackBarDanger")
          this.loading = false;
        }else if(!data.query_status){
          this.snackBarService.snack("Email is taken", "snackBarDanger")
          this.loading = false;
        } else {
          this.snackBarService.snack("An error Occured", "snackBarDanger")
          this.loading = false;
        }
      }, (err:HttpErrorResponse)=>{
        this.snackBarService.snack("An error Occured", "snackBarDanger")
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
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
