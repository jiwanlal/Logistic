import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../transaction.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { inscanDetialsModel } from '../../transaction.model';
import { DatePipe } from '@angular/common';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.sass'],
  providers:[DatePipe]
})
export class AddeditComponent implements OnInit {
  myForm:FormGroup
  bugNumberList: any;
  pageEvent: PageEvent;
  pageLength:number;
  pageSize = 10;
  offset = 0;
  limit = 100;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;
  public dataSource:any=[];
  public keyword = ''
  public inscanmodel: inscanDetialsModel[] = [];
  disableFilter=true;
  buttonDisabled:boolean=false

  @ViewChild('picker') picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
    selectedTime: Date;


  displayedColumns: string[] = ['OriginOffice', 'Destination', 'TatalAwb', 'Mode', 'TotalWeight', 'DispatchDate', 'AwbNumber'];
  @ViewChild (MatPaginator, {static: true}) paginator: MatPaginator;
  deliveryBoylist: any;
  Alldata: any;
  deliveryProof: any;
  deliveryOffice: any;
  awbofficeData: any;
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

 constructor(public dialogRef:MatDialogRef<AddeditComponent>,@Inject(MAT_DIALOG_DATA) public data, public fb:FormBuilder,public transactionservice:TransactionService,private datePipe:DatePipe){
  // console.log((this.datePipe.transform(new Date(this.data.tabledatadeatils.receiving_date),'dd/MM/yyyy')))

 }
 drsofdForm =new FormGroup({
  officeName : new FormControl(this.data.tabledatadeatils.officeName),
  delivery_date: new FormControl(this.data.tabledatadeatils.delivery_date),
  deliveryBoy: new FormControl(this.data.tabledatadeatils.deliveryBoy),
  awbNumber: new FormControl(this.data.tabledatadeatils.awbNumber)
 })
 inscalForm =new FormGroup(
  {
    recdate: new FormControl(this.data.tabledatadeatils.receiving_date,[Validators.required]),
    begnumber: new FormControl(this.data.tabledatadeatils.bag_number,[Validators.required]),
    awbnumber: new FormControl(this.data.tabledatadeatils.awb_number,[Validators.required]),
    weight: new FormControl(this.data.tabledatadeatils.weight,[Validators.required]),
    
  }

 
)
deliveryForm =new FormGroup(
  {
    office_id: new FormControl(this.data.tabledatadeatils.office_id,[Validators.required]),
    drs_id: new FormControl(this.data.tabledatadeatils.drs_id,[Validators.required]),
    dl_delivery_date: new FormControl(this.data.tabledatadeatils.dl_delivery_date,[Validators.required]),
    proof_of_delivery: new FormControl(this.data.tabledatadeatils.proof_of_delivery,[Validators.required]),
    reciver_phone: new FormControl(this.data.tabledatadeatils.reciver_phone,[Validators.required]),
    reciver_name: new FormControl(this.data.tabledatadeatils.reciver_name,[Validators.required]),
    
  }

)

ngOnInit() {
  console.log(this.data)
  this.bugNumberList=this.data.tabledatadeatils.bugNumberList
  this.deliveryBoylist=this.data.tabledatadeatils.deliveryBoylist
  this.deliveryProof=this.data.tabledatadeatils.deliveryProof
  this.deliveryOffice=this.data.tabledatadeatils.deliveryOffice
  console.log(this.bugNumberList)
  this.myForm = this.fb.group({
    
  })
  if(this.data.tabledatadeatils.dailogPage=='inscanDailog'){
    this.focusoutChange(this.data.tabledatadeatils.bag_number,'second')
    
  }
  else if(this.data.tabledatadeatils.dailogPage=='drsofdForm'){
    this.awbNumberSearch(this.data.tabledatadeatils.awbNumber)
  }
}
awbNumberSearch(value){
this.transactionservice.searchdrsofd(value).subscribe(res=>{
  console.log(res)
  this.inscanmodel = res.data;
  this.Alldata = res.data
  this.dataSource = new MatTableDataSource<inscanDetialsModel>(this.inscanmodel);
})
}
focusoutChange(value,type){
  console.log(value)
  
  this.transactionservice.awblist(value).subscribe(res=>{
    this.inscanmodel = res.data;
    this.dataSource = new MatTableDataSource<inscanDetialsModel>(this.inscanmodel);
    console.log(this.inscanmodel[0].chargeable_weight)
    type=='First'?this.inscalForm.controls['weight'].setValue(this.inscanmodel[0].chargeable_weight):this.data.tabledatadeatils.weight
    this.dataSource.paginator = this.paginator;
    this.pageLength = res.totalClient;
    this.disableFilter=this.dataSource.filteredData.length?false:true;
    if (this.pageLength) { this.paginator.length = this.pageLength; }
    console.log(res)
  })
}
Searcheddata(id){
  this.getofficeawb(id)
console.log(id)
}
applyFilter(filterValue: string) {
  this.keyword = filterValue
  console.log(filterValue)
  this.dataSource = new MatTableDataSource<inscanDetialsModel>(this.inscanmodel);
  this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('this.dataSource',this.dataSource);
    console.log('datasource', this.dataSource)
    console.log('filterValue',filterValue)
    this.dataSource.paginator = this.paginator;
}
oninscanSubmit(item,id){
  console.log(id)
  if(this.inscalForm.invalid){
    return false
  }
  else{
    this.inscalForm.controls['recdate'].setValue(this.datePipe.transform(this.inscalForm.controls['recdate'].value,'yyyy-MM-dd'))
    console.log(this.inscalForm.value)
    let sumiteddata={
      action:item,
      Id:id,
      itemsumbited:this.inscalForm.value
    }
    console.log(this.inscalForm.value,sumiteddata)
    this.dialogRef.close(sumiteddata)
 
}
}
onSubmitdrsofd(item,id){
  console.log(id)
  if(this.drsofdForm.invalid){
    return false
  }
  else{
    this.drsofdForm.controls['delivery_date'].setValue(this.datePipe.transform(this.drsofdForm.controls['delivery_date'].value,'yyyy-MM-dd'))

    console.log(this.drsofdForm.value)
    this.Alldata.forEach(element => {
     if(element.awb_number==this.drsofdForm.value.awbNumber) {
      this.drsofdForm.controls['awbNumber'].setValue(element.inscan_id)
     }
    })

    
    let sumiteddata={
      action:item,
      Id:id,
      itemsumbited:this.drsofdForm.value
    }
    console.log(this.drsofdForm.value,sumiteddata)
    this.dialogRef.close(sumiteddata)
 
}
}
onSubmitDelivery(item,id,InscanId){
  console.log(id,item,this.deliveryForm)
  // if(this.deliveryForm.invalid){
  //   return false
  // }
  // else{
    this.deliveryForm.controls['dl_delivery_date'].setValue(this.datePipe.transform(this.deliveryForm.controls['dl_delivery_date'].value,'yyyy-MM-dd'))

    console.log(this.deliveryForm.value)
  

    
    let sumiteddata={
      action:item,
      Id:id,
      itemsumbited:this.deliveryForm.value,
      InscanId:InscanId
    }
    console.log(this.deliveryForm.value,sumiteddata)
    this.dialogRef.close(sumiteddata)
 
// }
}
changeEvent(value){
  console.log(value,this.inscanmodel[0].chargeable_weight)

  if(value>this.inscanmodel[0].chargeable_weight){
     this.buttonDisabled=false
   }
    
  else{
     this.buttonDisabled=true
    }
  }
  cellClicked(val){
   this.drsofdForm.controls['awbNumber'].setValue(val)
  console.log(val)
  }
  timeCheck(){

  }
  getofficeawb(id){
  this.transactionservice.getofficeawb(id).subscribe(res=>{
   console.log(res.data)
   this.awbofficeData=res.data
  })
  }
  Searcheddatatab(data){
  console.log(data)
  }
}
