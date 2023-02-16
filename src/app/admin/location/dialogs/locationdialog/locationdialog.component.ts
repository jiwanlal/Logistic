import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { custompattern } from '../../lactiontable/pattern.modal';

@Component({
  selector: 'app-locationdialog',
  templateUrl: './locationdialog.component.html',
  styleUrls: ['./locationdialog.component.sass']
})
export class LocationdialogComponent implements OnInit {
  public formdata:any=FormGroup
  public Onlyalphabets=new custompattern()
  public dialogtitle:string
constructor(public dialogRef: MatDialogRef<LocationdialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder){
console.log(data.tabledatadeatils.Actions)
this.dialogtitle=data.actionName
}
ngOnInit(): void {
  this.formdata = this.formBuilder.group({
    CommonName:['',[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]]
  
    })
    if(this.dialogtitle=='Edit'){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.country_name]
      
        })

    }
}

onSubmit(item){
  if(this.formdata.invalid){
    return false
  }
  if(this.formdata.controls['CommonName'].value==this.data.tabledatadeatils.country_name && item=='Edit'){
    this.dialogRef.close(false)

  }
  else{
    let sumiteddata={
      action:item,
      itemsumbited:{
          id:this.data.tabledatadeatils.id,
         title:this.formdata.controls['CommonName'].value,
    
      }
    }
    this.dialogRef.close(sumiteddata)

  }

}


onNoClick(): void {
  this.dialogRef.close(false);
}
}
