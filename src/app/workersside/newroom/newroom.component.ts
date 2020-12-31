import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.css']
})
export class NewroomComponent implements OnInit {

  constructor(public formB:FormBuilder) { }
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
    console.log(this.roomDetails.value)
    this.loading = true
  }
  choose(){
    if(this.roomDetails.value.pics != ""){
      this.statusText = this.roomDetails.value.room_picture.slice(12);
    }
  }

}
