import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetService } from './get.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileLinkService {
  public profileLink :BehaviorSubject<string> = new BehaviorSubject('');
  public profilepics :BehaviorSubject<string> = new BehaviorSubject('');
  supplyLink(link){
    this.profileLink.next(link)
  }
  supplyPicture(picture){
    this.profilepics.next(picture)
  }

  constructor(public getService:GetService) { }

  supplyLink2(){
    this.getService.getOnlineUsers().subscribe(
      (data:any)=>{
        this.supplyLink(`user/profile/${data.user_details.user_id}`)
        this.supplyPicture(`${environment.connectToBackEnd}uploads/images/profile/${data.user_details.profile_picture}`)
      }
    )
  }


}
