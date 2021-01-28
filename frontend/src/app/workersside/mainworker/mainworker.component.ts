import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavService } from 'src/app/services/admin-nav.service';
import { GetService } from 'src/app/services/get.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-mainworker',
  templateUrl: './mainworker.component.html',
  styleUrls: ['./mainworker.component.css']
})
export class MainworkerComponent implements OnInit {
  public staffs;
  public kitchenManagerLink;
  public cleaningServiceManagerLink;
  public customerCareServiceManagerLink;

  public mobileQuery :MediaQueryList;
  public condition;
  public pLink;
  private _mobileQueryListener: () => void;
  
  constructor(
    public navService:NavService, 
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher, 
    public getService:GetService, 
    public router :Router,
    public adminNavService:AdminNavService,
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.adminNavService.getOnline();
    this.adminNavService.online.subscribe(data=>{
      this.condition = data.for;
      if(data.for == 'main_admin'){
        this.pLink = 'main-admin'
      } else if(data.for == 'manager'){
        this.pLink = `manager-profile/${data.details.manager_id}`
      } else if(data.for == 'hr'){
        this.pLink = `hr/${data.details.hr_id}`
      } else if(data.for == 'staff'){
        this.pLink = `staff-profile/${data.details.staff_id}`
      }
    })

    // this.condition =


    let data = this.navService.yeah()
    if(data){
      // if(data.for == 'admin'){
      //   this.profileLink = './main-admin'
      // }
    }
    this.getService.getAllStaffs().subscribe((data:any)=>{
      if(data.staffs_details){
        // console.log(data.staffs_details)
        let kit =  data.staffs_details.find((each,i)=>each.status == 'current' && each.stage == 'manager' && each.unit_name == "Kitchen")
        this.kitchenManagerLink = `worker/staff-profile/${kit.staff_id}`
        // let clean =  data.staffs_details.find((each,i)=>each.status == 'current' && each.stage == 'manager' && each.unit_name == "Cleaning service")
        // this.cleaningServiceManagerLink = `worker/staff-profile/${clean.staff_id}`
        // let cust =  data.staffs_details.find((each,i)=>each.status == 'current' && each.stage == 'manager' && each.unit_name == "Customer care service")
        // this.customerCareServiceManagerLink = `worker/staff-profile/${cust.staff_id}`
      }
    })
    
  }
  route(p){
    // if(p=='kitchen'){
    //   this.router.navigateByUrl(`/worker`, { skipLocationChange: false }).then(() => {
    //     this.router.navigate([this.kitchenManagerLink]);
    //  });
    // } else if(p=='cleaning'){
    //   this.router.navigateByUrl(`/worker`, { skipLocationChange: false }).then(() => {
    //     // this.router.navigate([this.cleaningServiceManagerLink]);
    //  });
    // } else if(p=='customer'){
    //   this.router.navigateByUrl(`/worker`, { skipLocationChange: false }).then(() => {
    //     this.router.navigate([this.customerCareServiceManagerLink]);
    //  });
    // }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
