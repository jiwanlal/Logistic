import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TarrifaddComponent } from '../dialogs/tarrifadd/tarrifadd.component';
import { TreeTarriffsService } from '../tarriffs.service';
import { LoaderService } from 'src/app/core/service/loader.service';
import { TarrifdeleteComponent } from '../dialogs/tarrifdelete/tarrifdelete.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.sass']
})
export class ContractComponent implements OnInit{
  public Titlename="Contract Tarrif"
  public pagename="contractTarrifDailog"
  public inload=false
  public tableheader
  public dataForTable
  public errormessage
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  public AddAction={actionName:'Add',popupForm:this.pagename}
  dialogData: any;
  dataobject: any;
  customerslist: any;
  ratetarflist: any;
  constructor(private snackBar: MatSnackBar,public dialog: MatDialog,public tarrifService:TreeTarriffsService,public LoaderService:LoaderService){}
  ngOnInit(): void {
    // this.ShowListtabledata()
    this.getcustomersdata()
    this.getratetarflist()
    this.getcustomerslist()
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
    console.log('dgfdg')
    var dialogdata:any
    if(event.popupForm=='Edit'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.Name,
          Id:event.actionName.Id,
          dailogPage:event.actionName.popupForm,
          rate_tarrif:event.actionName.RateTariffId,
          customer:event.actionName.CustomerId,
          gst:event.actionName.GST,
          fsc:event.actionName.FSC,
          discount:event.actionName.Discount,
          dsc:event.actionName.DSC,
          insurance:event.actionName.Insurance,
          others:event.actionName.Others,
          ratetarftlist:this.ratetarflist.data,
          customerslist:this.customerslist.data,

          }
        
      }
    }
    else if(event.popupForm=='Add'){
      console.log(event.popupForm=='Add')
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:'',
          Id:null,
          rate_tarrif:null,
          customer:null,
          gst:'',
          fsc:'',
          discount:'',
          dsc:'',
          insurance:'',
          others:'',
          dailogPage:this.pagename,
          ratetarftlist:this.ratetarflist.data,
          customerslist:this.customerslist.data
          }
        
      }
    }
  
    const dialogRef=this.dialog.open(TarrifaddComponent, {
      data:dialogdata,
       minWidth:'400px'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed',result);
      //  this.dataForTable=result.itemsumbited
       if(result.action=='Edit'){
         console.log(result)
         this.updateRowData(result)
        
       }
       else if(result.action=='Add'){
        this.addRowData(result)
       }
      
     });
  }
  addRowData(row_obj){
    console.log(row_obj)
    let itemvalue={ct_name:row_obj.itemsumbited.name,rt_id:row_obj.itemsumbited.rate_tarrif,ct_customer:row_obj.itemsumbited.customer,
      ct_insurance:row_obj.itemsumbited.insurance,ct_gst:row_obj.itemsumbited.gst,ct_fsc:row_obj.itemsumbited.fsc,ct_others:row_obj.itemsumbited.others,ct_discount:row_obj.itemsumbited.discount,ct_dsc:row_obj.itemsumbited.dsc
      }
    this.tarrifService.customerpost(itemvalue).subscribe(res=>{
      console.log(res)
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "top",
        "right"
      );
       this.getcustomersdata()
    })
  }
  updateRowData(row_obj){
    console.log(row_obj)
    let itemvalue={ct_name:row_obj.itemsumbited.name,rt_id:row_obj.itemsumbited.rate_tarrif,ct_customer:row_obj.itemsumbited.customer,
      ct_insurance:row_obj.itemsumbited.insurance,ct_gst:row_obj.itemsumbited.gst,ct_fsc:row_obj.itemsumbited.fsc,ct_others:row_obj.itemsumbited.others,ct_discount:row_obj.itemsumbited.discount,ct_dsc:row_obj.itemsumbited.dsc
      }
    this.tarrifService.customerput(row_obj.Id,itemvalue).subscribe(res=>{
      console.log(res)
      this.showNotification(
        "snackbar-success",
        "Edit Record Successfully...!!!",
        "top",
        "right"
      );
       this.getcustomersdata()
    })

  }
  Ondelete(event){
    const dialogRef=this.dialog.open(TarrifdeleteComponent, {
     
      data: { actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.Name,
          Id:event.actionName.Id,
          dailogPage:event.actionName.popupForm,
          rate_tarrif:event.actionName.RateTariffId,
          customer:event.actionName.CustomerId,
          gst:event.actionName.GST,
          fsc:event.actionName.FSC,
          discount:event.actionName.Discount,
          dsc:event.actionName.DSC,
          insurance:event.actionName.Insurance,
          others:event.actionName.Others,
          ratetarftlist:this.ratetarflist.data,
          // customerslist:this.customerslist.data,
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
  deleteRowData(row_obj){
    console.log(row_obj)
    this.tarrifService.customerdelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.itemsumbited.customername + " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.getcustomersdata()
  })
  }
  getcustomersdata(){
    this.inload=false
    this.LoaderService.Loaderpage.next(true)
    this.tarrifService.getcustomersdata().subscribe(res=>{
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
               delete this.tableheader.CustomerId
               delete this.tableheader.RateTariffId
               delete this.tableheader.CreatedBy
               delete this.tableheader.CreatedAt
               
               this.dataForTable= this.dataobject.data.values
               console.log(this.dataobject.data.values, this.tableheader)
               
       }
       this.inload=true
       }
        this.LoaderService.Loaderpage.next(false)
    })
 
 
   
   
 }
 getcustomerslist(){
  this.tarrifService.getcustomerslist().subscribe(res=>{
    this.customerslist=res
  })
 }
 

 insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
getratetarflist(){
  this.tarrifService.getratetarflist().subscribe(res=>{
  this.ratetarflist=res
  })
 }
 
}
