import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { businessmodal } from '../businesses.modal';
import { BusinessesService } from '../businesses.service';
import { BusinessesdeletedialogComponent } from '../dialogs/businessesdeletedialog/businessesdeletedialog.component';
import { BusinessesdialogComponent } from '../dialogs/businessesdialog/businessesdialog.component';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-businesses-type',
  templateUrl: './businesses-type.component.html',
  styleUrls: ['./businesses-type.component.sass']
})
export class BusinessesTypeComponent implements OnInit, OnChanges{
  public Titlename="Business"
  public pagename="businessDailog"
  public AddAction={actionName:'Add',popupForm:this.pagename}
  
  
   public dataobject:any = new businessmodal()
   public inload=false
   public tableheader
   public dataForTable
    constructor(public bussinessservice:BusinessesService,private snackBar: MatSnackBar,public dialog: MatDialog, public LoaderService:LoaderService){ }
  ngOnInit(): void {
    this.Onbusinesslist()
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  addItem(event){
    console.log(event)
    if(event.popupForm=='Edit'||event.popupForm=='Add')
    {
      console.log(event) 
      this.OpenDialog(event)
    }
    else{
      this.Ondelete(event)
    }
   }
  
   OpenDialog(event){
    var dialogdata:any
    console.log()
    var dialogdata:any
    if(event.popupForm=='Edit'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.business_type,
          id:event.actionName.business_type_id,
          description:event.actionName.description,
          dailogPage:event.actionName.dailogPage
          }
        
      }
    }
    else if(event.popupForm=='Add'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:'',
          description:'',
          id:null,
          dailogPage:this.pagename
          }
        
      }
    }
  
    const dialogRef=this.dialog.open(BusinessesdialogComponent, {
      data:dialogdata,
       minWidth:'400px'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed',result);
       if(result.action=='Edit'){
         console.log(result)
         this.updateRowData(result)
        // this.dataChange.emit(result);
       }
       else if(result.action=='Add'){
        this.addRowData(result)
       }
      
     });
  }
  Ondelete(event){
  
    const dialogRef=this.dialog.open(BusinessesdeletedialogComponent, {
     
      data: { actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.business_type,
          id:event.actionName.business_type_id,
          description:event.actionName.description,
          dailogPage:event.actionName.dailogPage
          }
        
      },
          minWidth:'400px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          if(result.action=='Delete'){
            console.log(result)
            this.deleteRowData(result);
           }
         
        });
   
  
  }
  updateRowData(row_obj){
    console.log(row_obj)
    let itemvalue={business_type:row_obj.itemsumbited.CommonName,description:row_obj.itemsumbited.description}
      this.bussinessservice.businessput(row_obj.id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onbusinesslist()
      })
     
    }
  
  addRowData(row_obj){
   
    console.log(row_obj)
    let itemvalue={business_type:row_obj.itemsumbited.CommonName,description:row_obj.itemsumbited.description}
      this.bussinessservice.businesspost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onbusinesslist()
      })
    console.log(this.dataForTable)
   }
  deleteRowData(row_obj){
    console.log(row_obj)
    this.bussinessservice.businessdelete(row_obj.id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.itemsumbited.name + " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onbusinesslist()
  })
  }
  
  Onbusinesslist(){
    this.inload=false
    this.LoaderService.Loaderpage.next(true)
    this.bussinessservice.getbusinesslist().subscribe(res=>{
      console.log(res)
      this.dataobject=res
      if(this.dataobject.success==true){
        
   
        let tableColNamesFromAPI=[]
          let tableColNamesWithSpace={}
        if(this.dataobject.data.values){
           
              this.dataobject.data.values.forEach(element => {
                  element.popupForm=this.pagename
                 })
      
                tableColNamesFromAPI=Object.keys(this.dataobject.data.values[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.tableheader=tableColNamesWithSpace
              this.tableheader.business_type='Business Name'
               this.tableheader.business_type_id='Business Id'
                delete this.tableheader.actionIcons
                delete this.tableheader.popupForm
                delete this.tableheader.is_visible
                delete this.tableheader.id
                delete this.tableheader.dailogPage
                delete this.tableheader.isVisible
                delete this.tableheader.updated_at
                delete this.tableheader.updated_by
                delete this.tableheader.created_by
                delete this.tableheader.created_at
                this.dataForTable= this.dataobject.data.values
                console.log(this.dataobject.data.values, this.tableheader)
                
        }
        this.inload=true
        }
        this.LoaderService.Loaderpage.next(false)
    })
  
  
  
    
  }
     
    insertSpaces(string) {
      string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
      string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      return string;
    }
  }

