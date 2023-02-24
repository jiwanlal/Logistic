import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocationdeleteComponent } from '../dialogs/locationdelete/locationdelete.component';
import { LocationdialogComponent } from '../dialogs/locationdialog/locationdialog.component';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-lactiontable',
  templateUrl: './lactiontable.component.html',
  styleUrls: ['./lactiontable.component.sass']
})
export class LactiontableComponent implements OnInit, AfterViewInit
 {
  @Input() tabledata:any
  @Input() tableheader:any
  @Input()Titlename:string
  @Input()pagename:string
  @Input()selectboxdata:any
  @Input()Joinwith:string
 
  @Output() dataChange = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  objectKeys = Object.keys;
  
  public keyword:string
  public datasource
  public dropdownlist
 
  constructor(public dialog: MatDialog,public contrylistservice:LocationService){ }
 
  ngOnInit(): void {
 
    this.datasource = new MatTableDataSource(this.tabledata);
    setTimeout(() => {
      this.pagename=this.pagename
      console.log(this.pagename)
      this.dropdownlist=this.selectboxdata
      console.log(this.dropdownlist,this.selectboxdata)
    })
   
   // console.log( Object.keys(this.tabledata))
  
    // if(this.pagename=='zone')
    // {
  
    //}
   // this.datasource=this.tabledata
   // this.datasource.paginator = this.paginator;
  
  
  console.log(this.tabledata,this.tableheader)
  }
  ngAfterViewInit() {
    this.datasource = new MatTableDataSource(this.tabledata);
    this.datasource.paginator = this.paginator;
  }
  isArray(obj : any ) {
    
    //console.log(obj)
   
    return Array.isArray(obj)
  }


  

    public  Opendailogbox(actionName,popupForm) {
       actionName =   this.isArray(actionName)?actionName[0]: actionName;

      const dialogRef=this.dialog.open(LocationdialogComponent, {
       data:{
          actionName:popupForm,
          tabledatadeatils:actionName,
          list:actionName.popupForm!='countryDailog'?this.selectboxdata:[],
          dropdownname:this.Joinwith
          
        },
        minWidth:'400px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
        if(result.action=='Edit'){
          console.log(result)
          this.dataChange.emit(result);
        }
       
      });
      console.log(actionName,popupForm)
  }

  Ondelete(actionName,popupForm){
    console.log(actionName)
    actionName =   this.isArray(actionName)?actionName[0]: actionName;
  //   if(actionName.popupForm=='countryDailog'){
  //       var item ={
  //         actionName:popupForm,
  //         tabledatadeatils:actionName
          
  //       }
  //   }
  //   if(actionName.popupForm=='zoneDailog'){
  //     var item ={
  //       actionName:popupForm,
  //       tabledatadeatils:actionName
        
  //     }
  // }
    const dialogRef=this.dialog.open(LocationdeleteComponent, {
     
          data: { actionName:popupForm,
            tabledatadeatils:actionName,
            
          },
          minWidth:'400px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          if(result.action=='Delete'){
            console.log(result)
            this.dataChange.emit(result);
           }
         
        });
   

  }



  addcontent(value,item) {
  //  actionName =   this.isArray(actionName)?actionName[0]: actionName;
    const dialogRef=this.dialog.open(LocationdialogComponent, {
          data: {
            actionName:value,
            tabledatadeatils:'',
            list:this.selectboxdata,
            popupForm:item,
            dropdownname:this.Joinwith
            
          },
          minWidth:'400px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          if(result.action=='Add'){
            console.log(result.itemsumbited)
            this.dataChange.emit(result);
          }
         
        });
       
   
  }
  applyFilter(event) {
    console.log(event.target.value)
    const filterValue = event.target.value;
    this.datasource = new MatTableDataSource(this.tabledata);
    this.datasource.filter = filterValue.trim().toLowerCase();
    console.log(this.datasource)
    
    this.datasource.paginator = this.paginator;
    if (this.datasource.paginator) {
      this.datasource.paginator = this.paginator;
      this.datasource.paginator.firstPage();
    }
  }


  
}
