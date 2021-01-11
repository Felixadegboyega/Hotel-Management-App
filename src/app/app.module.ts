import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from "@angular/cdk/a11y";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { OverlayModule } from "@angular/cdk/overlay";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './general_side/navbar/navbar.component';
import { HomeComponent } from './general_side/home/home.component';
import { RoomsComponent } from './general_side/rooms/rooms.component';
import { ProfileComponent } from './users_side/profile/profile.component';
import { StaffsComponent } from './workersside/staffs/staffs.component';
import { StaffProfileComponent } from './workersside/staff-profile/staff-profile.component';
import { ManagersProfileComponent } from './workersside/managers-profile/managers-profile.component';
import { NotfoundComponent } from './general_side/notfound/notfound.component';
import { LoginComponent } from './users_side/login/login.component';
import { SignupComponent } from './users_side/signup/signup.component';
import { ManagerLoginComponent } from './workersside/manager-login/manager-login.component';
import { StaffLoginComponent } from './workersside/staff-login/staff-login.component';
import { MainAdminComponent } from './main_admin/main-admin/main-admin.component';
import { MainAdminSignupComponent } from './main_admin/main-admin-signup/main-admin-signup.component';
import { ManagerRegistrationComponent } from './workersside/manager-registration/manager-registration.component';
import { MainAdminLoginComponent } from './main_admin/main-admin-login/main-admin-login.component';
import { StaffRegistrationComponent } from './workersside/staff-registration/staff-registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StaffsearchPipe } from './pipes/staffsearch.pipe';
import { NewroomComponent } from './workersside/newroom/newroom.component';
import { NewfoodComponent } from './workersside/newfood/newfood.component';
import { FoodsComponent } from './general_side/foods/foods.component';
import { MainworkerComponent } from './workersside/mainworker/mainworker.component';
import { CleaninghistoryComponent } from './users_side/cleaninghistory/cleaninghistory.component';
import { CustomercarehistoryComponent } from './users_side/customercarehistory/customercarehistory.component';
import { OrderhistoryComponent } from './users_side/orderhistory/orderhistory.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { HrComponent } from './workersside/hr/hr.component';
import { HrLoginComponent } from './workersside/hr-login/hr-login.component';
import { HrRegistrationComponent } from './workersside/hr-registration/hr-registration.component';
import { ManagerProfileExpComponent } from './workersside/manager-profile-exp/manager-profile-exp.component';
import { HrProfileExpComponent } from './workersside/hr-profile-exp/hr-profile-exp.component';
import { StaffProfileExpComponent } from './workersside/staff-profile-exp/staff-profile-exp.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NavbarComponent,
    HomeComponent,
    RoomsComponent,
    ProfileComponent,
    StaffsComponent,
    StaffProfileComponent,
    ManagersProfileComponent,
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    ManagerLoginComponent,
    StaffLoginComponent,
    MainAdminComponent,
    MainAdminSignupComponent,
    ManagerRegistrationComponent,
    MainAdminLoginComponent,
    StaffRegistrationComponent,
    NewroomComponent,
    StaffsearchPipe,
    NewfoodComponent,
    FoodsComponent,
    MainworkerComponent,
    CleaninghistoryComponent,
    CustomercarehistoryComponent,
    OrderhistoryComponent,
    HrComponent,
    HrLoginComponent,
    HrRegistrationComponent,
    ManagerProfileExpComponent,
    HrProfileExpComponent,
    StaffProfileExpComponent,
    
  ],
  imports: [
    CdkTreeModule,
    CdkTableModule,
    CdkStepperModule,
    ScrollingModule,
    PortalModule,
    MatSliderModule,
    DragDropModule,
    ClipboardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    MatButtonModule,
    MatIconModule,
    A11yModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
})
export class AppModule { }
