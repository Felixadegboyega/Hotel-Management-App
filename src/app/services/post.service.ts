import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public connect:HttpClient) { }
  sendDetails(link, user_info){
    return this.connect.post<any>(`${environment.connectToBackEnd}${link}`, user_info)
  }

}
