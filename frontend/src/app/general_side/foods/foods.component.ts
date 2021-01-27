import { MediaMatcher } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
    food_name:string,
    food_id:string,
}

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  public imgUrl = `${environment.connectToBackEnd}uploads/images/foods/`;
  public foods = [];

  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    public getService:GetService,
    public dialog:MatDialog,
    public formB:FormBuilder
  ) {}
 

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 500px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getService.getFoods().subscribe(
      (data:any)=>{
        for (let i = 0; i < data.foods.length; i++) {
          const element = data.foods[i];
          let from = parseInt(element.available_from);
          let to = parseInt(element.available_to);
          if(from>12){
            element.available_from = `${from - 12}PM`
          } else {
            element.available_from = `${from}AM`
          }
          if(to>12){
            element.available_to = `${to - 12}PM`
          } else {
            element.available_to = `${to}AM`
          }
          this.foods = data.foods
        }
      }
    )
  }

  order(id):void{
    const dialogRef = this.dialog.open(OrderDialogueComponent, {
      width: '400px',
      data: this.foods.find((each,i)=>each.food_id==id)
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}




@Component({
  selector: 'orderdialogue',
  templateUrl: './orderdialogue.html',
  styleUrls: ['./foods.component.css']
})
export class OrderDialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public formB:FormBuilder,
    public snackService:SnackbarService,
    public postService:PostService,
    public router:Router
  ) {}

  public orderDetails = this.formB.group({
    qty:['', [Validators.required,  Validators.max(3),  Validators.min(0)]],
    order_note:['', Validators.maxLength(500)],
  })

  order(food_id){
    let food = this.orderDetails.value;
    food = {...food, food_id}; 
    this.postService.newOrder(food).subscribe(
      (data:any)=>{
        if(!data.online_status){
          this.router.navigate(['/user/login'])
          this.onNoClick()
        } else if(!data.verify_room){
          this.snackService.snack("Couldn't find room", "snackBarDanger")
          this.onNoClick()
        } else if(data.order_status){
          this.snackService.snack("Order successfully placed", "snackBarSuccess")
          this.onNoClick()
        }
      },(err:HttpErrorResponse)=>{
        this.router.navigate(['/user/login'])
        this.onNoClick()
      }
    )


  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
