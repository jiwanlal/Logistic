import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { AwbService } from '../../awb.service';

@Component({
  selector: 'app-add-awb-type',
  templateUrl: './add-awb-type.component.html',
  styleUrls: ['./add-awb-type.component.sass']
})
export class AddAwbTypeComponent {

  dialogtitle = "Add Awb Type"
  filteredPaymentModes: Observable<string[]>;
  paymentModes:any[]=[]
  constructor(public dialogRef: MatDialogRef<AddAwbTypeComponent>,@Inject(MAT_DIALOG_DATA) public data,private awbService :AwbService){
    
   
  }

  ngOnInit(){
    this.fillValues(()=>{

      this.filteredPaymentModes = this.formdata.controls.payment_mode_id.valueChanges.pipe(
        startWith(''),
        map(value => {
          value = typeof (value) == 'string' ? value?.toLowerCase() : ''
          return this.paymentModes.filter(option => option?.PaymentMode?.toLowerCase().includes(value?.toLowerCase()));
        }),
      );

      if(this.data){
        this.dialogtitle = "Edit Awb Type";
        this.setData(this.data);
      }

    });
  }

  displayFunc(list, key, displaykey, value): string {
    if (typeof (value) != 'object') {
      value = list.find(x => x?.[key]?.toString()?.indexOf(value) != -1)
    }
    return value?.[displaykey];
  }

  private fillValues(cb){

    this.awbService.getAwbFillValues()
    .subscribe(res=>{
       this.paymentModes = res?.data?.paymentModes || [];

       setTimeout(() => {
        
        cb()

       }, 20);
    })

  }

  private setData(data){

    this.formdata.controls.awb_type.setValue(data.AwbType);
    this.formdata.controls.awb_prefix.setValue(data.AwbPrefix);
    this.formdata.controls.payment_mode_id.setValue(data.PaymentModeId);
  }

  formdata =new FormGroup(
    {
      awb_type: new FormControl(null,[Validators.required]),
      awb_prefix: new FormControl(null,[Validators.required]),
      payment_mode_id: new FormControl(null,[Validators.required]),
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
    })


  }
}
