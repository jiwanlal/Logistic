import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { custompattern } from 'src/app/admin/pattern.modal';

import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  
} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";
export const MY_FORMATS = {
  parse: {
    dateInput: "DD-MM-YYYY"
  },
  
  display: {
    dateInput: "DD-MM-YYYY",
    monthYearLabel: "DD-MM-YYYY",
    dateA11yLabel: "DD-MM-YYYY",
    monthYearA11yLabel: "DD-MM-YYYY"
   
  }
};


@Component({
  selector: 'app-usersdialog',
  templateUrl: './usersdialog.component.html',
  styleUrls: ['./usersdialog.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})

export class UsersdialogComponent implements OnInit {
  public acceptonly='image/png, image/gif, image/jpeg'
  public formdata:any=FormGroup
  public Onlyalphabets=new custompattern()
  public dialogtitle:string
  public file:File

constructor(public dialogRef: MatDialogRef<UsersdialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder,private snackBar: MatSnackBar, public datepipe:DatePipe){
console.log(this.data)
this.dialogtitle=data.actionName
}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
ngOnInit(): void {

  this.formdata = this.formBuilder.group({
    CommonName:[this.data.tabledatadeatils.name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
    lastName:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.lastname:''],
    email:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.email:''],
    mobile:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.mobile:''],
    company:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.companyname:''],
    office:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.officename:''],
    role:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.rolename:''],
    uploadFile:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.profile_picture:''],
    password:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.password:''],
    gender:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.gender:''],
    dob:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.dob:''],
    
    
    description:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.address:'']
  
    })
    if(this.data.tabledatadeatils.dailogPage=='userDailog'){
     this.formdata.get('company').clearValidators([Validators.required])
      this.formdata.get('company').updateValueAndValidity(); 
      this.formdata.get('gender').clearValidators([Validators.required])
      this.formdata.get('gender').updateValueAndValidity(); 
      this.formdata.get('role').setValidators([Validators.required])
      this.formdata.get('role').updateValueAndValidity(); 
      this.formdata.get('company').setValidators([Validators.required])
      this.formdata.get('company').updateValueAndValidity(); 
      this.formdata.get('email').setValidators([Validators.required,Validators.email])
      this.formdata.get('email').updateValueAndValidity(); 
      this.formdata.get('mobile').setValidators([Validators.required])
      this.formdata.get('mobile').updateValueAndValidity(); 
      

    }
    if(this.data.popupForm=='Edit'){
      this.formdata.get('password').setValidators([Validators.required])
       this.formdata.get('password').updateValueAndValidity(); 
    }
    if(this.data.tabledatadeatils.dailogPage=='statusDailog'){
      this.formdata.get('CommonName').clearValidators()
       this.formdata.get('CommonName').updateValueAndValidity(); 
       
       this.formdata.get('password').setValidators([Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)])
       this.formdata.get('password').updateValueAndValidity(); 
 
     }


    
    
}
onDate(event){
// this.formdata.controls['dob'].setValue(event)
 
}
change(event){
  console.log(event)
 this.file=event
  console.log(this.file)
  if(event.size>50000){
  this.formdata.controls['uploadFile'].setValue('');
  //this.formdata.get('uploadFile').setValidators([Validators.required])
  //this.formdata.get('uploadFile').updateValueAndValidity(); 
  
 
  this.showNotification(
    "snackbar-danger","Max File size Limit 50Kb",
    "top",
    "right"
  );
  
}
else{
  this.formdata.get('uploadFile').clearValidators();
  this.formdata.get('uploadFile').updateValueAndValidity(); 
}

}
onSubmit(item,id:number){
  console.log(this.formdata.value,id
    )
  if(this.formdata.invalid){
    return false
  }
  // if(this.formdata.controls['CommonName'].value==this.data.tabledatadeatils.country_name && item=='Edit'){
  //   this.dialogRef.close(false)

  // }
  else{
  //  this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.formdata.controls['dob'].setValue(this.datepipe.transform(this.formdata.controls['dob'].value,'dd/MM/yyyy'))
    console.log(this.formdata.controls['dob'].value)
    let sumiteddata={
      file:this.file,
      action:item,
      id:id,
      status:this.data.tabledatadeatils.status,
      statusoption:this.data.tabledatadeatils.statusoption,
      itemsumbited:this.formdata.value
    }
    this.dialogRef.close(sumiteddata)
  
   

  }

}


onNoClick(): void {
  this.dialogRef.close(false);
}
}
