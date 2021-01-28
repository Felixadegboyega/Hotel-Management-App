import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminNavService } from 'src/app/services/admin-nav.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-newfood',
  templateUrl: './newfood.component.html',
  styleUrls: ['./newfood.component.css']
})
export class NewfoodComponent implements OnInit {

  constructor(
    public formB:FormBuilder, 
    public postService:PostService, 
    public router :Router, 
    public snackService:SnackbarService,
    public adminNavService:AdminNavService
  ) { }

  public foodDetails = this.formB.group({
    food_name:['',Validators.required],
    food_picture:[''],
    from:['', [Validators.required,  Validators.max(24),  Validators.min(0)]],
    to:['', [Validators.required, Validators.max(24),  Validators.min(0)]],
  })
  public loading = false;
  public statusText = "Choose photo";
  public im = false;
  public imagePath;
  imgURL: any;


  ngOnInit(): void {
    this.adminNavService.supplyHeadText("Add New Food")
  }


  choose(event){
    const file = event.target.files[0];
    if (event.target.files.length === 0)
    return;
    this.statusText = file.name;
    if (event.target.files.length > 0) {
      if(file.type.match(/image\/*/) != null && (file.size/1048576)<=4){
        this.im = true
        this.foodDetails.get('food_picture').setValue(file);
      } else {
        this.im = false
      }
    }


    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  add(){
    this.loading = true;
    const formData = new FormData();
    formData.append('food_name', this.foodDetails.get('food_name').value)
    formData.append('to', this.foodDetails.get('to').value)
    formData.append('from', this.foodDetails.get('from').value)
    formData.append('food_picture', this.foodDetails.get('food_picture').value);
    this.postService.newFood(formData).subscribe(
      (data:any)=>{
        this.loading = false; 
        if(data.query_status){
          this.snackService.snack("Food added Successfully", "snackBarSuccess")
        } else if(!data.access){
          this.snackService.snack("Access Denied", "snackBarDanger")
        } else {
          this.snackService.snack("An error occured", "snackBarDanger")
        }
      },(err:HttpErrorResponse)=>{
        // this.router.navigate(['/staff/login'])
        this.loading = false;
      }
    )
  }
    hours(){
      return this.foodDetails.value.to - this.foodDetails.value.from
    }

}
