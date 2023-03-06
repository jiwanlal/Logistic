import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  success(message){
    this.snackBar.open(message,null,{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass:'snackbar-success'
    })
  }

  error(message){
    this.snackBar.open(message,null,{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'right',
      panelClass:'snackbar-danger'
    })
  }
}
