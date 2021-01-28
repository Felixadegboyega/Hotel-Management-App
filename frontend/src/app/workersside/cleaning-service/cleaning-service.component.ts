import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminNavService } from 'src/app/services/admin-nav.service';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface DialogData {
  first_name:string,
  last_name:string,
  service_note:string,
  email:string,
  service_time:string,
  room_type:string,
  service_id:string,
  parts:String,
  getRequest:Function
}

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.css']
})
export class CleaningServiceComponent implements OnInit {
  public cleaningServiceRequests;
  public searchText;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher, 
    public getService:GetService, 
    public postService:PostService, 
    public snackService:SnackbarService, 
    public matDialog:MatDialog,
    public adminNavService:AdminNavService
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getRequest();
    this.adminNavService.supplyHeadText("Cleaning Service Request")
  }
  getRequest(){
    this.getService.getCleaningServiceRequest().subscribe((data:any)=>{
      this.cleaningServiceRequests = data.requests
    })
  }
  attendto(service_id){
    this.postService.attendToCleaningServiceRequests({service_id}).subscribe((data:any)=>{
      if(data.access){
        this.snackService.snack("You have successfully taken this service", "snackBarSuccess")
        this.getRequest()
      } else{
        this.snackService.snack("Access denied", "snackBarDanger")
      }
    })
  }
  
  viewmore(request){
    const dialogRef = this.matDialog.open(CleaningServiceRequestDetails, {
      width: '450px',
      data: {...request, getRequest(){this.getRequest()}},
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

}










@Component({
  selector: 'Cleaningservicerequestdetails',
  templateUrl: './Cleaningservicerequestdetails.html',
  styleUrls: ['./cleaning-service.component.css']
})
export class CleaningServiceRequestDetails {
  
  constructor( public snackService:SnackbarService, public postService:PostService, public changeDetectorRef: ChangeDetectorRef, public dialogRef:MatDialogRef<CleaningServiceRequestDetails>, public media: MediaMatcher, public getService:GetService, public matDialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // attendto(){
  //   this.postService.attendTocustomerRequests({service_id:this.data.service_id}).subscribe((data:any)=>{
  //     if(data.access){
  //       this.snackService.snack("You have successfully taken this service", "snackBarSuccess")
  //       this.data.getRequest()
  //     }
  //   })
  // }
}