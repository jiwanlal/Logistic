import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { AwbService } from '../../awb.service';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import 'moment-timezone';


@Component({
  selector: 'app-add-awb-sale',
  templateUrl: './add-awb-sale.component.html',
  styleUrls: ['./add-awb-sale.component.sass'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
        provide: MAT_DATE_FORMATS,
        useValue: {
            parse: {
                dateInput: 'LL',
            },
            display: {
                dateInput: 'DD/MM/YYYY',
                monthYearLabel: 'MMM YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'MMMM YYYY',
            },
        },
    },
]

})
export class AddAwbSaleComponent {
  dialogtitle = "Add AWB Sales"
  filteredAwbTypes: Observable<string[]>;
  filteredOffices: Observable<string[]>;
  awbTypes:any[]=[]
  offices:any[]=[]

  formdata =new FormGroup(
    {
      awbtype: new FormControl(null,[Validators.required]),
      office: new FormControl(null,[Validators.required]),
      rate: new FormControl(null,[Validators.required]),
      validtill: new FormControl(null,[Validators.required]),
    }
  )

  constructor(public dialogRef: MatDialogRef<AddAwbSaleComponent>,@Inject(MAT_DIALOG_DATA) public data,private awbService :AwbService){
    
    if(data){
      console.log(this.data)
      this.dialogtitle = "Edit AWB Sales";
     
    }
  }

  ngOnInit() {
    this.getFillValues(() => {
        this.setFilters();

        // Convert API date format to Angular Material DatePicker format
        if (this.data) {
          this.data.ValidTillDate = moment(this.data.ValidTillDate, 'DD/MM/YYYY').tz('Asia/Kolkata').toDate();
            this.setData(this.data);
        }
    });
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
  }

  private setData(data) {
    this.formdata.controls.awbtype.setValue(data.AwbId);
    this.formdata.controls.office.setValue(data.OfficeId);
    this.formdata.controls.rate.setValue(data.SalesRate);
    this.formdata.controls.validtill.setValue(moment(data.ValidTillDate).tz('Asia/Kolkata'));
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

  private getFillValues(onDone){

    this.awbService.getAwbSalesFillValues()
    .subscribe(res=>{
      this.offices = res.data.offices;
      this.awbTypes = res.data.awbtypes;
      onDone();
    })

  }

 
 

  close(){

    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formdata.invalid) {
        return;
    }

    const requestData = {
        ...this.formdata.value,
        validtill: moment(this.formdata.value.validtill).tz('Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss'),
    };

    this.awbService.createEditAwbSales(requestData, this.data?.id)
    .subscribe(res => {
        if (res.success) {
            this.dialogRef.close(true);
        }
    });
}

}

