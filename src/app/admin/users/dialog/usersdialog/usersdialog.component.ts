import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { custompattern } from 'src/app/admin/pattern.modal';

@Component({
  selector: 'app-usersdialog',
  templateUrl: './usersdialog.component.html',
  styleUrls: ['./usersdialog.component.sass']
})
export class UsersdialogComponent implements OnInit {
  public formdata:any=FormGroup
  public Onlyalphabets=new custompattern()
  public dialogtitle:string
constructor(public dialogRef: MatDialogRef<UsersdialogComponent>,@Inject(MAT_DIALOG_DATA) public data,private formBuilder: FormBuilder){
console.log(data)
this.dialogtitle=data.actionName
}

ngOnInit(): void {

  this.formdata = this.formBuilder.group({
    CommonName:['',[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
    lastName:[''],
    company:[''],
    office:[''],
    cityselect:[''],
    address:[''],
    description:['']
  
    })
    if(this.data.tabledatadeatils.dailogPage=='userDailog'){
     this.formdata.get('countryselect').setValidators([Validators.required])
      this.formdata.get('countryselect').updateValueAndValidity(); 
    }

    if(this.dialogtitle=='Edit' && this.data.tabledatadeatils.dailogPage=='roleDailog' ){
      this.formdata.get('countryselect').setValidators([Validators.required])
      this.formdata.get('countryselect').updateValueAndValidity();
      this.formdata = this.formBuilder.group({
        CommonName:[this.data.tabledatadeatils.name,[Validators.required,Validators.pattern(this.Onlyalphabets.onlyalph)]],
        description:[this.data.tabledatadeatils.description]
       })
       


    }
    
    
}
change(event){
console.log(event)
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
