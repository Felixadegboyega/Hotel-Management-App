import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-newfood',
  templateUrl: './newfood.component.html',
  styleUrls: ['./newfood.component.css']
})
export class NewfoodComponent implements OnInit {

  constructor(public formB:FormBuilder, public postService:PostService, public router :Router, public snackService:SnackbarService) { }
  public foodDetails = this.formB.group({
    food_name:['',Validators.required],
    food_picture:[''],
    from:['', [Validators.required,  Validators.max(24),  Validators.min(0)]],
    to:['', [Validators.required, Validators.max(24),  Validators.min(0)]],
  })
  file_data:any=''
  public loading = false;
  public statusText = "Choose photo";
  public files =""
  ngOnInit(): void {
  }
  choose(event){
    if(this.foodDetails.value.food_picture != ""){
      this.statusText = this.foodDetails.value.food_picture.slice(12);
      const fileList: FileList = event.target.files;
      const file = fileList[0];
      if((file.size/1048576)<=4){
        this.foodDetails.value.food_picture = {size:file.size, name:file.name}
      }else{
        this.snackService.snack("File size exceeds 4 MB. Please choose less than 4 MB", "snackBarDanger")
      }
    }
  }
  add(){
    this.loading = true
      this.postService.newFood(this.foodDetails.value).subscribe(
        (data:any)=>{
          this.loading = false;
          if(data.query_status){
            this.snackService.snack("Food added Successfully", "snackBarSuccess")
          } else {
            this.snackService.snack("An error occured", "snackBarDanger")
          }
        },(err:HttpErrorResponse)=>{
          this.router.navigate(['/staff/login'])
          this.loading = false;
        }
      )
  }
    hours(){
      return this.foodDetails.value.to - this.foodDetails.value.from
    }

}
