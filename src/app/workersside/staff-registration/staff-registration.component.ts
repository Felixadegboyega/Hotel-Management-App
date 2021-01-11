import { MediaMatcher } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.component.html',
  styleUrls: ['./staff-registration.component.css']
})
export class StaffRegistrationComponent implements OnInit {

  constructor(
    public formB:FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public postService:PostService,
    public snackBarService:SnackbarService,
    public router:Router,
    public getService:GetService
  ) { }
  public date = new Date();

  public signupDetails = this.formB.group({
    first_name:['', Validators.required],
    last_name:['', Validators.required],
    phone_number:['', Validators.required],
    email:['',[Validators.required, Validators.email]],
    profile_picture:[''],
    password:['', [Validators.required, Validators.minLength(6)]],
    confirm_password:['',[this.validatePassword.bind(this)]],
    date_of_birth:['', Validators.required],
    unit:['', Validators.required]
  })
  public type = "password"
  public type2 = "password"
  public loading = false;
  public units = []
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getService.getUnits().subscribe(
      (data:any)=>{
        this.units = data.units;
      }
    )
  }
  get form() { return this.signupDetails.controls; }

  validatePassword(maxlength:AbstractControl){
    if(maxlength.value){
      if(maxlength.value != this.signupDetails.controls['password'].value){
        return {"confirm_password": true}
      }else{
        return null;
      }
    }
  }

  register(){
    this.loading = true;
    // console.log(this.signupDetails.value)
    this.postService.staffSignUp(this.signupDetails.value).subscribe(
      (data:any)=>{
        if(data.verify && data.query_status){
          this.snackBarService.snack("Staff Registration successful", "snackBarSuccess")
        } else if(!data.verify){
          // this.router.navigate(['/manager/login'])
        } else if(!data.query_status){
          this.snackBarService.snack("Email is taken", "snackBarDanger")
        } else {
          this.snackBarService.snack("An error occured", "snackBarDanger")
        }
      },(error:HttpErrorResponse)=>{
        // this.router.navigate(['/manager/login'])
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
  matcher = new ErrorStateMatcher();


}
