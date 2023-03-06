import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../../core/service/notification.service';
import { AwbService } from '../awb.service';
import { AddAwbTypeComponent } from '../dialog/add-awb-type/add-awb-type.component';

@Component({
  selector: 'app-awb-type',
  templateUrl: './awb-type.component.html',
  styleUrls: ['./awb-type.component.sass']
})
export class AwbTypeComponent {




  Titlename = 'AWB Type';
  keyword;

  dataSource:any[] = [];
  tableHeader = [
    { field:'seq',name:'Seq' },
    { field:'AwbType',name:'Awb Type' },
    { field:'AwbPrefix',name:'Awb Prefix' },
    { field:'CreatedAt',name:'Created Date' },
    { field:'Actions',name:'Actions' },
  ]
  tableData:any;


  constructor(private dialog: MatDialog,private awbService:AwbService,private awbNotification:NotificationService) { }

  ngOnInit(){
    this.fetchData();
  }

  fetchData(){

    this.awbService.getAwbType(null)
    .subscribe(data=>{
      console.log(data);
      this.dataSource = data.data;
      this.filter('')
    })

  }

  deleteRow(rowData) {
    this.awbService.deleteAwbType(rowData.id)
    .subscribe(res=>{
      this.awbNotification.success('AWB Type Deleted Successfully.')
      this.fetchData();
    })
  }

  editRow(rowData) {

    const ref = this.dialog.open(AddAwbTypeComponent, {
      data: rowData
    });

    ref.afterClosed().subscribe(isAdded=>{
      if(isAdded){
        this.awbNotification.success('AWB Type Edited Successfully.')
        this.fetchData();
      }
    })

  }

  addRow() {

    const ref = this.dialog.open(AddAwbTypeComponent);
    ref.afterClosed().subscribe(isAdded=>{
      if(isAdded){
        this.awbNotification.success('AWB Type Added Successfully.')
        this.fetchData();
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
