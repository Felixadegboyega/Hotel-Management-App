import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  public roomArray = []

  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef, 
    public media: MediaMatcher,
    public router:Router,
    public snackService:SnackbarService,
    public getService:GetService
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 500px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getService.getRooms().subscribe(
      (data:any)=>{
        this.roomArray = data.rooms;
      }
    )
  }
  book(id){
    console.log(id)
    this.router.navigate([`/rooms/${id}/book`])
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
