import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  public mainAdminInfo = {admin_id:0, first_name:"Felix", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", profile_picture:""}
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher, public getService : GetService) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getService.getMainAdminInfo().subscribe(data=>{
      console.log(data);
    })
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
