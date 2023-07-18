import { Component, SimpleChanges } from '@angular/core';
import { AddeditComponent } from '../dialogs/addedit/addedit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/core/service/loader.service';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-inscan',
  templateUrl: './inscan.component.html',
  styleUrls: ['./inscan.component.sass']
})
export class InscanComponent {
  public Titlename=""
  public pagename="inscanDailog"
  public AddAction={actionName:'Add',popupForm:this.pagename}
  
  
  //  public dataobject:any = new businessmodal()
   public inload=false
   public tableheader
   public dataForTable
   public errormessage
  AllbugsNumberList: any;
  dataobject: any;
    constructor(private snackBar: MatSnackBar,public dialog: MatDialog,public LoaderService:LoaderService,public transactionService: TransactionService){ }
  ngOnInit(): void {
    this.getAllbugNumber()
    this.getAllinscanData()
    
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
  getAllbugNumber(){
    this.transactionService.getAllbugNumber().subscribe(res=>{
      this.AllbugsNumberList=res.data
    console.log(res)
    })
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
    console.log(event)
    var dialogdata:any
    if(event.popupForm=='Edit'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          receiving_date:event.actionName.ReceivingDate,
          bag_number:event.actionName.BagNumber,
          id:event.actionName.Id,
          awb_number:event.actionName.AwbNumber,
          weight:event.actionName.Weight,
          dailogPage:this.pagename,
          bugNumberList:this.AllbugsNumberList
          }
        
      }
    }
    else if(event.popupForm=='Add'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          receiving_date:null,
          bag_number:null,
          id:null,
          awb_number:null,
          weight:null,
          dailogPage:this.pagename,
          bugNumberList:this.AllbugsNumberList
          }
        
      }
    }
  
    const dialogRef=this.dialog.open(AddeditComponent, {
      data:dialogdata,
      width: '50%',
      height:'100%',
     position: { right: '0',top:'0', bottom:'0'}
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
  console.log(event)
    const dialogRef=this.dialog.open(DeleteComponent, {
     
      data: { actionName:event.popupForm,
        tabledatadeatils:{
          receiving_date:event.actionName.ReceivingDate,
          bag_number:event.actionName.BagNumber,
          id:event.actionName.Id,
          awb_number:event.actionName.AwbNumber,
          weight:event.actionName.Weight,
          dailogPage:this.pagename,
          bugNumberList:this.AllbugsNumberList
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
    let itemvalue={ins_receiving_date:row_obj.itemsumbited.recdate,ins_bag_number:row_obj.itemsumbited.begnumber,ins_awb_number:row_obj.itemsumbited.awbnumber,ins_weight:row_obj.itemsumbited.weight}
      this.transactionService.inscanput(row_obj.Id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.getAllinscanData()
      })
     
    }
  
  addRowData(row_obj){
   
    console.log(row_obj)
    let itemvalue={ins_receiving_date:row_obj.itemsumbited.recdate,ins_awb_number:row_obj.itemsumbited.awbnumber,ins_weight:row_obj.itemsumbited.weight,ins_bag_number:row_obj.itemsumbited.begnumber
     }
      this.transactionService.postAllinscanData(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.getAllinscanData()
      })
    console.log(this.dataForTable)
   }
  deleteRowData(row_obj){
    this.transactionService.inscandelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.Id + " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.getAllinscanData()
  })
  }
  
  getAllinscanData(){
    this.inload=false
    this.LoaderService.Loaderpage.next(true)
    this.transactionService.getAllinscanData().subscribe(res=>{
      console.log(res)
      this.dataobject=res
      this.errormessage=res['message']
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
             
                delete this.tableheader.actionIcons
                delete this.tableheader.popupForm
                delete this.tableheader.isVisible
                delete this.tableheader.id
                delete this.tableheader.dailogPage
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
