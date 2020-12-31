import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  public foods = [
    {food_id:0, food_name:"Rice"},
    {food_id:0, food_name:"Pepper Soup"},
    {food_id:0, food_name:"Pounded Yam"},
    {food_id:0, food_name:"Beans"},
    {food_id:0, food_name:"Fufu"},
    {food_id:0, food_name:"Wheat"},
  ]

  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 500px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
