import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-newfood',
  templateUrl: './newfood.component.html',
  styleUrls: ['./newfood.component.css']
})
export class NewfoodComponent implements OnInit {

  constructor(public formB:FormBuilder) { }
  public foodDetails = this.formB.group({
    food_name:[''],
    food_picture:['']
  })
  public loading = false;
  public statusText = "Choose photo";
  ngOnInit(): void {
  }
  add(){
    console.log(this.foodDetails.value)
    this.loading = true
  }
  choose(){
    if(this.foodDetails.value.food_picture != ""){
      this.statusText = this.foodDetails.value.food_picture.slice(12);
    }
  }

}
