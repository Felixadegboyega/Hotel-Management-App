import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-cleaninghistory',
  templateUrl: './cleaninghistory.component.html',
  styleUrls: ['./cleaninghistory.component.css']
})
export class CleaninghistoryComponent implements OnInit {

  public cleaningServiceHistory ;
  public searchText;
  
  constructor(
    public getService:GetService, public actRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRequest()
  }

  getRequest(){
    this.getService.getCleaningServiceRequest().subscribe((data:any)=>{
      let a = data.requests.filter((each)=>each.user_id == this.actRoute.snapshot.params.id)
      this.cleaningServiceHistory = a
    })
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

}
