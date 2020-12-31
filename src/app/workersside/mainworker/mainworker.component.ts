import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainworker',
  templateUrl: './mainworker.component.html',
  styleUrls: ['./mainworker.component.css']
})
export class MainworkerComponent implements OnInit {
  public staffs =[
    {staff_id:0, unit: "kitchen", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:1, unit: "kitchen", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:2, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:3, unit: "kitchen", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:4, unit: "customer_care_service", status:"manager", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:5, unit: "kitchen", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:6, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "cleaning_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "cleaning_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "cleaning_service", status:"manager", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "cleaning_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "cleaning_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "customer_care_service", status:"manager", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""},
    {staff_id:0, unit: "customer_care_service", status:"staff", first_name:"Felix", dob:"21/21/2121", last_name:"Adegboyega", phone_number:"08035292607", email:"felixadegboyega2019@gmail.com", type:"Kitchen Staff", profile_picture:""}
 ]
  public kitchenManagerLink;
  public cleaningServiceManagerLink;
  public customerCareServiceManagerLink;

  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


     // let kitchen = this.staffs.find(each=>each.status=="manager"&&each.unit=="kitchen")
    // // if(kitchen){
    //   console.log(kitchen)
    // // }
    // this.kitchenManagerLink = `/staff-profile/${kitchen.staff_id}`
    // let cleaning = this.staffs.find(each=>each.status=="manager"&&each.unit=="cleaning_service")
    // this.cleaningServiceManagerLink = `/staff-profile/${cleaning.staff_id}`
    // let customer = this.staffs.find(each=>each.status=="manager"&&each.unit=="customer_care_service")
    // this.customerCareServiceManagerLink = `staff-profile/${customer.staff_id}`
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
