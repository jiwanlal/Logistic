import { Component, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddeditComponent } from '../dialogs/addedit/addedit.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { LoaderService } from 'src/app/core/service/loader.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent {

  public Titlename=""
  public pagename="deliveryDailog"
  public AddAction={actionName:'Add',popupForm:this.pagename}
  
  
  //  public dataobject:any = new businessmodal()
   public inload=false
   public tableheader
   public dataForTable
   public errormessage
  dataobject: any;
  deliveryOffice: any;
  deliveryProof: any;
    constructor(private snackBar: MatSnackBar,public dialog: MatDialog,public LoaderService:LoaderService,public TranscationService:TransactionService){ }
  ngOnInit(): void {
   this.getAlldeliverydata()
   this.getdeliveryoffice()
   this.getdeliveryproof() 
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
          reciver_name:event.actionName.ReciverName,
          reciver_phone:event.actionName.ReciverPhone,
          proof_of_delivery:event.actionName.ProofOfDeliveryId,
          dl_delivery_date:event.actionName.DeliveryDate,
          drs_id:event.actionName.drs_id,
          office_id:event.actionName.OfficeId,
          id:event.actionName.Id,
          dailogPage:this.pagename,
          deliveryOffice:this.deliveryOffice,
          deliveryProof:this.deliveryProof,
          InscanId:event.actionName.InscanId
          }
        
      }
    }
    else if(event.popupForm=='Add'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          reciver_name:'',
          reciver_phone:'',
          proof_of_delivery:null,
          dl_delivery_date:'',
          drs_id:null,
          office_id:null,
          id:null,
          InscanId:null,
          dailogPage:this.pagename,
          deliveryOffice:this.deliveryOffice,
          deliveryProof:this.deliveryProof
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
  
    const dialogRef=this.dialog.open(DeleteComponent, {
     
      data: { actionName:event.popupForm,
        tabledatadeatils:{
          reciver_name:event.actionName.ReciverName,
          reciver_phone:event.actionName.ReciverPhone,
          proof_of_delivery:event.actionName.ProofOfDeliveryId,
          dl_delivery_date:event.actionName.DeliveryDate,
          drs_id:event.actionName.drs_id,
          office_id:event.actionName.OfficeId,
          id:event.actionName.Id,
          dailogPage:this.pagename,
          deliveryOffice:this.deliveryOffice,
          deliveryProof:this.deliveryProof
          
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
    let itemvalue={office_id:row_obj.itemsumbited.office_id,drs_id:row_obj.itemsumbited.drs_id,dl_delivery_date:row_obj.itemsumbited.dl_delivery_date,ins_id:row_obj.InscanId,proof_of_delivery:row_obj.itemsumbited.proof_of_delivery,reciver_phone:row_obj.itemsumbited.reciver_phone,reciver_name:row_obj.itemsumbited.reciver_name}
      this.TranscationService.Alldeliverydataput(row_obj.Id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.getAlldeliverydata()
      })
     
    }
  
  addRowData(row_obj){
   
    console.log(row_obj)
    let itemvalue={office_id:row_obj.itemsumbited.office_id,drs_id:row_obj.itemsumbited.drs_id,dl_delivery_date:row_obj.itemsumbited.dl_delivery_date,ins_id:row_obj.InscanId,proof_of_delivery:row_obj.itemsumbited.proof_of_delivery,reciver_phone:row_obj.itemsumbited.reciver_phone,reciver_name:row_obj.itemsumbited.reciver_name}
      this.TranscationService.Alldeliverydatapost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.getAlldeliverydata()
      })
    console.log(this.dataForTable)
   }
  deleteRowData(row_obj){
    this.TranscationService.deliverydatadelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.Id + " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.getAlldeliverydata()
  })
  }
  
  getAlldeliverydata(){
    this.inload=false
    this.LoaderService.Loaderpage.next(true)
    this.TranscationService.getAlldeliverydata().subscribe(res=>{
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
    getdeliveryoffice(){
      this.TranscationService.getdeliveryoffice().subscribe(res=>{
        this.deliveryOffice=res.data
      })
    }
    getdeliveryproof(){
      this.TranscationService.getdeliveryproof().subscribe(res=>{
        this.deliveryProof=res.data
      })
    }
}
