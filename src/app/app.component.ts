import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  public status = false;
  public mobileQuery :MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(public location:Location, public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher) {}
  
  ngOnInit(): void {
    let url = window.location.href;
    console.log(url)
    if(url.search("main")!=-1){
      this.status = true;
    }
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // drawer.toggle();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
