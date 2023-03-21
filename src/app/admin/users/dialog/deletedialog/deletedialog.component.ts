import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { custompattern } from 'src/app/admin/pattern.modal';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.sass']
})
export class DeletedialogComponent {
  public formdata:any=FormGroup
  public Onlyalphabets=new custompattern()
  public dialogtitle:string
constructor(public dialogRef: MatDialogRef<DeletedialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder){
console.log(data)

this.dialogtitle=data.actionName
}
ngOnInit(): void {
  console.log(this.data.tabledatadeatils.popupForm)
  }

onSubmit(item){
  console.log(item.actionName)
 
    let sumiteddata={
      action:this.dialogtitle,
      itemsumbited:{
      id:item.tabledatadeatils.id,
      name:item.tabledatadeatils.name
  
        }
    }
  
   this.dialogRef.close(sumiteddata)
}


onNoClick(): void {
  this.dialogRef.close(false);
}
}