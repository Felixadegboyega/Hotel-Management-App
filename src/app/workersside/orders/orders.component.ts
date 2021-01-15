import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public ordersArray = [
    {order_id:0, order_time:"24/12/2020 20:24", food_name:"Rice", order_note:"dont really like much stew", status:"not attended to", staff_id:0, user_id:0, food_id:0},
    {order_id:0, order_time:"24/12/2020 20:24", food_name:"Rice", order_note:"dont really like much stew", status:"not attended to", staff_id:0, user_id:0, food_id:0},
    {order_id:0, order_time:"24/12/2020 20:24", food_name:"Rice", order_note:"dont really like much stew", status:"not attended to", staff_id:0, user_id:0, food_id:0}
  ]

  public searchText;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(public getService:GetService, public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getService.getOrders().subscribe(
      (data:any)=>{
        this.ordersArray = data.orders
      }
    )
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

}
