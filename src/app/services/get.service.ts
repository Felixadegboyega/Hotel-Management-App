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
}
