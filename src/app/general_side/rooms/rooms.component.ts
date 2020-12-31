import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  public roomArray = [
    {room_id:0, room_type:"Executive"},
    {room_id:0, room_type:"Executive"},
    {room_id:0, room_type:"Executive"},
    {room_id:0, room_type:"Executive"},
    {room_id:0, room_type:"Executive"},
    {room_id:0, room_type:"Executive"},
    {room_id:0, room_type:"Executive"},
    {room_id:0, room_type:"Executive"},
    {room_id:1, room_type:"Conference Room"} 
  ]

  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 500px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
