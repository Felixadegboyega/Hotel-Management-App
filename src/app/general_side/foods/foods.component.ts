import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';

export interface DialogData {
  foods :[];
}

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  
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
    const dialogRef = this.dialog.open(OrderComponent, {
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
export class OrderComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public formB:FormBuilder) {}

  public orderDetails = this.formB.group({
    qty:['', [Validators.required,  Validators.max(3),  Validators.min(0)]],
    order_note:['', Validators.maxLength(1000)],
  })

  order(food_id){
    let food = this.orderDetails.value;
    food = {...food, food_id};
    console.log(food)

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
