import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher,
    public getService:GetService
  ) {}

  ngOnInit(): void {
  }

  getRequest(){
    this.getService.getCleaningServiceRequest().subscribe((data:any)=>{
      this.cleaningServiceHistory = data.requests
    })
  }
  filterStaff(e){
    this.searchText = e.target.value
  }

}
