import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { custompattern } from 'src/app/admin/pattern.modal';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports


import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  
} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";
import * as moment from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY'
},
display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'DD-MM-YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'DD-MM-YYYY'
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
  public datemodel

constructor(public dialogRef: MatDialogRef<UsersdialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder,private snackBar: MatSnackBar, public datepipe:DatePipe,private dateAdapter: DateAdapter<Date>){
console.log(this.data)
this.dialogtitle=data.actionName
//this.dateAdapter.setLocale('DD/'); //dd/MM/yyyy

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
 // this.datemodel=this.datepipe.transform(this.data.tabledatadeatils.dob,'full')
 //console.log(this.data.tabledatadeatils.dob,new Date(this.data.tabledatadeatils.dob))
  this.formdata = this.formBuilder.group({
    CommonName:[this.data.tabledatadeatils.name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
    lastName:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.lastname:''],
    email:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.email:''],
    mobile:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.mobile:''],
    company:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.companyname:''],
    office:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.officename:''],
    role:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.rolename:''],
    gender:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.gender:''],
    //dob:new FormControl(new Date(this.data.tabledatadeatils.dob)),
    dob:[this.data.tabledatadeatils.dailogPage=='userDailog'?new Date(this.data.tabledatadeatils.dob):''],
    
    
    description:[this.data.tabledatadeatils.dailogPage=='userDailog'?this.data.tabledatadeatils.address:'']
  
    })
    if(this.data.tabledatadeatils.dailogPage=='userDailog'){
    //  this.datemodel=this.data.tabledatadeatils.dob
     this.formdata.get('company').clearValidators([Validators.required])
      this.formdata.get('company').updateValueAndValidity(); 
      this.formdata.get('gender').clearValidators([Validators.required])
      this.formdata.get('gender').updateValueAndValidity(); 
      this.formdata.get('role').setValidators([Validators.required])
      this.formdata.get('role').updateValueAndValidity(); 
      this.formdata.get('dob').clearValidators([Validators.required])
      this.formdata.get('dob').updateValueAndValidity(); 
      this.formdata.get('email').setValidators([Validators.required,Validators.email])
      this.formdata.get('email').updateValueAndValidity(); 
      this.formdata.get('mobile').setValidators([Validators.required])
      this.formdata.get('mobile').updateValueAndValidity(); 
      

    }
   
    if(this.data.tabledatadeatils.dailogPage=='statusDailog'){
      this.formdata.get('CommonName').clearValidators()
       this.formdata.get('CommonName').updateValueAndValidity(); 
      
 
     }


    
    
}
onDate(event){
// this.formdata.controls['dob'].setValue(event)
 
}

onSubmit(item,id:number){
 
  if(this.formdata.invalid){
    return false
  }
  // if(this.formdata.controls['CommonName'].value==this.data.tabledatadeatils.country_name && item=='Edit'){
  //   this.dialogRef.close(false)

  // }
  else{
  //  this.datepipe.transform(this.date, 'yyyy-MM-dd');
   this.formdata.controls['dob'].setValue(this.datepipe.transform(this.formdata.controls['dob'].value,'dd/MM/yyyy'))
    //console.log(this.formdata.controls['dob'].value)
    let sumiteddata={
      
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
