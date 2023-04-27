import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map, combineLatest } from 'rxjs';
import { AwbService } from '../../awb.service';

@Component({
  selector: 'app-add-awb-purchase',
  templateUrl: './add-awb-purchase.component.html',
  styleUrls: ['./add-awb-purchase.component.sass']
})
export class AddAwbPurchaseComponent {

  dialogtitle = "Add AWB Purchase"
  filteredAwbTypes: Observable<string[]>;
  filteredOffices: Observable<string[]>;
  filteredVendors: Observable<string[]>;
  awbTypes:any[]=[]
  offices:any[]=[]
  vendors:any[]=[]

  defaultValues:any;

  formdata =new FormGroup(
    {
      awbtype: new FormControl(null,[Validators.required]),
      office: new FormControl(null,[Validators.required]),
      vendor: new FormControl(null,[Validators.required]),
      vendorrate: new FormControl(null,[Validators.required]),
      purchasedate: new FormControl(new Date(),[Validators.required]),
      quantity: new FormControl(null,[Validators.required]),
      startingno: new FormControl(null,[Validators.required]),
      endno: new FormControl(null,[Validators.required]),
    }
  )

  constructor(public dialogRef: MatDialogRef<AddAwbPurchaseComponent>,@Inject(MAT_DIALOG_DATA) public data,private awbService :AwbService){
    
    if(data){
      console.log(data)
      this.dialogtitle = "Edit AWB Purchase";
     
    }
  }

  ngOnInit() {


    this.getFillValues(()=>{
      this.formdata.controls.office.disable()
      this.formdata.controls.endno.disable()
      this.formdata.controls.office.setValue(this.defaultValues?.office);
      this.setFilters();
      
      if(this.data)
      this.setData(this.data);
    });


   
   
    this.calculateEndNo();
  }


  private setFilters(){
    this.filteredAwbTypes = this.formdata.get('awbtype').valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.awbTypes.filter(option => option?.AwbType?.toLowerCase().includes(value));
      }),
    );

    this.filteredOffices = this.formdata.get('office').valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.offices.filter(option => option?.office?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );

    this.filteredVendors = this.formdata.get('office').valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.vendors.filter(option => option?.office?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );
  }

  private calculateEndNo(){

    combineLatest(
      [this.formdata.controls.startingno.valueChanges,this.formdata.controls.quantity.valueChanges]
    )
    .subscribe(res=>{
      if(res[1]>0){
        this.formdata.controls.endno.setValue(res[0]+(res[1]-1))
      }
    })


  }

  private setData(data){

    this.formdata.controls.awbtype.setValue(data.AwbId);
    this.formdata.controls.office.setValue(data.OfficeId);
    this.formdata.controls.vendorrate.setValue(data.VendorRate);
    this.formdata.controls.vendor.setValue(data.VendorId);
    this.formdata.controls.purchasedate.setValue(data.PurchaseDateTime);
    this.formdata.controls.startingno.setValue(data.StartingNo);
    this.formdata.controls.endno.setValue(data.EndNo);
    this.formdata.controls.quantity.setValue(data.Quantity);
  }

  displayAwbName(data): string {

    if(typeof(data) != 'object'){
      data = this.awbTypes.find(x=>x.id == data)
    }
   
    return data?.AwbType;
  }

  displayOfficeName(data): string {
    if(typeof(data) != 'object'){
      data = this.offices.find(x=>x.officeId == data)
    }
    return data?.office;
  }
  displayVendorName(data): string {
    if(typeof(data) != 'object'){
      data = this.vendors.find(x=>x.officeId == data)
    }
    return data?.office;
  }

  private getFillValues(onDone){

    this.awbService.getAwbPurchaseFillValues()
    .subscribe(res=>{
      this.offices = res.data.offices;
      this.awbTypes = res.data.awbtypes;
      this.vendors = res.data.vendors;
      this.defaultValues = res.data.defaultvalues
      onDone();
    })

  }

 
 

  close(){

    this.dialogRef.close();
  }

  onSubmit(){
    if(this.formdata.invalid){
      return;
    }

    this.awbService.addEditAwbPurchase(this.formdata.getRawValue(),this.data?.id)
    .subscribe(res=>{

      if(res.success)
        {
          this.dialogRef.close(true);
        }
    })


  }
}
