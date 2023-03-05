import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { offficemodal } from '../businesses.modal';
import { BusinessesService } from '../businesses.service';
import { BusinessesdeletedialogComponent } from '../dialogs/businessesdeletedialog/businessesdeletedialog.component';
import { BusinessesdialogComponent } from '../dialogs/businessesdialog/businessesdialog.component';

@Component({
  selector: 'app-createoffice',
  templateUrl: './createoffice.component.html',
  styleUrls: ['./createoffice.component.sass']
})
export class CreateofficeComponent implements OnInit, OnChanges{
  public Titlename="office"
  public pagename="officeDailog"
  public AddAction={actionName:'Add',popupForm:this.pagename}
  
  
   public dataobject:any = new offficemodal()
   public inload=false
   public tableheader
   public dataForTable
    constructor(public officeservice:BusinessesService,private snackBar: MatSnackBar,public dialog: MatDialog){ }
  ngOnInit(): void {
    this.Onofficelist()
    
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
        tabledatadeatils:event.actionName,
        dailogPage:this.pagename
        
      }
    }
    else if(event.popupForm=='Add'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          
            "business_type_id":2,
            "branch_type_id":3,
            "office_code": "BT010",
            "office_name":'',
            "gst_name":'',
            "gst_number":'',
            "parent_office_id":null,
            "hub_id":5,
            "is_allowed_manifest": true,
            "email":'',
            "mobile": '',
            "telephone":'',
            "post_code_id":null,
            "city_id":2,
            "state_id":3,
            "region_id":4,
            "zone_id":5,
            "country_id":6,
            "locality_id":null,
            "address":'vg',
            "credit_limit":'',
      
          dailogPage:this.pagename
          }
        
      }
    }
  
    const dialogRef=this.dialog.open(BusinessesdialogComponent, {
      data:dialogdata,
       minWidth:'767px'
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
          name:event.actionName.office_type,
          id:event.actionName.office_id,
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
    let itemvalue={
      "business_type_id":row_obj.itemsumbited.businesstypeid,
      "branch_type_id":row_obj.itemsumbited.branchtypeid,
      "office_code": "BT010",
      "office_name":row_obj.itemsumbited.officename,
      "gst_name": row_obj.itemsumbited.gstname,
      "gst_number": row_obj.itemsumbited.gstid,
      "parent_office_id":row_obj.itemsumbited.parentoffice,
      "hub_id":row_obj.itemsumbited.hubid,
      "is_allowed_manifest": true,
      "email":row_obj.itemsumbited.email,
      "mobile": row_obj.itemsumbited.mobile,
      "telephone":row_obj.itemsumbited.telephone,
      "post_code_id":row_obj.itemsumbited.postcode,
      "city_id":row_obj.itemsumbited.postcode,
      "state_id":row_obj.itemsumbited.city,
      "region_id":row_obj.itemsumbited.region,
      "zone_id":row_obj.itemsumbited.zone,
      "country_id":row_obj.itemsumbited.country,
      "locality_id": row_obj.itemsumbited.locality,
      "address": row_obj.itemsumbited.address,
      "credit_limit": row_obj.itemsumbited.creditlimit,
  }
      this.officeservice.officeput(row_obj.id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onofficelist()
      })
     
    }
  
  addRowData(row_obj){
   
    console.log(row_obj)
   // let itemvalue={office_type:row_obj.itemsumbited.CommonName,description:row_obj.itemsumbited.description}
    let itemvalue={
      "business_type_id":row_obj.itemsumbited.businesstypeid,
      "branch_type_id":row_obj.itemsumbited.branchtypeid,
      "office_code": "BT010",
      "office_name":row_obj.itemsumbited.officename,
      "gst_name": row_obj.itemsumbited.gstname,
      "gst_number": row_obj.itemsumbited.gstid,
      "parent_office_id":row_obj.itemsumbited.parentoffice,
      "hub_id":row_obj.itemsumbited.hubid,
      "is_allowed_manifest": true,
      "email":row_obj.itemsumbited.email,
      "mobile": row_obj.itemsumbited.mobile,
      "telephone":row_obj.itemsumbited.telephone,
      "post_code_id":row_obj.itemsumbited.postcode,
      "city_id":row_obj.itemsumbited.postcode,
      "state_id":row_obj.itemsumbited.city,
      "region_id":row_obj.itemsumbited.region,
      "zone_id":row_obj.itemsumbited.zone,
      "country_id":row_obj.itemsumbited.country,
      "locality_id": row_obj.itemsumbited.locality,
      "address": row_obj.itemsumbited.address,
      "credit_limit": row_obj.itemsumbited.creditlimit,
  }
      this.officeservice.officepost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onofficelist()
      })
    console.log(this.dataForTable)
   }
  deleteRowData(row_obj){
    console.log(row_obj)
    this.officeservice.officedelete(row_obj.id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.itemsumbited.name + " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onofficelist()
  })
  }
  
  Onofficelist(){
    this.inload=false
    this.officeservice.getofficelist().subscribe(res=>{
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
              this.tableheader.office_type='office Type'
              this.tableheader.office_id='office Id'
                delete this.tableheader.actionIcons
                delete this.tableheader.popupForm
                delete this.tableheader.is_visible
                delete this.tableheader.Id
                this.dataForTable= this.dataobject.data.values
                console.log(this.dataobject.data.values, this.tableheader)
                
        }
        this.inload=true
        }
  
    })
  
  
  
    
  }
     
    insertSpaces(string) {
      string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
      string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      return string;
    }
  }
