import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tarrifdelete',
  templateUrl: './tarrifdelete.component.html',
  styleUrls: ['./tarrifdelete.component.sass']
})
export class TarrifdeleteComponent {
  public dialogtitle:string

  constructor(public dialogRef: MatDialogRef<TarrifdeleteComponent>,@Inject(MAT_DIALOG_DATA) public data){
    console.log(data)
    
    this.dialogtitle=data.actionName
    }
  onSubmit(item){
    console.log(item.actionName)
   
      let sumiteddata={
        action:this.dialogtitle,
        Id:item.tabledatadeatils.Id,
        itemsumbited:{name:item.tabledatadeatils.name}
      }
    
     this.dialogRef.close(sumiteddata)
  }
  
onNoClick(): void {
  this.dialogRef.close(false);
}
}
