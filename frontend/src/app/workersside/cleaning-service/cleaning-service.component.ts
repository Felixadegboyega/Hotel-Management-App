import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.css']
})
export class CleaningServiceComponent implements OnInit {
  public cleaningServiceRequests = [
    {service_id:0, service_time:"23/12/2020", service_note:"needed to cleaning specifically for wardrobes", status:"not attended to", staff_id:0, user_id:0},
    {service_id:0, service_time:"23/12/2020", service_note:"cleaning of floors", status:"not attended to", staff_id:0, user_id:0}
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
