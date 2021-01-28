import { MediaMatcher } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminNavService } from 'src/app/services/admin-nav.service';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  public mainAdminInfo;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  public loading = true;
  public im = false;
  public imagePath;
  public imgURL;
  
  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher, public getService : GetService, 
    public postService:PostService, public adminNavService:AdminNavService
    ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getDetails();
    this.adminNavService.supplyHeadText("Admin Profile")
  }
  
  getDetails(){
    this.getService.getMainAdminInfo().subscribe(data=>{
      this.mainAdminInfo = data.admin_details
      if(this.mainAdminInfo.profile_picture){
        this.imgURL = `${environment.connectToBackEnd}uploads/images/profile/${this.mainAdminInfo.profile_picture}`;
      }
      this.loading = false;
    }, (err:HttpErrorResponse)=>{
      if(err){
        console.log(err.error)
      }
    })

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
        this.postService.updateAdminProfilePicture(formData).subscribe((data=>{
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
