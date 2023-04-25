import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map, combineLatest, tap, of } from 'rxjs';
import { AwbService } from '../../awb.service';

@Component({
  selector: 'app-add-awb-issue',
  templateUrl: './add-awb-issue.component.html',
  styleUrls: ['./add-awb-issue.component.sass']
})
export class AddAwbIssueComponent {

  
  dialogtitle = "Add AWB Issue"
  filteredAwbTypes: Observable<string[]>;
  filteredOffices: Observable<string[]>;
  filteredReciversOffice: Observable<string[]>;
  filteredstartingNos: Observable<string[]>;
  awbTypes:any[]=[]
  offices:any[]=[]
  startingNos:any[]=[]
  startingNosForAwbType:any[]=[];
  minrate =0;
  purchaseId = null;
  minendNo = 9999999;

  defaultValues:any;

  formdata =new FormGroup(
    {
      awbtype: new FormControl(null,[Validators.required]),
      office: new FormControl(null,[Validators.required]),
      issuedate: new FormControl(new Date(),[Validators.required]),
      receiveroffice: new FormControl(null,[Validators.required]),
      rate: new FormControl(null,[Validators.required]),
      quantity: new FormControl(null,[Validators.required]),
      startingno: new FormControl(null,[Validators.required]),
      endno: new FormControl(null,[Validators.required]),
      amountreceived: new FormControl(null,[Validators.required]),
    }
  )

  constructor(public dialogRef: MatDialogRef<AddAwbIssueComponent>,@Inject(MAT_DIALOG_DATA) public data,private awbService :AwbService){
    
    if(data){
      console.log(data)
      this.dialogtitle = "Edit AWB Issue";
     
    }
  }

  ngOnInit() {

    this.formdata.valueChanges.subscribe(v=>{
      console.log(this.formdata)
    })


    this.getFillValues(()=>{
      this.formdata.controls.office.setValue(this.defaultValues?.office);
      if(!this.defaultValues?.isHeadOffice){
        this.formdata.controls.office.disable();
      }
      // this.formdata.controls.endno.disable();
      this.formdata.controls.amountreceived.disable();
      
      this.setFilters();
      if(this.data)
      this.setData(this.data);
    });

    this.formdata.controls.awbtype.valueChanges.subscribe(value=> this.partitionStartingNo(value))
   
    this.calculateEndNo();
    this.calculateAmounReceived();
    
  }

  setMinRate(options){
   // console.log(options);
    this.minrate = options.VendorRate;
    this.purchaseId = options.PurchaseId;
    this.minendNo = options.EndNo;
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
    this.filteredReciversOffice = this.formdata.get('receiveroffice').valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :''
        return this.offices.filter(option => option?.office?.toLowerCase().includes(value?.toLowerCase()));
      }),
    );

    this.formdata.controls.quantity.valueChanges.subscribe(res=>{
      this.formdata.controls.endno.updateValueAndValidity();
      this.formdata.controls.endno.markAsTouched();
    })

    
  }
  private partitionStartingNo(selectedAwbId){
    this.formdata.controls.startingno.reset();
    this.startingNosForAwbType = this.startingNos.filter(x=>x.AwbId == selectedAwbId);
    //this.filteredstartingNos = of([... this.startingNosForAwbType])
    console.log(this.startingNosForAwbType)

    this.filteredstartingNos = this.formdata.get('startingno').valueChanges.pipe(
      startWith(''),
      map(value => {
        value = typeof(value) == 'string'? value?.toLowerCase() :value;
        return this.startingNosForAwbType.filter(option => option?.StartingNo?.toString().toLowerCase().includes(value?.toString().toLowerCase()));
      }),
    );
  }


  private calculateEndNo(){

    combineLatest(
      [this.formdata.controls.startingno.valueChanges,this.formdata.controls.quantity.valueChanges]
    )
    .subscribe(res=>{
      this.formdata.controls.endno.setValue(res[0]+res[1])
    })


  }

  private calculateAmounReceived(){

    combineLatest(
      [this.formdata.controls.rate.valueChanges,this.formdata.controls.quantity.valueChanges]
    )
    .subscribe(res=>{
      this.formdata.controls.amountreceived.setValue(res[0]*res[1])
    })


  }

  private setData(data){

    let issueDate = data.IssueDate?.split('/')
    this.formdata.controls.awbtype.setValue(data.AwbId);
    this.formdata.controls.office.setValue(data.OfficeId);
    this.formdata.controls.rate.setValue(data.Rate);
    this.formdata.controls.receiveroffice.setValue(data.ReceiverOfficeId);
    this.formdata.controls.issuedate.setValue(new Date(`${issueDate[1]}/${issueDate[0]}/${issueDate[2]}`));
    this.formdata.controls.startingno.setValue(data.StartingNo);
    this.formdata.controls.endno.setValue(data.EndNo);
    this.formdata.controls.quantity.setValue(data.Quantity);
    this.formdata.controls.amountreceived.setValue(data.AmountReceived);

    this.setMinRate({VendorRate:data.MinRate,PurchaseId:data.PurchaseId,EndNo:data.EndNo})
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
  displayStartingNo(data): string {
    if(typeof(data) != 'object'){
      data = this.startingNos.find(x=>x.PurchaseId == data.PurchaseId)
    }
    return data?.StartingNo;
  }

  private getFillValues(onDone){

    this.awbService.getAwbissueFillValues()
    .subscribe(res=>{
      this.offices = res?.data?.offices;
      this.awbTypes = res?.data?.awbtypes;
      this.startingNos = res?.data?.startingNos;
      this.defaultValues = res?.data?.defaultvalues
     
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

    let val:any = this.formdata.getRawValue();
    val.purchaseid = this.purchaseId
    this.awbService.addEditAwbIssue(val,this.data?.id)
    .subscribe(res=>{

      if(res.success)
        {
          this.dialogRef.close(true);
        }
    })


  }
}
