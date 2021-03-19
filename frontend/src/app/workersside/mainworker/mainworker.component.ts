import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavService } from 'src/app/services/admin-nav.service';
import { GetService } from 'src/app/services/get.service';
import { NavService } from 'src/app/services/nav.service';
import { environment } from 'src/environments/environment';

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
  public pLink = ''
  public title;
  public headText = '';
  public imgURL;
  public managerLink = '';
  public hrLink = '';
  public status;
  public unit;
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
    this.getAdminNavService();
    this.getStaffDetails();
    this.getCurrentHr();
    this.getCurrentManager();

  }

  getStaffDetails(){
    this.getService.getAllStaffs().subscribe((data:any)=>{
      if(data.staffs_details){
        let kit =  data.staffs_details.find((each,i)=>each.status == 'current' && each.stage == 'manager' && each.unit_name == "Kitchen")
        this.kitchenManagerLink = `staff-profile/${kit.staff_id}`
        let clean =  data.staffs_details.find((each,i)=>each.status == 'current' && each.stage == 'manager' && each.unit_name == "Cleaning service")
        if(clean){
          this.cleaningServiceManagerLink = `staff-profile/${clean.staff_id}`
        }
        let cust =  data.staffs_details.find((each,i)=>each.status == 'current' && each.stage == 'manager' && each.unit_name == "Customer care service")
        if(cust){
          this.customerCareServiceManagerLink = `staff-profile/${cust.staff_id}`
        }
      }
    })
  }

  getCurrentManager(){
    this.getService.getManagersInfo().subscribe((data:any)=>{
      if(data.managers_details){
        let manager = data.managers_details.find((each,i)=>each.status == 'current');
        this.managerLink = `manager-profile/${manager.manager_id}`
      }
    })
  }

  getCurrentHr(){
    this.getService.getHrsInfo().subscribe((data:any)=>{
      if(data.hr_details){
        let hr = data.hr_details.find((each,i)=>each.status == 'current');
        this.hrLink = `hr/${hr.hr_id}`;
      }
    })
  }

  getAdminNavService(){
    this.adminNavService.getOnline();
    this.adminNavService.online.subscribe(data=>{
      this.condition = data.for; 
      console.log(data)
      if(data.details){
        if(data.details.profile_picture){
          this.imgURL = `${environment.connectToBackEnd}uploads/images/profile/${data.details.profile_picture}`;
        }
        this.status = data.details.status
      }
      if(data.for == 'main_admin'){
        this.pLink = 'main-admin'
        this.title = 'Admin'
      } else if(data.for == 'manager'){
        this.pLink = `manager-profile/${data.details.manager_id}`
        this.title = 'Manager'
      } else if(data.for == 'hr'){
        this.pLink = `hr/${data.details.hr_id}`
        this.title = 'Human Resource'
      } else if(data.for == 'staff'){
        this.pLink = `staff-profile/${data.details.staff_id}`
        this.title = 'Staff'
      }
    })
    this.adminNavService.headText.subscribe(text=>{
      this.headText = text;
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login'])
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

// this.router.navigateByUrl(`/admin`, {skipLocationChange:false}).then(()=>{
//   this.router.navigate(['profile'])
// })