import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { custompattern } from '../../../pattern.modal';

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
        CommonName:[this.data.tabledatadeatils.Name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        commonselect:['']
       })
       


    }
    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='zoneDailog' ){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.Name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        commonselect:[this.data.tabledatadeatils.CountryId]
      
        })

    }
    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='regionDailog' ){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.Name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        commonselect:[this.data.tabledatadeatils.ZoneId]
      
        })

    }
    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='stateDailog' ){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.Name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        commonselect:[this.data.tabledatadeatils.RegionId]
      
        })

    }
    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='cityDailog' ){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.Name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        commonselect:[this.data.tabledatadeatils.StateId]
      
        })

    }
    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='postcodeDailog' ){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.Name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        commonselect:[this.data.tabledatadeatils.CityId]
      
        })

    }
    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.popupForm=='localityDailog' ){
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.Name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        commonselect:[this.data.tabledatadeatils.PostCodeId]
      
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
    if(this.data.popupForm=='countryDailog' || this.data.tabledatadeatils.popupForm =='countryDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          Id:this.data.tabledatadeatils.Id,
          title:this.formdata.controls['CommonName'].value.trim(),
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupForm=='zoneDailog' || this.data.tabledatadeatils.popupForm=='zoneDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          Id:this.data.tabledatadeatils.Id,
          country_id:this.formdata.controls['commonselect'].value,
          title:this.formdata.controls['CommonName'].value.trim(),
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupForm=='regionDailog' || this.data.tabledatadeatils.popupForm=='regionDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
         Id:this.data.tabledatadeatils.Id,
          title:this.formdata.controls['CommonName'].value.trim(),
          zone_id:this.formdata.controls['commonselect'].value,
         
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupForm=='stateDailog' || this.data.tabledatadeatils.popupForm=='stateDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          Id:this.data.tabledatadeatils.Id,
          title:this.formdata.controls['CommonName'].value.trim(),
          region_id:this.formdata.controls['commonselect'].value,
         
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupForm=='cityDailog' || this.data.tabledatadeatils.popupForm=='cityDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          Id:this.data.tabledatadeatils.Id,
          title:this.formdata.controls['CommonName'].value.trim(),
          state_id:this.formdata.controls['commonselect'].value,
         
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupForm=='postcodeDailog' || this.data.tabledatadeatils.popupForm=='postcodeDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          Id:this.data.tabledatadeatils.Id,
          title:this.formdata.controls['CommonName'].value.trim(),
          city_id:this.formdata.controls['commonselect'].value,
         
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupForm=='postcodeDailog' || this.data.tabledatadeatils.popupForm=='postcodeDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          Id:this.data.tabledatadeatils.Id,
          title:this.formdata.controls['CommonName'].value.trim(),
          city_id:this.formdata.controls['commonselect'].value,
         
      
        }
      }
      this.dialogRef.close(sumiteddata)

    }
    if(this.data.popupForm=='localityDailog' || this.data.tabledatadeatils.popupForm=='localityDailog'){
      let sumiteddata={
        action:item,
        itemsumbited:{
          Id:this.data.tabledatadeatils.Id,
          title:this.formdata.controls['CommonName'].value.trim(),
          post_code_id:this.formdata.controls['commonselect'].value,
         
      
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
