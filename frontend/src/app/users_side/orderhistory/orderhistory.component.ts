import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {
  public Orders;
  constructor(
    public getService:GetService,
    public actRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.getService.getOrders().subscribe((data:any)=>{
      this.Orders = data.orders.filter((each,i)=>each.user_id == this.actRoute.snapshot.params.id)
    })
  }

}
