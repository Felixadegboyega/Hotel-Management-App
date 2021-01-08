import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar:MatSnackBar) { }
  snack(message:string, panelClass:'snackBarSuccess' | 'snackBarDanger'){
    this.snackBar.open(message,'X',{
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 2500,
      panelClass: [panelClass],
    });
  };
}
