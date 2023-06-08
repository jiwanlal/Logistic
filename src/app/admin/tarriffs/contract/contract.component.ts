import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TarrifaddComponent } from '../dialogs/tarrifadd/tarrifadd.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.sass']
})
export class ContractComponent implements OnInit{
  public Titlename="Contract Tarrif"
  public pagename="contractTarrifDailog"
  public inload=false
   public tableheader=['Name','Rate Tarrif','Customer','GST','FSC','Discount','DSC','Insurance','Others']
  public dataForTable
  public errormessage

  public AddAction={actionName:'Add',popupForm:this.pagename}
  dialogData: any;
  constructor(private snackBar: MatSnackBar,public dialog: MatDialog){}
  ngOnInit(): void {
    // this.ShowListtabledata()
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
      // dialogdata={
      //   actionName:event.popupForm,
      //   tabledatadeatils:{
      //     name:event.actionName.business_type,
      //     id:event.actionName.business_type_id,
      //     description:event.actionName.description,
      //     dailogPage:event.actionName.dailogPage
      //     }
        
      // }
    }
    else if(event.popupForm=='Add'){
      console.log(event.popupForm=='Add')
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:'',
          rate_tarrif:'',
          customer:'',
          gst:'',
          fsc:'',
          discount:'',
          dsc:'',
          insurance:'',
          others:'',
          dailogPage:this.pagename
          }
        
      }
    }
  
    const dialogRef=this.dialog.open(TarrifaddComponent, {
      data:dialogdata,
       minWidth:'400px'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed',result);
       this.dataForTable=result.itemsumbited
       if(result.action=='Edit'){
         console.log(result)
        //  this.updateRowData(result)
        
       }
       else if(result.action=='Add'){
        // this.addRowData(result)
       }
      
     });
  }
  Ondelete(event){

  }
 
}
