import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AwbService } from '../awb.service';
import { AddAwbPurchaseComponent } from '../dialog/add-awb-purchase/add-awb-purchase.component';

@Component({
  selector: 'app-awb-purchase',
  templateUrl: './awb-purchase.component.html',
  styleUrls: ['./awb-purchase.component.sass']
})
export class AwbPurchaseComponent {


  Titlename = 'AWB Purchase';
  keyword;

  dataSource = [];
  tableHeader = [
    { field:'seq',name:'Seq' },
    { field:'id',name:'Purchase Id' },
    { field:'AwbType',name:'Awb Type' },
    { field:'office',name:'Office Name' },
    { field:'vendor',name:'Vendor' },
    { field:'VendorRate',name:'Vendor Rate' },
    { field:'Quantity',name:'Quantity' },
    { field:'StartingNo',name:'Starting No' },
    { field:'EndNo',name:'End No' },
    { field:'PurchaseDate',name:'Purchase Date' },
    { field:'CreatedAt',name:'Created Date' },
    { field:'Actions',name:'Actions' },
  ]
  tableData:any;

  constructor(private dialog: MatDialog,private awbService:AwbService,private awbNotification:NotificationService) { }

  ngOnInit(){
    this.fetchSalesData();
  }

  private fetchSalesData(){

    this.awbService.getAwbPurchase(null)
    .subscribe(res=>{

      this.dataSource = res.data;
      this.filter('');
    })

  }
  deleteRow(rowData) {
    this.awbService.deleteAwbPurchase(rowData.id)
    .subscribe(res=>{
      this.awbNotification.success('AWB Purchase Deleted Successfully.')
      this.fetchSalesData();
    })
  }

  editRow(rowData) {

    const ref = this.dialog.open(AddAwbPurchaseComponent, {
      data: rowData,
      height:'85vh'
    });
    ref.afterClosed().subscribe(isAdded=> {
      if(isAdded){
        this.awbNotification.success('AWB Purchase Edited Successfully.')
        this.fetchSalesData();
      }
    })

  }

  addRow() {

    const ref = this.dialog.open(AddAwbPurchaseComponent,{
      height:'85vh'
    });
    ref.afterClosed().subscribe(isAdded=> {
      if(isAdded){
        this.awbNotification.success('AWB Purchase Added Successfully.')
        this.fetchSalesData();
      }
    })

  }

  filter(value) {
    console.log(value)
    const filterValue = value;
    this.tableData = new MatTableDataSource(this.dataSource);
    this.tableData.filter = filterValue.trim().toLowerCase();
    
  }
}
