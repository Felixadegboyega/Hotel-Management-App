import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CleaningServiceComponent } from './workersside/cleaning-service/cleaning-service.component';
import { CustomerCareServiceComponent } from './workersside/customer-care-service/customer-care-service.component';
import { HomeComponent } from './general_side/home/home.component';
import { LoginComponent } from './users_side/login/login.component';
import { MainAdminLoginComponent } from './main_admin/main-admin-login/main-admin-login.component';
import { MainAdminSignupComponent } from './main_admin/main-admin-signup/main-admin-signup.component';
import { MainAdminComponent } from './main_admin/main-admin/main-admin.component';
import { ManagerLoginComponent } from './workersside/manager-login/manager-login.component';
import { ManagerRegistrationComponent } from './workersside/manager-registration/manager-registration.component';
import { ManagersProfileComponent } from './workersside/managers-profile/managers-profile.component';
import { NotfoundComponent } from './general_side/notfound/notfound.component';
import { OrdersComponent } from './workersside/orders/orders.component';
import { ProfileComponent } from './users_side/profile/profile.component';
import { RoomsComponent } from './general_side/rooms/rooms.component';
import { StaffLoginComponent } from './workersside/staff-login/staff-login.component';
import { StaffProfileComponent } from './workersside/staff-profile/staff-profile.component';
import { StaffsComponent } from './workersside/staffs/staffs.component';
import { StaffRegistrationComponent } from './workersside/staff-registration/staff-registration.component';
import { TestComponent } from './test/test.component';
import { FoodsComponent } from './general_side/foods/foods.component';
import { NewroomComponent } from './workersside/newroom/newroom.component';
import { NewfoodComponent } from './workersside/newfood/newfood.component';
import { SignupComponent } from './users_side/signup/signup.component';
import { MainworkerComponent } from './workersside/mainworker/mainworker.component';
import { OrderhistoryComponent } from './users_side/orderhistory/orderhistory.component';
import { CustomercarehistoryComponent } from './users_side/customercarehistory/customercarehistory.component';
import { CleaninghistoryComponent } from './users_side/cleaninghistory/cleaninghistory.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home", component:HomeComponent},


  {path:"worker", component:MainworkerComponent, children:[
    {path:"customer-care-service", component:CustomerCareServiceComponent},
    {path:"cleaning-service", component:CleaningServiceComponent},
    {path:"main-admin", component:MainAdminComponent},
    {path:"manager-registration", component:ManagerRegistrationComponent},
    {path:"manager-profile/:id", component:ManagersProfileComponent},
    {path:"staffs", component:StaffsComponent},
    {path:"staff-registration", component:StaffRegistrationComponent},
    {path:"staff-profile/:id", component:StaffProfileComponent},
    {path:"orders", component:OrdersComponent},
    {path:"newroom", component:NewroomComponent},
    {path:"newfood", component:NewfoodComponent},
  ]},


  {path:"rooms", component:RoomsComponent},
  {path:"foods", component:FoodsComponent},

  {path:"main-admin/signup", component:MainAdminSignupComponent},
  {path:"main-admin/login", component:MainAdminLoginComponent},
  {path:"manager/login", component:ManagerLoginComponent},
  {path:"staff/login", component:StaffLoginComponent},
  {path:"user/signup", component:SignupComponent},
  {path:"user/login", component:LoginComponent},


  {path:"user/profile/:id",  component:ProfileComponent},
  {path:"user/orders/:id",  component:OrderhistoryComponent},
  {path:"user/customer-care-service/:id",  component:CustomercarehistoryComponent},
  {path:"user/cleaning-service/:id",  component:CleaninghistoryComponent},

  {path:"**", component:NotfoundComponent},

  {path:"test", component:TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
