import { MediaMatcher } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNavService } from 'src/app/services/admin-nav.service';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-managers-profile',
  templateUrl: './managers-profile.component.html',
  styleUrls: ['./managers-profile.component.css']
})
export class ManagersProfileComponent implements OnInit {


  public managerInfo; 
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  public loading = true;
  public im = false;
  public imgURL;
  
  constructor(
    public snackBarService:SnackbarService,
    public getService:GetService,
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher, 
    public actRoute:ActivatedRoute,
    public router:Router,
    public postService:PostService,
    public adminNavService:AdminNavService

  ){}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getDetails()
    this.adminNavService.supplyHeadText("Managers Profile")
  }
  
  getDetails(){
    this.getService.getManagersInfo().subscribe(
      (data)=>{
        this.managerInfo = data.managers_details.find((each)=>each.manager_id == this.actRoute.snapshot.params.id)
        if(this.managerInfo.profile_picture){
          this.imgURL = `${environment.connectToBackEnd}uploads/images/profile/${this.managerInfo.profile_picture}`;
        }
        this.loading = false
      },(error:HttpErrorResponse)=>{
        this.router.navigate(['manager-profile-exp'])
      }
    )
  }

  changePicture(event){
    const file = event.target.files[0];
    if (event.target.files.length === 0)
    return;
    if (event.target.files.length > 0) {
      if(file.type.match(/image\/*/) != null && (file.size/1048576)<=4){
        this.im = true
        let formData = new FormData
        formData.append('profile_picture', file)
        this.postService.updateManagerProfilePicture(formData).subscribe((data=>{
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
