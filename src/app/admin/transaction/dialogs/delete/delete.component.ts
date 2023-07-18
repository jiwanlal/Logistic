import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent {
  public dialogtitle:string

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,@Inject(MAT_DIALOG_DATA) public data){
    console.log(data)
    
    this.dialogtitle=data.actionName
    }
  onSubmit(item){
    console.log(item.actionName,item,item.tabledatadeatils.id)
   
      let sumiteddata={
        action:this.dialogtitle,
        Id:item.tabledatadeatils.id,
        
      }
    
     this.dialogRef.close(sumiteddata)
  }
  
onNoClick(): void {
  this.dialogRef.close(false);
}
}
