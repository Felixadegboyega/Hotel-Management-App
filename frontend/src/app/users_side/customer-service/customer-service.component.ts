import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.css']
})
export class CustomerServiceComponent {

    public userProfile = {user_id:0, first_name:"Felix", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:"", room_id:""}

  constructor(
    public formB:FormBuilder,
    public snackService:SnackbarService,
    public postService:PostService,
    public router:Router,
    public  dialogRef:MatDialogRef<CustomerServiceComponent>
  ) { }


  public serviceDetails = this.formB.group({
    type:['', Validators.required],
    careservice_note:['', Validators.maxLength(500)],
  })

  complain(){
    this.postService.customerCareRequest(this.serviceDetails.value).subscribe(
      (data:any)=>{
        if(data.request_status){
          this.snackService.snack("Request successful", "snackBarSuccess")
          this.onNoClick();
        } else if(!data.verify_room){
          this.onNoClick();
          this.snackService.snack("No room found on this account", "snackBarDanger")
        }
      },(err:HttpErrorResponse)=>{
        this.router.navigate(['user/login'])
      }
    )

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
