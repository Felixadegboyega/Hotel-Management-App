import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';




export interface DialogData {
  first_name:string,
  last_name:string,
  order_note:string,
  email:string,
  order_time:string,
  room_type:string,
  order_id:string,
  food_name:string,
  getRequest:Function
}


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public ordersArray;

  public searchText;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(
    public getService:GetService, 
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    public matDialog:MatDialog,
    public postService:PostService,
    public snackService:SnackbarService

  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getRequest();
  }
  getRequest(){
    this.getService.getOrders().subscribe(
      (data:any)=>{
        this.ordersArray = data.orders
        console.log(data.orders)
      }
    )
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

  attendto(order){
    this.postService.attendToOrders({order_id:order.order_id}).subscribe((data:any)=>{
      if(data.access){
        this.snackService.snack("You have successfully taken this service", "snackBarSuccess")
        this.getRequest()
      } else{
        this.snackService.snack("Access denied", "snackBarDanger")
      }
    })
  }
  
  viewmore(order){
    const dialogRef = this.matDialog.open(OrderRequestDialog, {
      width: '450px',
      data:order
    });
  }

}








@Component({
  selector: 'OrderRequestDialog',
  templateUrl: './OrderRequestDialog.html',
  styleUrls: ['./orders.component.css']
})
export class OrderRequestDialog {


  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data :DialogData,       
    public dialogRef :MatDialogRef<OrderRequestDialog>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
