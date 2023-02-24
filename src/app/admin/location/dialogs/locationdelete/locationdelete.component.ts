import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { custompattern } from '../../lactiontable/pattern.modal';

@Component({
  selector: 'app-locationdelete',
  templateUrl: './locationdelete.component.html',
  styleUrls: ['./locationdelete.component.sass']
})
export class LocationdeleteComponent {
  public formdata:any=FormGroup
  public Onlyalphabets=new custompattern()
  public dialogtitle:string
constructor(public dialogRef: MatDialogRef<LocationdeleteComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder){
console.log(data.tabledatadeatils.Actions)
this.dialogtitle=data.actionName
}
ngOnInit(): void {
  console.log(this.data.tabledatadeatils.popupForm)
  }

onSubmit(item,Id){
 
  let sumiteddata={
    action:item,
    itemsumbited:{
        Id:Id,
        Name:this.data.tabledatadeatils.Name

      }
  }
  this.dialogRef.close(sumiteddata)
}


onNoClick(): void {
  this.dialogRef.close(false);
}
}
