import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {


  public staff = {manager_id:0, first_name:"Felix", date_employed:"21/21/2121", unit:"Cleaning Service", last_name:"Adegboyega", dob:"21/21/2121", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:""}

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

}
