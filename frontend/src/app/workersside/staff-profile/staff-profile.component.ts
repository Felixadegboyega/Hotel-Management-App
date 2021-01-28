import { MediaMatcher } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNavService } from 'src/app/services/admin-nav.service';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit {


  public staff;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  public im = false;
  public imgURL;

  
  constructor(
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    public router:Router,
    public getService:GetService,
    public actRoute:ActivatedRoute,
    public postService:PostService,
    public adminNavService:AdminNavService
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getDetails()
    this.adminNavService.supplyHeadText("Staff Profile")
  }
  
  getDetails(){
    this.getService.getAllStaffs().subscribe(
      (data:any)=>{
        this.staff = data.staffs_details.find(each=>each.staff_id==this.actRoute.snapshot.params.id);
        if(this.staff.profile_picture){
          this.imgURL = `${environment.connectToBackEnd}uploads/images/profile/${this.staff.profile_picture}`;
        }
      },(err:HttpErrorResponse)=>{
        this.router.navigate(['/staff-profile-exp'])
      }
    )
  }



  changePicture(event){
    const file = event.target.files[0];
    if (event.target.files.length === 0)
    return;
    if (event.target.files.length > 0) {
      if(file.type.match(/image\/*/) != null && (file.size/1048576)<=4){
        let formData = new FormData
        this.im = true;
        formData.append('profile_picture', file)
        this.postService.updateStaffProfilePicture(formData).subscribe((data=>{
          console.log(data)
          this.getDetails()
        }))
      } else {
        this.im = false
      }
    } 


  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
