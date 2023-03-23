import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { custompattern } from 'src/app/admin/pattern.modal';

@Component({
  selector: 'app-usersdialog',
  templateUrl: './usersdialog.component.html',
  styleUrls: ['./usersdialog.component.sass']
})
export class UsersdialogComponent implements OnInit {
  public acceptonly='image/png, image/gif, image/jpeg'
  public formdata:any=FormGroup
  public Onlyalphabets=new custompattern()
  public dialogtitle:string
constructor(public dialogRef: MatDialogRef<UsersdialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder,private snackBar: MatSnackBar,){
console.log(this.data.tabledatadeatils)
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
      this.formdata.get('password').setValidators([Validators.required])
       this.formdata.get('password').updateValueAndValidity(); 

    }
    if(this.data.tabledatadeatils.dailogPage=='statusDailog'){
      this.formdata.get('CommonName').clearValidators()
       this.formdata.get('CommonName').updateValueAndValidity(); 
       
       this.formdata.get('password').setValidators([Validators.required])
       this.formdata.get('password').updateValueAndValidity(); 
 
     }


    
    
}
change(event){
  console.log(event)
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
    let sumiteddata={
      action:item,
      id:id,
      itemsumbited:this.formdata.value
    }
    this.dialogRef.close(sumiteddata)
  
   

  }

}


onNoClick(): void {
  this.dialogRef.close(false);
}
}
