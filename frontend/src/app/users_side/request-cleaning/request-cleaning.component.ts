import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-request-cleaning',
  templateUrl: './request-cleaning.component.html',
  styleUrls: ['./request-cleaning.component.css']
})
export class RequestCleaningComponent {

  public userProfile = {user_id:0, first_name:"Felix", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:"", room_id:""}

  constructor(
    public dialogRef: MatDialogRef<RequestCleaningComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public formB:FormBuilder,
    public snackService:SnackbarService,
    public postService:PostService,
    public router:Router
  ) { }

  public serviceDetails = this.formB.group({
    parts:['', Validators.required],
    service_note:['', Validators.maxLength(500)],
  })

  request(){
    this.postService.cleaningRequest(this.serviceDetails.value).subscribe(
      (data:any)=>{
        if(data.request_status){
          this.snackService.snack("Request successful", "snackBarSuccess")
          this.onNoClick();
        } else if(!data.verify_room){
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
