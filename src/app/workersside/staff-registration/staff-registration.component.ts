import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.component.html',
  styleUrls: ['./staff-registration.component.css']
})
export class StaffRegistrationComponent implements OnInit {

  constructor(public formB:FormBuilder, public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) { }
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
    date_employed:[this.date.getDate()],
    unit:['']
  })
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
  get form() { return this.signupDetails.controls; }

  validatePassword(max_control:AbstractControl){
    if(max_control.value){
      if(max_control.value != this.signupDetails.controls['password'].value){
        return {"confirm_password": true}
      }else{
        return null;
      }
    }
  }

  register(){
    this.loading = true;
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
