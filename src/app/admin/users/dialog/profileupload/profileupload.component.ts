import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profileupload',
  templateUrl: './profileupload.component.html',
  styleUrls: ['./profileupload.component.sass']
})
export class ProfileuploadComponent implements OnInit{
  public profiledata:any =FormGroup
  public acceptonly='image/png, image/gif, image/jpeg'
  constructor(public dialogRef: MatDialogRef<ProfileuploadComponent>,@Inject(MAT_DIALOG_DATA) public data, public formBuilder:FormBuilder,private snackBar: MatSnackBar,){
 console.log(data)
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
    console.log('profileupload')
    this.profiledata= this.formBuilder.group({
      profile_picture:['',[Validators.required]],
      })
  }
  change(event){
    console.log('profileuploadchange',this.profiledata)
    if(event.size>50000){
      this.profiledata.controls['uploadFile'].setValue('');
    //this.formdata.get('uploadFile').setValidators([Validators.required])
    //this.formdata.get('uploadFile').updateValueAndValidity(); 
    
   
    this.showNotification(
      "snackbar-danger","Max File size Limit 50Kb",
      "top",
      "right"
    );
    
  
}
  

}
onNoClick(){
  this.dialogRef.close(false)
}
onsubmit(){
  console.log(this.profiledata.value)
  if(!this.profiledata.valid){
    return false
  }
  else{
  this.dialogRef.close(this.profiledata.value)
  }
}
}


