import { Component, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddeditComponent } from '../dialogs/addedit/addedit.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { LoaderService } from 'src/app/core/service/loader.service';
import { TransactionService } from '../transaction.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-drsofd',
  templateUrl: './drsofd.component.html',
  styleUrls: ['./drsofd.component.sass']
})
export class DrsofdComponent {
  public Titlename=""
  public pagename="drsofdDailog"
  public AddAction={actionName:'Add',popupForm:this.pagename}
  
  
  //  public dataobject:any = new businessmodal()
   public inload=false
   public tableheader
   public dataForTable
   public errormessage
  dataobject: any;
  deliveryBoylist: any;
    constructor(private snackBar: MatSnackBar,public dialog: MatDialog,public LoaderService:LoaderService,public TransactionService: TransactionService, private authService: AuthService,){ }
  ngOnInit(): void {
   this.getAlldrsdataist()
   this.getdeliveryboyslist()
   console.log('<====>',this.authService.currentUserValue.brandname)
    
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
    console.log(event)
    var dialogdata:any
    if(event.popupForm=='Edit'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          officeName:this.authService.currentUserValue.brandname,
          delivery_date:event.actionName.DeliveryDate,
          deliveryBoy:event.actionName.DeliveryBoyId,
          awbNumber:event.actionName.AwbNumber,
          dailogPage:this.pagename,
          id:event.actionName.Id,
          deliveryBoylist:this.deliveryBoylist,


          }
        
      }
    }
    else if(event.popupForm=='Add'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          officeName:this.authService.currentUserValue.brandname,
          delivery_date:'',
          deliveryBoy:null,
          awbNumber:'',
          dailogPage:this.pagename,
          deliveryBoylist:this.deliveryBoylist,
          id:null
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
          officeName:this.authService.currentUserValue.brandname,
          delivery_date:event.actionName.DeliveryDate,
          deliveryBoy:event.actionName.DeliveryBoyId,
          awbNumber:event.actionName.AwbNumber,
          dailogPage:this.pagename,
          id:event.actionName.Id,
          deliveryBoylist:this.deliveryBoylist,
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
    let itemvalue={drs_delivery_date:row_obj.itemsumbited.delivery_date,drs_inscan_id:row_obj.itemsumbited.awbNumber,delivery_boy_id:row_obj.itemsumbited.deliveryBoy}
      this.TransactionService.drsofdput(row_obj.Id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.getAlldrsdataist()
      })
     
    }
  
  addRowData(row_obj){
   
    console.log(row_obj)
    let itemvalue={drs_delivery_date:row_obj.itemsumbited.delivery_date,drs_inscan_id:row_obj.itemsumbited.awbNumber,delivery_boy_id:row_obj.itemsumbited.deliveryBoy}
      this.TransactionService.drsofdpost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.getAlldrsdataist()
      })
    console.log(this.dataForTable)
   }
  deleteRowData(row_obj){
    this.TransactionService.drsofddelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.Id + " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.getAlldrsdataist()
  })
  }
  
  getAlldrsdataist(){
    this.inload=false
    this.LoaderService.Loaderpage.next(true)
    this.TransactionService.getAlldrsdata().subscribe(res=>{
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
  getdeliveryboyslist(){
    this.TransactionService.getdeliveryboyslist().subscribe(res=>{
      this.deliveryBoylist=res.data
      console.log(res)
    })
  }
    insertSpaces(string) {
      string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
      string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      return string;
    }
}
