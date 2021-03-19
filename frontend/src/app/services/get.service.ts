import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(public connect:HttpClient) { }
  getMainAdminInfo(){
    return this.connect.get<any>(`${environment.connectToBackEnd}main_admin/details.php`);
  }


  getManagersInfo(){
    return this.connect.get<any>(`${environment.connectToBackEnd}worker/managers/alldetails.php`);
  }


  getHrsInfo(){
    return this.connect.get<any>(`${environment.connectToBackEnd}worker/hr/details.php`);
  }


  getUnits(){
    return this.connect.get<any>(`${environment.connectToBackEnd}general/units/units.php`);
  }
  
  getAllStaffs(){
    return this.connect.get<any>(`${environment.connectToBackEnd}worker/staffs/allstaff.php`);
  }
  
  getRooms(){
  return this.connect.get<any>(`${environment.connectToBackEnd}general/rooms/all_rooms.php`);
  }

  getFoods(){
  return this.connect.get<any>(`${environment.connectToBackEnd}general/foods/allfood.php`);
}

getAllUsers(){
    return this.connect.get<any>(`${environment.connectToBackEnd}users/allusers.php`);
  }
getOnlineUsers(){
    return this.connect.get<any>(`${environment.connectToBackEnd}users/onlineuser.php`);
  }
  
  getOrders(){
    return this.connect.get<any>(`${environment.connectToBackEnd}general/orders/allorders.php`);
  }
  
  getCleaningServiceRequest(){
    return this.connect.get<any>(`${environment.connectToBackEnd}general/cleaningService/allrequest.php`);
  }
  
  customerCareServiceRequests(){
    return this.connect.get<any>(`${environment.connectToBackEnd}general/customercareservice/allrequest.php`);
  }
  
  getOnlineAdmin(){
    return this.connect.get<any>(`${environment.connectToBackEnd}general/adminauth.php`);
  }

  refreshToken(){
    return this.connect.get<any>(`${environment.connectToBackEnd}general/token_refresh.php`);
  }
  
  getBookings(){
    return this.connect.get<any>(`${environment.connectToBackEnd}general/bookings.php`);
  }
}
