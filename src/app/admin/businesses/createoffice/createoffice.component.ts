import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationService } from '../../location/location.service';
import { offficemodal } from '../businesses.modal';
import { BusinessesService } from '../businesses.service';
import { BusinessesdeletedialogComponent } from '../dialogs/businessesdeletedialog/businessesdeletedialog.component';
import { BusinessesdialogComponent } from '../dialogs/businessesdialog/businessesdialog.component';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-createoffice',
  templateUrl: './createoffice.component.html',
  styleUrls: ['./createoffice.component.sass']
})
export class CreateofficeComponent implements OnInit, OnChanges{
  public Titlename="office"
  public pagename="officeDailog"
  public AddAction={actionName:'Add',popupForm:this.pagename}
  
  public postcodedata:[]=[]
 
  public localitydata:[]=[]
  public businessdata:[]=[]
  public branchdata:[]=[]
   public dataobject:any = new offficemodal()
   public inload=false
   public tableheader
   public dataForTable
    constructor(public officeservice:BusinessesService,public placesservice:LocationService ,private snackBar: MatSnackBar,public dialog: MatDialog,public LoaderService:LoaderService){ }
  ngOnInit(): void {
    this.Onofficelist()
    this.onbusinessList()
    
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
          
          "business_type_id":event.actionName.business_type_id,
          "branch_type_id":event.actionName.branch_type_id,
          "office_code": event.actionName.office_code,
          "office_id":event.actionName.office_id,
          "office_name":event.actionName.office_name,
          "gst_name":event.actionName.gst_name,
          "gst_number":event.actionName.gst_number,
          "parent_office_id":event.actionName.parent_office_id,
          "hub_id":event.actionName.hub_id,
          "is_allowed_manifest": event.actionName.is_allowed_manifest,
          "email":event.actionName.email,
          "mobile": event.actionName.mobile,
          "telephone":event.actionName.telephone,
          "post_code_id":event.actionName.post_code_id,
          "city_id":event.actionName.city_id,
          "state_id":event.actionName.state_id,
          "region_id":event.actionName.region_id,
          "zone_id":event.actionName.zone_id,
          "country_id":event.actionName.country_id,
          "locality_id":event.actionName.locality_id,
          "address":event.actionName.address,
          "credit_limit":event.actionName.credit_limit,
          "postcodedata":this.postcodedata,
          "parentdata":this.dataForTable,
          "businessdata":this.businessdata,
          "branchdata":this.branchdata,
            dailogPage:this.pagename
        },
        
        dailogPage:this.pagename
        
      }
    }
    else if(event.popupForm=='Add'){
      dialogdata={
        actionName:event.popupForm,
          tabledatadeatils:{
          
            "business_type_id":null,
            "branch_type_id":null,
            "office_code": "",
            "office_name":'',
            "gst_name":'',
            "gst_number":'',
            "parent_office_id":this.dataForTable>0?this.dataForTable:1,
            "hub_id":'',
            "is_allowed_manifest": true,
            "email":'',
            "mobile": '',
            "telephone":'',
            "post_code_id":null,
            "city_id":'',
            "state_id":'',
            "region_id":'',
            "zone_id":'',
            "country_id":'',
            "locality_id":null,
            "address":'',
            "credit_limit":'',
            "postcodedata":this.postcodedata,
            "parentdata":this.dataForTable,
            "businessdata":this.businessdata,
            "branchdata":this.branchdata,
              dailogPage:this.pagename
          }
        // tabledatadeatils:{
          
        //     "business_type_id":null,
        //     "branch_type_id":null,
        //     "office_code": "",
        //     "office_name":'',
        //     "gst_name":'',
        //     "gst_number":'',
        //     "parent_office_id":null,
        //     "hub_id":null,
        //     "is_allowed_manifest": true,
        //     "email":'',
        //     "mobile": '',
        //     "telephone":'',
        //     "post_code_id":null,
        //     "city_id":null,
        //     "state_id":null,
        //     "region_id":null,
        //     "zone_id":null,
        //     "country_id":null,
        //     "locality_id":null,
        //     "address":'vg',
        //     "credit_limit":'',
        //     "postcodedata":this.postcodedata,
        //     "parentdata":this.dataForTable,
        //     "businessdata":this.businessdata,
        //     "branchdata":this.branchdata,
        //       dailogPage:this.pagename
        //   }
        
      }
    }
  
    const dialogRef=this.dialog.open(BusinessesdialogComponent, {
      data:dialogdata,
       width:'767px'
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
          name:event.actionName.office_name,
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
      "city_id":row_obj.itemsumbited.city,
      "state_id":row_obj.itemsumbited.state,
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
      "city_id":row_obj.itemsumbited.city,
      "state_id":row_obj.itemsumbited.state,
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
    this.LoaderService.Loaderpage.next(true)
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
                this.tableheader.office_name='Office Name'
                this.tableheader.office_code='Office code'
              this.tableheader.office_id='office Id'
                delete this.tableheader.actionIcons
                delete this.tableheader.popupForm
                delete this.tableheader.is_visible
                delete this.tableheader.Id
                delete this.tableheader.business_type_id
                delete this.tableheader.branch_type_id
                delete this.tableheader.gst_name
                delete this.tableheader.gst_number
                delete this.tableheader.parent_office_id
                delete this.tableheader.hub_id
                delete this.tableheader.is_allowed_manifest
                delete this.tableheader.email
                delete this.tableheader.mobile
                delete this.tableheader.telephone
                delete this.tableheader.post_code_id
                delete this.tableheader.city_id
                delete this.tableheader.state_id
                delete this.tableheader.region_id
                delete this.tableheader.zone_id
                delete this.tableheader.country_id
                delete this.tableheader.locality_id
                delete this.tableheader.address
                delete this.tableheader.credit_limit
                delete this.tableheader.status
                delete this.tableheader.is_visible
                delete this.tableheader.created_at
                delete this.tableheader.created_by
                delete this.tableheader.updated_at
                delete this.tableheader.updated_by
                this.dataForTable= this.dataobject.data.values
                console.log(this.dataobject.data.values, this.tableheader)
                
        }
        this.inload=true
        }
        this.LoaderService.Loaderpage.next(false)
    })
  

  
    
  }
  onbusinessList(){
    this.officeservice.getbusinesslist().subscribe(res=>{
      setTimeout(() => {
        this.businessdata=res.data.values
      }, 1000);
      console.log(res)
    })
    this.officeservice.getbranchlist().subscribe(res=>{
      setTimeout(() => {
        this.branchdata=res.data.values
      }, 1000);
      console.log(res)
    })
    this.placesservice.postcodelist().subscribe(res=>{
      setTimeout(() => {
        this.postcodedata=res.data.values
      }, 1000);
      console.log(res)
    })
   } 
     
    insertSpaces(string) {
      string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
      string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      return string;
    }
  }
