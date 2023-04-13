import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommonService } from '../common.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.sass']
})
export class DatatableComponent implements OnInit, AfterViewInit,OnDestroy
{
 @Input() tabledata:any|undefined
 @Input() tableheader:any
@Input()filterData:any
@Input() tablename:string
 @Output() dataChange = new EventEmitter();
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
 @ViewChild("filter", { static: true }) filter: ElementRef;
 objectKeys = Object.keys;
 
 //public datasource=new MatTableDataSource(this.tabledata);

  public subscribe:Subscription
  datasource: any;
 constructor(public dialog: MatDialog,public service:CommonService, public authService: AuthService){ 
  this.datasource=new MatTableDataSource(this.tabledata);
  this.subscribe=this.service.filterservice.subscribe(res=>{
   
    this.applyFilter(res)
  })
 }

 ngOnInit(): void {
  this.datasource = new MatTableDataSource(this.tabledata);


    // setTimeout(() => {
    //   this.applyFilter(this.filterData)
    // })
   

  
  // console.log( Object.keys(this.tabledata))
 
   // if(this.pagename=='zone')
   // {
 
   //}
  // this.datasource=this.tabledata
  // this.datasource.paginator = this.paginator;
 
 
 console.log(this.tabledata,this.tableheader)
 }
 ngAfterViewInit() {
  // if (this.tabledata) { setTimeout(() => { this.paginator.length = this.tabledata.length; }) }
   this.datasource = new MatTableDataSource(this.tabledata);
   this.datasource.paginator = this.paginator;
 }
 isArray(obj : any ) {
   
   //console.log(obj)
  
   return Array.isArray(obj)
 }


 

   public  Opendailogbox(actionName,popupForm) {
    actionName =   this.isArray(actionName)?actionName[0]: actionName;
    let item={actionName,popupForm}
    this.dataChange.emit(item);
      
     console.log(actionName,popupForm)
 }

 Ondelete(actionName,popupForm){
 
  actionName =   this.isArray(actionName)?actionName[0]: actionName;
  let item={actionName,popupForm}
  this.dataChange.emit(item);
 

 }



 addcontent(actionName,popupForm) {
  let additem={actionName,popupForm}
  this.dataChange.emit(additem);
 }
 applyFilter(event) {
  
   console.log(event)
   const filterValue = event;
   this.datasource = new MatTableDataSource(this.tabledata);
   this.datasource.filter = filterValue.trim().toLowerCase();
   console.log(this.datasource)
   
   this.datasource.paginator = this.paginator;
   if (this.datasource.paginator) {
     this.datasource.paginator = this.paginator;
     this.datasource.paginator.firstPage();
   }
  
 }
 activeinactive(event,actionName,status){
let item={event,actionName,status}
  this.dataChange.emit(item);
}
ngOnDestroy(): void {
  this.subscribe.unsubscribe()
}
 
}
