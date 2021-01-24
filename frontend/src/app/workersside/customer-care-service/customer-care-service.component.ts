import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';


export interface DialogData {
  first_name:string,
  last_name:string,
  careservice_note:string,
  email:string,
  careservice_time:string,
  room_type:string,
  careservice_id:string,
  type:string,
  getRequest:Function
}


@Component({
  selector: 'app-customer-care-service',
  templateUrl: './customer-care-service.component.html',
  styleUrls: ['./customer-care-service.component.css']
})
export class CustomerCareServiceComponent implements OnInit {
  public customerCareServiceRequests;

  public searchText;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(public changeDetectorRef: ChangeDetectorRef, public snackService:SnackbarService, public postService:PostService, public media: MediaMatcher, public getService:GetService, public matDialog:MatDialog) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getRequest()
  }
  getRequest(){
    this.getService.customerCareServiceRequests().subscribe((data)=>{
      this.customerCareServiceRequests = data.requests
      console.log(data.requests)
    })
  }
  attendto(careservice_id){
    this.postService.attendTocustomerCareRequests({careservice_id}).subscribe((data:any)=>{
      if(data.access){
        this.snackService.snack("You have successfully taken this service", "snackBarSuccess")
        this.getRequest()
      } else{
        this.snackService.snack("Access denied", "snackBarDanger")
      }
    })
  }
  
  viewmore(request){
    const dialogRef = this.matDialog.open(Customercareservicerequest, {
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
  selector: 'customercareservicerequest',
  templateUrl: './customercareservicerequestdetails.html',
  styleUrls: ['./customer-care-service.component.css']
})
export class Customercareservicerequest {
  
  constructor( public dialogRef:MatDialogRef<Customercareservicerequest>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // attendto(){
  //   this.postService.attendTocustomerCareRequests({careservice_id:this.data.careservice_id}).subscribe((data:any)=>{
  //     if(data.access){
  //       this.snackService.snack("You have successfully taken this service", "snackBarSuccess")
  //       this.data.getRequest()
  //     }
  //   })
  // }
}

