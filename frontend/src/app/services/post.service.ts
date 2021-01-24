import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public connect:HttpClient) { }
  public baseUrl = environment.connectToBackEnd;
  mainAdminSignup(info){
    return this.connect.post<any>(`${this.baseUrl}main_admin/signup.php`, info);
  }
  mainAdminSignIn(info){
    return this.connect.post<any>(`${this.baseUrl}main_admin/signin.php`, info);
  }
  updateAdminProfile(info){
    return this.connect.post<any>(`${this.baseUrl}main_admin/editprofile.php`, info);
  }


  managerSignUp(info){
    return this.connect.post<any>(`${this.baseUrl}worker/managers/register.php`, info);
  }
  managerSignIn(info){
    return this.connect.post<any>(`${this.baseUrl}worker/managers/signin.php`, info);
  }
  updateManagerInfo(info){
    return this.connect.post<any>(`${this.baseUrl}worker/managers/editprofile.php`, info);
  }
  
  
  HRSignUp(info){
      return this.connect.post<any>(`${this.baseUrl}worker/hr/register.php`, info);
    }
  HRSignIn(info){
      return this.connect.post<any>(`${this.baseUrl}worker/hr/signin.php`, info);
    }
  updateHRInfo(info){
      return this.connect.post<any>(`${this.baseUrl}worker/hr/editprofile.php`, info);
    }



    staffSignUp(info){
      return this.connect.post<any>(`${this.baseUrl}worker/staffs/register.php`, info);
    }
    staffSignIn(info){
      return this.connect.post<any>(`${this.baseUrl}worker/staffs/signin.php`, info);
    }
    makeUnitManager(info){
      return this.connect.post<any>(`${this.baseUrl}worker/staffs/editstage.php`, info);
    }
    makeStaffFormal(info){
      return this.connect.post<any>(`${this.baseUrl}worker/staffs/editstatus.php`, info);
    }
    updateStaffInfo(info){
      return this.connect.post<any>(`${this.baseUrl}worker/staffs/editprofile.php`, info);
    }



    UserSignUp(info){
      return this.connect.post<any>(`${this.baseUrl}users/signup.php`, info);
    }
    UserSignIn(info){
      return this.connect.post<any>(`${this.baseUrl}users/signin.php`, info);
    }
    updateUserInfo(info){
      return this.connect.post<any>(`${this.baseUrl}users/editprofile.php`, info);
    }
    
    
    createRoom(room_info){
      return this.connect.post<any>(`${this.baseUrl}general/rooms/addnewroom.php`, room_info);
    }

    newFood(food_info){
      return this.connect.post<any>(`${this.baseUrl}general/foods/addnewfood.php`, food_info);
    }
    
    newOrder(order_info){
      return this.connect.post<any>(`${this.baseUrl}general/orders/makeneworder.php`, order_info);
    }
    attendToOrders(info){
      return this.connect.post<any>(`${this.baseUrl}general/orders/attendto.php`, info);
    }
    
    
    BookRoom(room_info){
      return this.connect.post<any>(`${this.baseUrl}general/rooms/bookroom.php`, room_info);
    }
    
    
    cleaningRequest(request_info){
      return this.connect.post<any>(`${this.baseUrl}general/cleaningService/newrequest.php`, request_info);
    }
    attendToCleaningServiceRequests(info){
      return this.connect.post<any>(`${this.baseUrl}general/cleaningService/attendto.php`, info);
    }
    
    customerCareRequest(info){
      return this.connect.post<any>(`${this.baseUrl}general/customercareservice/newrequest.php`, info);
    }
    attendTocustomerCareRequests(info){
      return this.connect.post<any>(`${this.baseUrl}general/customercareservice/attendto.php`, info);
    }
      
}
    