import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrls: ['./bookroom.component.css']
})
export class BookroomComponent implements OnInit {
  constructor(
    public formB:FormBuilder, 
    public postService:PostService, 
    public snackService:SnackbarService, 
    public router:Router,
    public getService:GetService,
    public actRoute:ActivatedRoute
  ) { }
  public room;
  public rooms = []
  public bookRooms = []
  public roomDetails = this.formB.group({
    check_in_date:['', Validators.required],
    check_out_date:['', Validators.required],
    room:['', Validators.required],
    room_price:[0]
  })
  public bookingTemplate = []
  public loading = false;
  
  ngOnInit(): void {
    this.getService.getRooms().subscribe(
      (data:any)=>{
        this.rooms = data.rooms;
      }
    )
  }
  getPrice(){
    if(this.roomDetails && this.roomDetails?.value.check_in_date != '' && this.roomDetails?.value.check_out_date != '' && this.roomDetails?.value.room != ''){
      let inn:any = new Date(this.roomDetails?.value.check_in_date);
      let out:any = new Date(this.roomDetails?.value.check_out_date);
      let amt = (Math.round((out-inn)/(1000*60*60*24)))*parseInt(this.roomDetails?.value.room.room_price)
      this.roomDetails.get('room_price').setValue(amt)
      return amt
    } else {
      return ''
    }
  }
  proceedToP(){
    this.book();
  }

  bookMore(){
    this.bookRooms = [...this.bookRooms, {...this.roomDetails.value}];
    this.bookingTemplate = [...this.bookingTemplate, this.roomDetails.value]
    this.roomDetails.get('room').setValue("");
    // console.log(this.bookRooms)
  }
  
  reset(){
    this.roomDetails.get('check_in_date').setValue("");
    this.roomDetails.get('check_out_date').setValue("");
    this.roomDetails.get('room').setValue("");
    this.roomDetails.get('amount').setValue("");
    this.bookRooms = [];
    this.bookingTemplate = [];
  }
  
  book(){
    let det = [...this.bookRooms, {...this.roomDetails.value}];
    this.loading = true;
    this.postService.BookRoom(det).subscribe(
      (data:any)=>{
        this.loading = false;
        if(data.query_status){
          this.snackService.snack("Room booked Successfully", "snackBarSuccess");
        } else if(!data.verify){
          this.router.navigate(['/user/login'])
        } else {
          this.snackService.snack("An error Occured", "snackBarDanger")
        }
        console.log(data)
      },(err:HttpErrorResponse)=>{
        console.log(err.error)
        this.loading = false;
        this.router.navigate(['/user/login'])
      }
    )
  }

}
