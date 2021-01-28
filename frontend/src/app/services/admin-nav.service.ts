import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetService } from './get.service';

@Injectable({
  providedIn: 'root'
})
export class AdminNavService {
  public online :BehaviorSubject<any> = new BehaviorSubject('');
  supplyData(link){
    this.online.next(link);
  }

  constructor(
    public getService:GetService
  ) { }

  getOnline(){
    this.getService.getOnlineAdmin().subscribe(
      (data:any)=>{
        this.supplyData(data)
      }
    )
  }
}
