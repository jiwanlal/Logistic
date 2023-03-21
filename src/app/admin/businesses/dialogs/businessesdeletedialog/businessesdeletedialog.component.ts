import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { custompattern } from 'src/app/admin/pattern.modal';

@Component({
  selector: 'app-businessesdeletedialog',
  templateUrl: './businessesdeletedialog.component.html',
  styleUrls: ['./businessesdeletedialog.component.sass']
})
export class BusinessesdeletedialogComponent {
  public formdata:any=FormGroup
  public Onlyalphabets=new custompattern()
  public dialogtitle:string
constructor(public dialogRef: MatDialogRef<BusinessesdeletedialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder){
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
      id:item.tabledatadeatils.id,
      itemsumbited:{name:item.tabledatadeatils.name}
    }
  
   this.dialogRef.close(sumiteddata)
}


onNoClick(): void {
  this.dialogRef.close(false);
}
}
