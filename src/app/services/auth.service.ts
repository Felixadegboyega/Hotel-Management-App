import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from './get.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public connect:HttpClient, public getService:GetService, public router:Router) {}
  // getMainAdminInfo(){
  //   return this.connect.get<any>(`${environment.connectToBackEnd}main_admin/details.php`);
  // }
  admincheck(): any{
    this.getService.getMainAdminInfo().subscribe(data=>{
      if(localStorage.getItem('token') && data && data.for == 'admin'){
        return true
      } else {
        return false;
      }
    },(err:HttpErrorResponse)=>{
      this.router.navigate(['/main-admin/login'])
      return false;
    })
  }
  
}
