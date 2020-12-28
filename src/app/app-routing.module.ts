import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CleaningServiceComponent } from './general_side/cleaning-service/cleaning-service.component';
import { CustomerCareServiceComponent } from './general_side/customer-care-service/customer-care-service.component';
import { HomeComponent } from './general_side/home/home.component';
import { LoginComponent } from './users_side/login/login.component';
import { MainAdminLoginComponent } from './main_admin/main-admin-login/main-admin-login.component';
import { MainAdminSignupComponent } from './main_admin/main-admin-signup/main-admin-signup.component';
import { MainAdminComponent } from './main_admin/main-admin/main-admin.component';
import { ManagerLoginComponent } from './workersside/manager-login/manager-login.component';
import { ManagerRegistrationComponent } from './workersside/manager-registration/manager-registration.component';
import { ManagersProfileComponent } from './workersside/managers-profile/managers-profile.component';
import { NotfoundComponent } from './general_side/notfound/notfound.component';
import { OrdersComponent } from './general_side/orders/orders.component';
import { ProfileComponent } from './users_side/profile/profile.component';
import { RoomsComponent } from './general_side/rooms/rooms.component';
import { StaffLoginComponent } from './workersside/staff-login/staff-login.component';
import { StaffProfileComponent } from './workersside/staff-profile/staff-profile.component';
import { StaffsComponent } from './workersside/staffs/staffs.component';
import { SubManagersComponent } from './workersside/sub-managers/sub-managers.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home", component:HomeComponent},
  {path:"main-admin/signup", component:MainAdminSignupComponent},
  {path:"main-admin", component:MainAdminComponent},
  {path:"main-admin/login", component:MainAdminLoginComponent},
  {path:"managers-profile/:type_id/:id", component:ManagersProfileComponent},
  {path:"managers-registration/:type_id", component:ManagerRegistrationComponent},
  {path:"sub-managers", component:SubManagersComponent},
  {path:"manager/login", component:ManagerLoginComponent},
  {path:"staff-profile/:id", component:StaffProfileComponent},
  {path:"staffs/type_id", component:StaffsComponent},
  {path:"staff/login", component:StaffLoginComponent},
  {path:"kitchen/orders", component:OrdersComponent},
  {path:"customer/customer-care-service", component:CustomerCareServiceComponent},
  {path:"cleaning/cleaning-service", component:CleaningServiceComponent},
  {path:"rooms", component:RoomsComponent},
  {path:"login", component:LoginComponent},
  {path:"profile/:id", component:ProfileComponent},
  {path:"user/:id/orders", component:OrdersComponent},
  {path:"user/:id/customer-care-service", component:OrdersComponent},
  {path:"user/:id/cleaning-service", component:OrdersComponent},
  {path:"**", component:NotfoundComponent},
  {path:"test", component:TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
