import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cleaning-service',
  templateUrl: './cleaning-service.component.html',
  styleUrls: ['./cleaning-service.component.css']
})
export class CleaningServiceComponent implements OnInit {
  public cleaningServiceRequests = [
    {service_id:0, service_time:"23/12/2020", service_note:"needed to cleaning specifically for wardrobes", status:"not attended to", staff_id:0, user_id:0},
    {service_id:0, service_time:"23/12/2020", service_note:"cleaning of floors", status:"not attended to", staff_id:0, user_id:0}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
