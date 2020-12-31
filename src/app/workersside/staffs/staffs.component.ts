import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  
  public staffs =[
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:1, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:2, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:3, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:4, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:5, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:6, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
     {staff_id:0, first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""}
  ]
  public searchText;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

}
