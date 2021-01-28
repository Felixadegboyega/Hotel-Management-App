import { Component, OnInit } from '@angular/core';
import { AdminNavService } from 'src/app/services/admin-nav.service';

@Component({
  selector: 'app-admin-top',
  templateUrl: './admin-top.component.html',
  styleUrls: ['./admin-top.component.css']
})
export class AdminTopComponent implements OnInit {

  constructor(public adminNavService:AdminNavService) { }
  public headText = ''

  ngOnInit(): void {
    this.adminNavService.headText.subscribe(text=>{
      this.headText = text;
    })
  }

}
