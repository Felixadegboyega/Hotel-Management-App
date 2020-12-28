import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  public roomArray = [
    {room_id:0, room_type:"Executive"},
    {room_id:1, room_type:"Conference Room"} 
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
