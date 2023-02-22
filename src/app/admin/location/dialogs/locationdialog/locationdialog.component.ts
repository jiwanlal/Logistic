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
console.log(data)
this.dialogtitle=data.actionName
}
ngOnInit(): void {
  this.formdata = this.formBuilder.group({
    CommonName:['',[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
    commonselect:[null,[Validators.required]]
  
    })
    if(this.data.popupForm=='countryDailog' || this.data.tabledatadeatils.popupForm=='countryDailog'){
      this.formdata.get('commonselect').clearValidators();
      this.formdata.get('commonselect').updateValueAndValidity();
    }

    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='countryDailog' ){
      this.formdata.get('commonselect').clearValidators();
      this.formdata.get('commonselect').updateValueAndValidity();
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.country_name],
        commonselect:['']
       })
       

    }
    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='zoneDailog' ){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.zone_name],
        commonselect:[this.data.tabledatadeatils.country_id]
      
        })

    }
    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='regionDailog' ){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.region_name],
        commonselect:[this.data.tabledatadeatils.zone_id]
      
        })

    }
    
}
change(event){
console.log(event)
}
onSubmit(item){
  if(this.formdata.invalid){
    return false
  }
  // if(this.formdata.controls['CommonName'].value==this.data.tabledatadeatils.country_name && item=='Edit'){
  //   this.dialogRef.close(false)

  // }
  else{
    if(this.data.popupform=='countryDailog' || this.data.tabledatadeatils.popupForm =='countryDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          country_id:this.data.tabledatadeatils.country_id,
          title:this.formdata.controls['CommonName'].value,
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupform=='zoneDailog' || this.data.tabledatadeatils.popupForm=='zoneDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          zone_id:this.data.tabledatadeatils.zone_id,
          country_id:this.formdata.controls['commonselect'].value,
          title:this.formdata.controls['CommonName'].value,
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupform=='regionDailog' || this.data.tabledatadeatils.popupForm=='regionDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          region_id:this.formdata.controls['commonselect'].value,
          title:this.formdata.controls['CommonName'].value,
          zone_id:this.data.tabledatadeatils.zone_id,
         
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
  
  
   

  }

}


onNoClick(): void {
  this.dialogRef.close(false);
}
}
