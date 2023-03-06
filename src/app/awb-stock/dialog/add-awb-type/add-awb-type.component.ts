import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AwbService } from '../../awb.service';

@Component({
  selector: 'app-add-awb-type',
  templateUrl: './add-awb-type.component.html',
  styleUrls: ['./add-awb-type.component.sass']
})
export class AddAwbTypeComponent {

  dialogtitle = "Add Awb Type"
  constructor(public dialogRef: MatDialogRef<AddAwbTypeComponent>,@Inject(MAT_DIALOG_DATA) public data,private awbService :AwbService){
    
    console.log(data)
    if(data){
      this.dialogtitle = "Edit Awb Type";
      this.setData(data);
    }
  }

  private setData(data){

    this.formdata.controls.awb_type.setValue(data.AwbType);
    this.formdata.controls.awb_prefix.setValue(data.AwbPrefix);
  }

  formdata =new FormGroup(
    {
      awb_type: new FormControl(null,[Validators.required]),
      awb_prefix: new FormControl(null,[Validators.required]),
    }
  )

  close(){

    this.dialogRef.close();
  }

  onSubmit(){
    if(this.formdata.invalid){
      return;
    }

    let values:any = this.formdata.value;
    this.awbService.addAwbType(values,this.data?.id)
    .subscribe(res=>{
      if(res.success){
        this.dialogRef.close(true);
      }
      console.log(res)
    })


  }
}
