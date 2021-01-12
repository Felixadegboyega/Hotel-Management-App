import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public connect:HttpClient) { }
  public baseUrl = environment.connectToBackEnd;
  mainAdminSignup(user_info){
    return this.connect.post<any>(`${this.baseUrl}main_admin/signup.php`, user_info);
  }
  mainAdminSignIn(user_info){
    return this.connect.post<any>(`${this.baseUrl}main_admin/signin.php`, user_info);
  }
  updateAdminProfile(user_info){
    return this.connect.post<any>(`${this.baseUrl}main_admin/editprofile.php`, user_info);
  }


  managerSignUp(user_info){
    return this.connect.post<any>(`${this.baseUrl}worker/managers/register.php`, user_info);
  }
  managerSignIn(user_info){
    return this.connect.post<any>(`${this.baseUrl}worker/managers/signin.php`, user_info);
  }
  updateManagerInfo(user_info){
    return this.connect.post<any>(`${this.baseUrl}worker/managers/editprofile.php`, user_info);
  }
  
  
  HRSignUp(user_info){
      return this.connect.post<any>(`${this.baseUrl}worker/hr/register.php`, user_info);
    }
  HRSignIn(user_info){
      return this.connect.post<any>(`${this.baseUrl}worker/hr/signin.php`, user_info);
    }
  updateHRInfo(user_info){
      return this.connect.post<any>(`${this.baseUrl}worker/hr/editprofile.php`, user_info);
    }



    staffSignUp(user_info){
      return this.connect.post<any>(`${this.baseUrl}worker/staffs/register.php`, user_info);
    }
    staffSignIn(user_info){
      return this.connect.post<any>(`${this.baseUrl}worker/staffs/signin.php`, user_info);
    }
    updateStaffInfo(user_info){
      return this.connect.post<any>(`${this.baseUrl}worker/staffs/editprofile.php`, user_info);
    }



    UserSignUp(user_info){
      return this.connect.post<any>(`${this.baseUrl}users/signup.php`, user_info);
    }
    managerUserSignIn(user_info){
      return this.connect.post<any>(`${this.baseUrl}users/signin.php`, user_info);
    }
    updateUserInfo(user_info){
      return this.connect.post<any>(`${this.baseUrl}users/editprofile.php`, user_info);
    }
    
    
    createRoom(room_info){
      return this.connect.post<any>(`${this.baseUrl}/general/rooms/addnewroom.php`, room_info);
    }
      
}
    