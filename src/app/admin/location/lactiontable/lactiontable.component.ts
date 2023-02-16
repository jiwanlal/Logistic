import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { LocationdeleteComponent } from '../dialogs/locationdelete/locationdelete.component';
import { LocationdialogComponent } from '../dialogs/locationdialog/locationdialog.component';

@Component({
  selector: 'app-lactiontable',
  templateUrl: './lactiontable.component.html',
  styleUrls: ['./lactiontable.component.sass']
})
export class LactiontableComponent implements OnInit
 {
  @Input() tabledata:any
  @Input() tableheader:any
  @Input()Titlename:string
  @Output() dataChange = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  objectKeys = Object.keys;
 
  constructor(public dialog: MatDialog){ }
 
  ngOnInit(): void {
  console.log(this.tabledata,this.tableheader)
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
  }

    public  Opendailogbox(actionName:string,popupFrom) {
      actionName =   this.isArray(actionName)?actionName[0]: actionName;
  const dialogRef=this.dialog.open(LocationdialogComponent, {
        data: {
          actionName:popupFrom,
          tabledatadeatils:actionName
          
        },
        minWidth:'400px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        if(result.action=='Edit'){
          console.log(result.itemsumbited)
          this.dataChange.emit(result);
        }
       
      });
      console.log(actionName,popupFrom)
  }

  Ondelete(actionName:string,popupFrom){
   
    actionName =   this.isArray(actionName)?actionName[0]: actionName;
    const dialogRef=this.dialog.open(LocationdeleteComponent, {
          data: {
            actionName:popupFrom,
            tabledatadeatils:actionName
            
          },
          minWidth:'400px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          if(result.action=='Delete'){
            console.log(result.itemsumbited)
            this.deleteRowData(result.itemsumbited)
  
          }
         
        });
   

  }


  deleteRowData(row_obj){
    this.tabledata = this.tabledata.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
  addNewItem(value: string) {
   
  }
}
