import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileLinkService } from 'src/app/services/profile-link.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  public profileLink;
  public imgURL;
  
  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher, public profileLinkService:ProfileLinkService) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this.profileLink = this.profileLinkService.
    // if(){
      this.profileLinkService.supplyLink2()
    // }
    this.profileLinkService.profileLink.subscribe(link=>{this.profileLink = link})
    this.profileLinkService.profilepics.subscribe(pics=>{if(pics){this.imgURL = pics}})
  }
}
