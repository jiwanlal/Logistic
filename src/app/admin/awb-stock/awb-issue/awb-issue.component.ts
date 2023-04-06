import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AwbService } from '../awb.service';
import { AddAwbIssueComponent } from '../dialog/add-awb-issue/add-awb-issue.component';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-awb-issue',
  templateUrl: './awb-issue.component.html',
  styleUrls: ['./awb-issue.component.sass']
})
export class AwbIssueComponent {
  Titlename = 'AWB Issue';
  keyword;

  dataSource = [];
  tableHeader = [
    { field:'seq',name:'Seq' },
    { field:'AwbType',name:'Awb Type' },
    { field:'Office',name:'Office Name' },
    { field:'ReceiverOffice',name:'Receiver Office' },
    { field:'Rate',name:'Rate' },
    { field:'Quantity',name:'Quantity' },
    { field:'StartingNo',name:'Starting No' },
    { field:'EndNo',name:'End No' },
    { field:'AmountReceived',name:'Amount Received' },
    { field:'IssueDate',name:'Issue Date' },
    { field:'CreatedAt',name:'Created Date' },
    { field:'Actions',name:'Actions' },
  ]
  tableData:any;

  constructor(private dialog: MatDialog,private awbService:AwbService,public awbNotification:NotificationService,public loaderservice:LoaderService) { }

  ngOnInit(){
    this.fetchSalesData();
  }

  private fetchSalesData(){
    this.loaderservice.Loaderpage.next(true)
    this.awbService.getAwbIssue(null)
    .subscribe(res=>{

      this.dataSource = res.data;
      this.filter('');
      this.loaderservice.Loaderpage.next(false)
    })

  }
  deleteRow(rowData) {
    this.awbService.deleteAwbIssue(rowData.id)
    .subscribe(res=>{
      this.awbNotification.success('Issue Deleted Successfully.')
        this.fetchSalesData();
    })
  }

  editRow(rowData) {

    const ref = this.dialog.open(AddAwbIssueComponent, {
      data: rowData,
      height:'85vh',
      width:'40%'
    });
    ref.afterClosed().subscribe(isAdded=> {
      if(isAdded){
        this.awbNotification.success('Issue Edited Successfully.')
        this.fetchSalesData();
      }
      
    })

  }

  addRow() {

    const ref = this.dialog.open(AddAwbIssueComponent,{
      height:'85vh',
      width:'40%'
    });
    ref.afterClosed().subscribe(isAdded=> {
      if(isAdded){
        this.awbNotification.success('Issue Added Successfully.')
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
