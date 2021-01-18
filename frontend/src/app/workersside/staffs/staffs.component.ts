import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';


export interface DialogData {
  first_name:string,
  last_name:string,
  email:string,
  staff_id:any,
  unit_name:any,
  status:string
}

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit {
  
  columns: string[] = ['id', 'name', 'phone_number', 'type'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public staffs =[]
  public searchText = ""
  public loading = true
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    public router:Router,
    public getService:GetService,
    public postService:PostService,
    public snackBar:MatSnackBar,
    public snackService:SnackbarService,
    public matDialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getStaff()
  }
  getStaff(){
    this.getService.getAllStaffs().subscribe(
      (data:any)=>{
        this.loading = false;
        this.staffs = data.staffs_details
      },(err:HttpErrorResponse)=>{
        this.router.navigate(['/staff-profile-exp'])
      }
    )
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  filterStaff(e){
    this.searchText = e.target.value
  }
  changeStage(staff_id){
    let staff = this.staffs.find((each,i)=>each.staff_id==staff_id);
    if(staff.stage == 'staff'){
      this.postService.makeUnitManager({staff_id, unit_id:staff.unit_id}).subscribe((data:any)=>{
        if(data.updated){
          this.getStaff()
          this.snackBar.open(`You have successfully make ${staff.first_name} ${staff.last_name} the manager of ${staff.unit_name} unit`,'X',{
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 5000,
            panelClass: ['snackBarSuccess'],
          });
        } else if(!data.access){
          this.snackService.snack("Permission not granted", "snackBarDanger")
        }
      })
    } else if(staff.stage == 'manager'){
      this.postService.makeUnitManager({staff_id, unit_id:staff.unit_id}).subscribe((data:any)=>{
        if(data.updated){
          this.getStaff()
          this.snackBar.open(`You have successfully remove ${staff.first_name} ${staff.last_name} from being the manager of ${staff.unit_name} unit`,'X',{
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 5000,
            panelClass: ['snackBarSuccess'],
          });
        } else if(!data.access){
          this.snackService.snack("Permission not granted", "snackBarDanger")
        }
      })
    }
  }

  openDialog(staff){
    const dialogRef = this.matDialog.open(ConfirmStatusDialogue, {
      width:"320px",
      data:staff
    })

    dialogRef.afterClosed().subscribe(result => {
        this.getStaff();
    });
  }


}






@Component({
  selector: 'Confirm-Status',
  templateUrl: './confirmStatus.html',
  styleUrls: ['./staffs.component.css']
})
export class ConfirmStatusDialogue {
  
  constructor(
    public postService:PostService,
    public snackBar:MatSnackBar,
    public snackService:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data :DialogData,
    public dialogRef:MatDialogRef<ConfirmStatusDialogue>
  ) {}

  changeStatus(){
    if(this.data.status == 'current'){
      this.postService.makeStaffFormal({staff_id: this.data.staff_id}).subscribe((res:any)=>{
        if(res.updated){
          this.onNoClick()
          this.snackBar.open(`You have successfully remove ${this.data.first_name} ${this.data.last_name} from current staff list of ${this.data.unit_name} unit`,'X',{
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 5000,
            panelClass: ['snackBarSuccess'],
          });
        } else if(!res.access){
          this.snackService.snack("Permission not granted", "snackBarDanger")
        }
      })
    } else if(this.data.status == 'formal'){
      this.postService.makeStaffFormal({staff_id: this.data.staff_id}).subscribe((res:any)=>{
        if(res.updated){
          this.onNoClick()
          this.snackBar.open(`You have successfully make ${this.data.first_name} ${this.data.last_name} a current staff of ${this.data.unit_name} unit`,'X',{
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 5000,
            panelClass: ['snackBarSuccess'],
          });
        } else if(!res.access){
          this.snackService.snack("Permission not granted", "snackBarDanger")
        }
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
