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
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userProfile ;
  public profileLink ;
  public im = false;
  public imagePath;
  public imgURL;

  constructor(
    public getService:GetService,
    public actRoute:ActivatedRoute,
    public matDialog:MatDialog,
    public router:Router,
    public postService:PostService,
    public formB:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }

  public editDetails = this.formB.group({
    first_name:['', Validators.required],
    last_name:['', Validators.required],
    phone_number:['', Validators.required],
    email:['',[Validators.required, Validators.email]],
  })
  
  getDetails(){
    this.getService.getAllUsers().subscribe(
      (data:any)=>{
        let d = data.users_details.find((each, i)=>each.user_id == this.actRoute.snapshot.params.id)
        this.userProfile = d;
        if(this.editDetails){
          this.editDetails.get('first_name').setValue(d.first_name);
          this.editDetails.get('last_name').setValue(d.last_name);
          this.editDetails.get('phone_number').setValue(d.phone_number);
          this.editDetails.get('email').setValue(d.email);
        }
        if(this.userProfile.profile_picture){
          this.imgURL = `${environment.connectToBackEnd}uploads/images/profile/${this.userProfile.profile_picture}`;
        }
        // this.profileLink = `user/profile/${this.userProfile.user_id}`
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


  changePicture(event){
    const file = event.target.files[0];
    if (event.target.files.length === 0)
    return;
    if (event.target.files.length > 0) {
      if(file.type.match(/image\/*/) != null && (file.size/1048576)<=4){
        this.im = true
        let formData = new FormData
        formData.append('profile_picture', file)
        this.postService.updateUserProfilePicture(formData).subscribe((data=>{
          console.log(data)
          this.getDetails()
        }))
      } else {
        this.im = false
      }
    } 
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login'])
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