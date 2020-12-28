import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-care-service',
  templateUrl: './customer-care-service.component.html',
  styleUrls: ['./customer-care-service.component.css']
})
export class CustomerCareServiceComponent implements OnInit {
  public customerCareServiceRequests = [
    {careservice_id:0, careservice_time:"23/12/2020", careservice_note:"issues with bulb", status:"not attended to", staff_id:0, user_id:0},
    {careservice_id:0, careservice_time:"23/12/2020", careservice_note:"dont really know how to use the Hotel app", status:"not attended to", staff_id:0, user_id:0}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
