import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarrifaddComponent } from '../dialogs/tarrifadd/tarrifadd.component';
import { TreeTarriffsService } from '../tarriffs.service';
import { LoaderService } from 'src/app/core/service/loader.service';
import { TarrifdeleteComponent } from '../dialogs/tarrifdelete/tarrifdelete.component';

@Component({
  selector: 'app-rate-tarrif',
  templateUrl: './rate-tarrif.component.html',
  styleUrls: ['./rate-tarrif.component.sass']
})
export class RateTarrifComponent implements OnInit{
  public Titlename="Rate Tarrif"
  public pagename="ratTarrifDailog"
  public errormessage

  public AddAction={actionName:'Add',popupForm:this.pagename}
  dataobject: any;
  tableheader: any;
  dataForTable: any;
  public inload=false
  loctarfratedropdown: any;
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  constructor(private snackBar: MatSnackBar,public dialog: MatDialog,public tarrifService:TreeTarriffsService,public LoaderService:LoaderService){}
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
  ngOnInit(): void {
    this.getratetarfAlldata()
    this.getloctarfrate()
  }
  OpenDialog(event){
    var dialogdata:any
    console.log()
    var dialogdata:any
    if(event.popupForm=='Edit'){
      console.log(event,event.actionName.Id)
      // this.getratetarwithId(event.actionName.Id)


      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.Name,
          id:event.actionName.Id,
          location_tarrif:event.actionName.LocationTariffId,
          dailogPage:event.actionName.popupForm,
          loctarfratedropdown:this.loctarfratedropdown

          }
        
      }

    }
    else if(event.popupForm=='Add'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:'',
          location_tarrif:'',
          price:'',
          unit:null,
          weight_to:'',
          weight_from:'',
          id:null,
          dailogPage:this.pagename,
          loctarfratedropdown:this.loctarfratedropdown
          }
        
      }
    }
  
    const dialogRef=this.dialog.open(TarrifaddComponent, {
      data:dialogdata,
       minWidth:'400px'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed',result);
       if(result.action=='Edit'){
         console.log(result)
         this.updateRowData(result)
        
       }
       else if(result.action=='Add'){
         this.addRowData(result)
       }
      
     });
  }
  Ondelete(event){
    const dialogRef=this.dialog.open(TarrifdeleteComponent, {
     
      data: { actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.Name,
          id:event.actionName.Id,
          location_tarrif:event.actionName.LocationTariffId,
          price:event.actionName,
          unit:event.actionName,
          weight_to:event.actionName,
          weight_from:event.actionName,
          dailogPage:event.actionName.popupForm,
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
  getratetarfAlldata(){
    this.inload=false
    // this.LoaderService.Loaderpage.next(true)
    this.tarrifService.getratetarfAlldata().subscribe(res=>{
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
 addRowData(row_obj){
  console.log(row_obj,row_obj.itemsumbited.AddedControls)
  let itemvalue={rt_name:row_obj.itemsumbited.name,lt_id:row_obj.itemsumbited.location_tarrif,charges_detail:row_obj.itemsumbited.AddedControls
    }
  this.tarrifService.ratetarfpost(itemvalue).subscribe(res=>{
    console.log(res)
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "top",
      "right"
    );
     this.getratetarfAlldata()

  })
}
updateRowData(row_obj){
  console.log(row_obj)
  let itemvalue={rt_name:row_obj.itemsumbited.name,lt_id:row_obj.itemsumbited.location_tarrif,charges_detail:row_obj.itemsumbited.AddedControls
    }
  this.tarrifService.customerput(row_obj.id,itemvalue).subscribe(res=>{
    console.log(res)
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "top",
      "right"
    );
     this.getratetarfAlldata()
    //  this.getratetarwithId(row_obj.id)

  })

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
  this.getratetarfAlldata()
})
}
getratetarwithId(row_obj){
  console.log(row_obj)

  this.tarrifService.getratetarwithId(row_obj).subscribe(res=>{
  })
}
getloctarfrate(){
  this.tarrifService.getloctarfrate().subscribe(res=>{
    this.loctarfratedropdown=res.data

})
}
 insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
}
