import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-manager-registration',
  templateUrl: './manager-registration.component.html',
  styleUrls: ['./manager-registration.component.css']
})
export class ManagerRegistrationComponent implements OnInit {

  constructor(public formB:FormBuilder, public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher, public postService:PostService, public router:Router) { }

  public mangerSignup = this.formB.group({
    first_name:['', Validators.required],
    last_name:[''],
    phone_number:[''],
    email:[''],
    dob:[''],
    profile_picture:[''],
    password:[''],
    confirm_password:['']
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

  register(){
    this.loading = true;
    this.postService.managerSignUp(this.mangerSignup.value).subscribe(
      (data:any)=>{
        if(data.query_status){
          this.router.navigate(["/manager/login"])
        } else {
          this.error = "You can't signup as an admin for this application, kindly Login"
          this.loading = false;
        }
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
