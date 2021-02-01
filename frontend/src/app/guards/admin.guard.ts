import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GetService } from '../services/get.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public getService:GetService, public router:Router){}
  public stat = 0;
 
  async check():Promise <boolean  | UrlTree>{
    await this.getService.getMainAdminInfo().subscribe(data => {
      if (localStorage.getItem('token')) {
        console.log(data);
        return true
      } else {
        this.router.navigate(['/main-admin/login']);
      }
    }),(err:HttpErrorResponse)=>{
      console.log(err)
      // this.stat = 2
      this.router.navigate(['/main-admin/login']);
    }
    return true
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.check()
    }

  
}
