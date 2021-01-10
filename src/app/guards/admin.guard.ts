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
 
  async check(){
    this.getService.getMainAdminInfo().subscribe(data => {
      if (localStorage.getItem('token')) {
        console.log(data);
        this.stat = 1;
        this.router.navigate(['/worker/main-admin']);
      } else {
        this.router.navigate(['/main-admin/login']);
      }
    })
    // if(this.stat == 1){
      return  true;
    // }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.stat == 1){
        alert('hey')
        return this.check()
      }
     
  }

  
}
