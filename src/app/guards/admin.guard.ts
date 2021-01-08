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
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let d= this.check()
      if(this.stat == 1 && d){
        return true;
      } else{
        this.router.navigate(['/main-admin/login'])
      }
     
  }

  check(){
    let state = false;
    this.getService.getMainAdminInfo().subscribe(data=>{
      if(localStorage.getItem('token')){
        this.stat = 1;
        state =  true;
      } else{
        this.stat = 1;
        state = false;
      }
    })
    // console.log(state)
      return state;
  }
  
}
