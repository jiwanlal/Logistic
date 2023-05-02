import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AwbService } from '../awb.service';
import { AddAwbSaleComponent } from '../dialog/add-awb-sale/add-awb-sale.component';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-awb-sales',
  templateUrl: './awb-sales.component.html',
  styleUrls: ['./awb-sales.component.sass']
})
export class AwbSalesComponent {

  Titlename = 'AWB Sales';
  keyword;
  public errormessage
  dataSource = [];
  tableHeader = [
    { field:'seq',name:'Seq' },
    { field:'AwbType',name:'Awb Type' },
    { field:'office',name:'Office Name' },
    { field:'SalesRate',name:'Sales Rate' },
    { field:'ValidTill',name:'Valid Till' },
    { field:'CreatedAt',name:'Created Date' },
    { field:'Actions',name:'Actions' },
  ]
  tableData:any;

  constructor(private dialog: MatDialog,private awbService:AwbService,private awbNotification:NotificationService,public loaderservice:LoaderService) { }

  ngOnInit(){
    this.fetchSalesData();
  }

  private fetchSalesData(){
    this.loaderservice.Loaderpage.next(true)
    this.awbService.getAwbSales(null)
    .subscribe(res=>{
      this.errormessage=res['message']
      this.dataSource = res.data;
      this.filter('');
      this.loaderservice.Loaderpage.next(false)
    })

  }
  deleteRow(rowData) {
    this.awbService.deleteAwbSales(rowData.id)
    .subscribe(res=>{
      this.awbNotification.success('AWB Sale Deleted Successfully.')
      this.fetchSalesData();
    })
  }

  editRow(rowData) {

    const ref = this.dialog.open(AddAwbSaleComponent, {
      data: rowData
    });
    ref.afterClosed().subscribe(isAdded=> {
      if(isAdded){

        this.awbNotification.success('AWB Sale Edited Successfully.')
        this.fetchSalesData();
      }
    })

  }

  addRow() {

    const ref = this.dialog.open(AddAwbSaleComponent);
    ref.afterClosed().subscribe(isAdded=> {
      if(isAdded)
      {
        this.awbNotification.success('AWB Sale Added Successfully.')
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
