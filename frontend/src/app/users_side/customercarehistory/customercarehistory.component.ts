import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customercarehistory',
  templateUrl: './customercarehistory.component.html',
  styleUrls: ['./customercarehistory.component.css']
})
export class CustomercarehistoryComponent implements OnInit {

  public customerCareServiceRequests = [
    {careservice_id:0, careservice_time:"23/12/2020", careservice_note:"issues with bulb", status:"not attended to", staff_id:0, user_id:0},
    {careservice_id:0, careservice_time:"23/12/2020", careservice_note:"dont really know how to use the Hotel app", status:"not attended to", staff_id:0, user_id:0}
  ]

  public searchText;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

}
