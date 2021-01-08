import { MediaMatcher } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

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
  
  constructor(public getService:GetService,public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher, public actRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getService.getManagersInfo().subscribe(
      (data)=>{
        console.log(data)
        this.managerInfo = data.managers_details.find((each,i)=>each.manager_id == this.actRoute.snapshot.params.id)
        this.loading = false
      },(error:HttpErrorResponse)=>{

      }
    )
    
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
