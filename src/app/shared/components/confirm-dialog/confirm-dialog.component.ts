import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialogComponent {

  title = "Are you sure you want to delete?";
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,){
   
    }
    ngOnInit(): void {
      
      }
    
    onYesClick(){
    
      this.dialogRef.close(true)
    }
    
    
    onNoClick(): void {
      this.dialogRef.close(false);
    }
}
