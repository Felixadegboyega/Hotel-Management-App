import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  public bookings;

  constructor(
    public getService:GetService,
    public actRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(){
    this.getService.getBookings().subscribe(data=>{
      let a = data.allbookings.filter((each)=>each.user_id == this.actRoute.snapshot.params.id)
      this.bookings = a;
    })
  }

}
