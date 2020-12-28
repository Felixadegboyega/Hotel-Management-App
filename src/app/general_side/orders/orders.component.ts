import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public ordersArray = [
    {order_id:0, order_time:"24/12/2020 20:24", order_note:"dont really like much stew", status:"not attended to", staff_id:0, user_id:0, food_id:0}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
