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
  public roomDetails = this.formB.group({
    check_in_date:['', Validators.required],
    check_out_date:['', Validators.required],
  })
  public loading = false;
  
  ngOnInit(): void {
    this.getService.getRooms().subscribe(
      (data:any)=>{
        this.getService.getRooms().subscribe(
          (data:any)=>{
            this.room = data.rooms.find((each,i)=>each.room_id==this.actRoute.snapshot.params.id)
          }
        )
      }
    )
  }
  calc(){
    return "00000"
    // return parseInt(this.room.room_price)*(parseInt(this.roomDetails.value.check_in_date))
  }
  proceedToP(room_id){
    this.book(room_id)
  }
  
  book(room_id){
    let det = {...this.roomDetails.value, room_id};
    this.loading = true;
    this.postService.BookRoom(det).subscribe(
      (data:any)=>{
        this.loading = false;
        if(data.query_status){
          this.snackService.snack("Room booked Successfully", "snackBarSuccess");
        } else if(!data.verify){
          // this.router.navigate(['/user/login'])
        } else {
          this.snackService.snack("An error Occured", "snackBarDanger")
        }
      },(err:HttpErrorResponse)=>{
        this.loading = false;
        this.router.navigate(['/user/login'])
      }
    )
  }

}
