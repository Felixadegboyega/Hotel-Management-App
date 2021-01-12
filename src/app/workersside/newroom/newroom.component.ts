import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.css']
})
export class NewroomComponent implements OnInit {

  constructor(public formB:FormBuilder, public postService:PostService, public snackService:SnackbarService, public router:Router) { }
  public roomDetails = this.formB.group({
    room_type:[''],
    room_price:[''],
    total_no_of_rooms:[''],
    room_picture:['']
  })
  public loading = false;
  public statusText = "Choose photo";
  ngOnInit(): void {
  }
  add(){
    this.loading = true;
    this.postService.createRoom(this.roomDetails.value).subscribe(
      (data:any)=>{
        this.loading = false;
        if(data.query_status){
          this.snackService.snack("Room Added Successfully", "snackBarSuccess");
        } else if(!data.verify){
          this.router.navigate(['/manager/login'])
        } else {
          this.snackService.snack("An error Occured", "snackBarDanger")
        }
      },(err:HttpErrorResponse)=>{
        this.loading = false;
        this.router.navigate(['/manager/login'])
      }
    )
  }
  choose(){
    if(this.roomDetails.value.pics != ""){
      this.statusText = this.roomDetails.value.room_picture.slice(12);
    }
  }

}
