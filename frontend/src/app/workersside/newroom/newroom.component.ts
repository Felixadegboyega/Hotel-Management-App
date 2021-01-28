import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminNavService } from 'src/app/services/admin-nav.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.css']
})
export class NewroomComponent implements OnInit {
  
  constructor(
    public formB:FormBuilder, 
    public postService:PostService, 
    public snackService:SnackbarService, 
    public router:Router,
    public adminNavService:AdminNavService
  ) { }
  public roomDetails = this.formB.group({
    room_type:['', Validators.required],
    room_price:['', [Validators.required, Validators.min(0)]],
    total_no_of_rooms:['', [Validators.required, Validators.min(0)]],
    room_picture:['', Validators.required]
  })
  public loading = false;
  public statusText = "Choose photo";
  public im = false;
  public imagePath;
  imgURL: any;


  ngOnInit(): void {
    this.adminNavService.supplyHeadText("Add New Room")
  }


  choose(event){
    const file = event.target.files[0];
    if (event.target.files.length === 0)
    return;
    this.statusText = file.name;
    if (event.target.files.length > 0) {
      if(file.type.match(/image\/*/) != null && (file.size/1048576)<=4){
        this.im = true
        this.roomDetails.get('room_picture').setValue(file);
      } else {
        this.im = false
      }
    }


    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }



  add(){
    this.loading = true;
    const formData = new FormData();
    formData.append('room_type', this.roomDetails.get('room_type').value)
    formData.append('room_price', this.roomDetails.get('room_price').value)
    formData.append('total_no_of_rooms', this.roomDetails.get('total_no_of_rooms').value)
    formData.append('room_picture', this.roomDetails.get('room_picture').value);
    this.postService.createRoom(formData).subscribe(
      (data:any)=>{
        this.loading = false;
        if(data.query_status){
          this.snackService.snack("Room Added Successfully", "snackBarSuccess");
        } else if(!data.verify){
          // this.router.navigate(['/manager/login'])
        } else {
          this.snackService.snack("An error Occured", "snackBarDanger")
        }
      },(err:HttpErrorResponse)=>{
        this.loading = false;
        // this.router.navigate(['/manager/login'])/
      }
    )
  }

}
