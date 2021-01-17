import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CustomerServiceComponent } from '../customer-service/customer-service.component';
import { RequestCleaningComponent } from '../request-cleaning/request-cleaning.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userProfile = {user_id:0, first_name:"Felix", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:"", room_id:""}

  constructor(
    public getService:GetService,
    public actRoute:ActivatedRoute,
    public matDialog:MatDialog,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.getService.getAllUsers().subscribe(
      (data:any)=>{
        this.userProfile = data.users_details.find((each, i)=>each.user_id == this.actRoute.snapshot.params.id)
      },(err:HttpErrorResponse)=>{
        this.router.navigate(['user/login'])
      }
    )
  }

  clean(){
    const dialogRef = this.matDialog.open(RequestCleaningComponent, {
      width: '500px',
      // data: this.foods.find((each,i)=>each.food_id==id)
    });
  }

  comp(){
    const dialogRef = this.matDialog.open(CustomerServiceComponent, {
      width: '500px',
      // data: this.foods.find((each,i)=>each.food_id==id)
    });
  }

}







// @Component({
//   selector: 'app-profile',
//   templateUrl: './requestcleaning.html',
//   styleUrls: ['./profile.component.css']
// })
// export class RequestCleaning {

//   public userProfile = {user_id:0, first_name:"Felix", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:"", room_id:""}

//   constructor(
//     public dialogRef: MatDialogRef<RequestCleaning>,
//     // @Inject(MAT_DIALOG_DATA) public data: DialogData,
//     public formB:FormBuilder,
//     public snackService:SnackbarService,
//     public postService:PostService,
//     public router:Router
//   ) { }

//   public serviceDetails = this.formB.group({
//     parts:['', Validators.required],
//     service_note:['', Validators.maxLength(500)],
//   })

//   request(){
//     this.postService.cleaningRequest(this.serviceDetails.value).subscribe(
//       (data:any)=>{
//         if(data.request_status){
//           this.snackService.snack("Request successful", "snackBarSuccess")
//           this.onNoClick();
//         } else if(!data.verify_room){
//           this.snackService.snack("No room found on this account", "snackBarDanger")
//         }
//       },(err:HttpErrorResponse)=>{
//         this.router.navigate(['user/login'])
//       }
//     )
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }


// }