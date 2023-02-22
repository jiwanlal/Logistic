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

onSubmit(item,id){
 console.log(id)
 if(this.data.tabledatadeatils.popupForm=='countryDailog'){
  let sumiteddata={
    action:item,
    itemsumbited:{
        country_id:this.data.tabledatadeatils.country_id,
        country_name:this.data.tabledatadeatils.country_name

      }
  }
  this.dialogRef.close(sumiteddata)
 }
 if(this.data.tabledatadeatils.popupForm=='zoneDailog'){
  let sumiteddata={
    action:item,
    itemsumbited:{
        zone_id:this.data.tabledatadeatils.zone_id,
        zone_name:this.data.tabledatadeatils.zone_name

      }
  }
  this.dialogRef.close(sumiteddata)
 }
 if(this.data.tabledatadeatils.popupForm=='regionDailog'){
  let sumiteddata={
    action:item,
    itemsumbited:{
        zone_id:this.data.tabledatadeatils.region_id,
        zone_name:this.data.tabledatadeatils.region_name

      }
  }
  this.dialogRef.close(sumiteddata)
 }
 


  

}


onNoClick(): void {
  this.dialogRef.close(false);
}
}
