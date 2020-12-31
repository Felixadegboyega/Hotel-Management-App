import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manager-registration',
  templateUrl: './manager-registration.component.html',
  styleUrls: ['./manager-registration.component.css']
})
export class ManagerRegistrationComponent implements OnInit {

  constructor(public formB:FormBuilder, public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) { }

  public mangerSignup = this.formB.group({
    first_name:[''],
    last_name:[''],
    phone_number:[''],
    email:[''],
    dob:[''],
    profile_picture:[''],
    password:[''],
    confirm_password:['']
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

}
