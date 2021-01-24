import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-customercarehistory',
  templateUrl: './customercarehistory.component.html',
  styleUrls: ['./customercarehistory.component.css']
})
export class CustomercarehistoryComponent implements OnInit {

  public customerCareServiceRequests;
  public searchText;
  constructor(
    public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher,
    public getService:GetService
  ) {}

  ngOnInit(): void {
  }

  getRequest(){
    this.getService.getCleaningServiceRequest().subscribe((data:any)=>{
      this.customerCareServiceRequests = data.requests
    })
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

}
