import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public getService:GetService, public actRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRequest()
  }

  getRequest(){
    this.getService.customerCareServiceRequests().subscribe((data:any)=>{
      let a = data.requests.filter((each)=>each.user_id == this.actRoute.snapshot.params.id)
      this.customerCareServiceRequests = a
    })
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

}
