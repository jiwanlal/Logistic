import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarrifaddComponent } from '../dialogs/tarrifadd/tarrifadd.component';

@Component({
  selector: 'app-rate-tarrif',
  templateUrl: './rate-tarrif.component.html',
  styleUrls: ['./rate-tarrif.component.sass']
})
export class RateTarrifComponent {
  public Titlename="Rate Tarrif"
  public pagename="ratTarrifDailog"
  public errormessage

  public AddAction={actionName:'Add',popupForm:this.pagename}
  constructor(private snackBar: MatSnackBar,public dialog: MatDialog){}
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
  
    const dialogRef=this.dialog.open(TarrifaddComponent, {
      data:dialogdata,
       minWidth:'400px'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed',result);
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
