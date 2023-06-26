import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TarrifaddComponent } from '../dialogs/tarrifadd/tarrifadd.component';
import { LocationService } from '../../location/location.service';
import { TreeTarriffsService } from '../tarriffs.service';
import { locationtarrifmodal } from './location-tarrif.model';
import { TarrifdeleteComponent } from '../dialogs/tarrifdelete/tarrifdelete.component';
import { LoaderService } from 'src/app/core/service/loader.service';


@Component({
  selector: 'app-location-tarrif',
  templateUrl: './location-tarrif.component.html',
  styleUrls: ['./location-tarrif.component.sass']
})
export class LocationTarrifComponent implements OnInit{
  public Titlename="Location Tarrif"
  public pagename="locationTarrifDailog"
  public errormessage
  public tableheader
  public dataForTable
  public inload=false

  public dataobject:any=new locationtarrifmodal()
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  public AddAction={actionName:'Add',popupForm:this.pagename}
  dropdownzonedata: any;
  dropdownregion: any;
  dropdowncoutrydata: any;
  dropdowncitydata: any;
  dropdownlocation: any;
  dropdownstate: any;
  dropdownlicality: any;
  dropdownpostcodedata: any;
  constructor(private snackBar: MatSnackBar,public dialog: MatDialog,public tarrifService:TreeTarriffsService,public LoaderService:LoaderService){}
  ngOnInit(): void {
    // this.locationsdata()
    this.getloctarflist()
    this.loctarFillvalues()

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
      console.log(event,JSON.parse(event.actionName.Route).from_country)
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          "lt_name":event.actionName.Name,
          "Id":event.actionName.Id,
          "from_city":JSON.parse(event.actionName.Route).from_city,
          "from_country":JSON.parse(event.actionName.Route).from_country,
          "from_post_code":JSON.parse(event.actionName.Route).from_post_code,
          "from_zone":JSON.parse(event.actionName.Route).from_zone,
          "from_region":JSON.parse(event.actionName.Route).from_region,
          "from_locality":JSON.parse(event.actionName.Route).from_locality,
          "from_state":JSON.parse(event.actionName.Route).from_state,
          "to_city":JSON.parse(event.actionName.Route).to_city,
          "to_country":JSON.parse(event.actionName.Route).to_country,
          "to_post_code":JSON.parse(event.actionName.Route).to_post_code,
          "to_zone":JSON.parse(event.actionName.Route).to_zone,
          "to_region":JSON.parse(event.actionName.Route).to_region,
          "to_locality":JSON.parse(event.actionName.Route).to_locality,
          "to_state":JSON.parse(event.actionName.Route).to_state,
          "zoneData":this.dropdownzonedata,
          "regionData":this.dropdownregion,
          "cityData":this.dropdowncitydata,
          "stateData": this.dropdownstate,
          "localityData":this.dropdownlicality,
          "countryData":this.dropdowncoutrydata,
          "postcodeData":this.dropdownpostcodedata,
          dailogPage:event.actionName.popupForm
          }
        
      }
    }
    else if(event.popupForm=='Add'){
      console.log(event.popupForm)
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          "lt_name":'',
          "Id":null,
          dailogPage:this.pagename,
          "from_city":'',
          "from_country":'',
          "from_post_code":'',
          "from_zone":'',
          "from_region":'',
          "from_locality":'',
          "from_state":'',
          "to_city":'',
          "to_country":'',
          "to_post_code":'',
          "to_zone":'',
          "to_region":'',
          "to_locality":'',
          "to_state":'',
          "zoneData":this.dropdownzonedata,
          "regionData":this.dropdownregion,
          "cityData":this.dropdowncitydata,
          "stateData": this.dropdownstate,
          "localityData":this.dropdownlicality,
          "countryData":this.dropdowncoutrydata,
          "postcodeData":this.dropdownpostcodedata


          }
        
      }
      console.log(dialogdata)

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
          "lt_name":event.actionName.Name,
          "Id":event.actionName.Id,
          "from_city":event.actionName.from_city,
          "from_country":event.actionName.from_country,
          "from_post_code":event.actionName.from_post_code,
          "from_zone":event.actionName.from_zone,
          "from_region":event.actionName.from_region,
          "from_locality":event.actionName.from_locality,
          "from_state":event.actionName.from_state,
          "to_city":event.actionName.to_city,
          "to_country":event.actionName.to_country,
          "to_post_code":event.actionName.to_post_code,
          "to_zone":event.actionName.to_zone,
          "to_region":event.actionName.to_region,
          "to_locality":event.actionName.to_locality,
          "to_state":event.actionName.to_state,
          dailogPage:event.actionName.popupForm
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
  addRowData(row_obj){
    console.log(row_obj)
    let itemvalue={lt_name:row_obj.itemsumbited.lt_name,from_zone:row_obj.itemsumbited.from_zone,from_state:row_obj.itemsumbited.from_state,
      from_region:row_obj.itemsumbited.from_region,from_locality:row_obj.itemsumbited.from_locality,from_country:row_obj.itemsumbited.from_country,
      from_city:row_obj.itemsumbited.from_city,from_post_code:row_obj.itemsumbited.from_post_code,to_zone:row_obj.itemsumbited.to_zone,to_state:row_obj.itemsumbited.to_state,
      to_region:row_obj.itemsumbited.from_region,to_locality:row_obj.itemsumbited.to_locality,to_country:row_obj.itemsumbited.to_country,
      to_city:row_obj.itemsumbited.to_city,to_post_code:row_obj.itemsumbited.to_post_code}
    this.tarrifService.loctarfpost(itemvalue).subscribe(res=>{
      console.log(res)
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "top",
        "right"
      );
       this.getloctarflist()
    })
  }
  deleteRowData(row_obj){
    console.log(row_obj)
    this.tarrifService.loctardelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.itemsumbited.name + " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.getloctarflist()
  })
  }
  getloctarflist(){
     this.inload=false
    this.LoaderService.Loaderpage.next(true)
    this.tarrifService.getloctarflist().subscribe(res=>{
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
                // this.tableheader.branch_type='Branch Type'
                // this.tableheader.branch_type_id='Branch Id'
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
  
  loctarFillvalues(){
    this.inload=false
    // this.LoaderService.Loaderpage.next(true)
   this.tarrifService.loctarFillvalues().subscribe(res=>{
    this.dropdownpostcodedata=res.data[5]
    this.dropdowncoutrydata=res.data[0]
    this.dropdownzonedata=res.data[1]
    this.dropdownregion=res.data[2]
    this.dropdownstate=res.data[3]
    this.dropdowncitydata=res.data[4]
    this.dropdownlicality=res.data[6]



     console.log(res.data)
    })
   }
  updateRowData(row_obj){
    console.log(row_obj)
    let itemvalue={lt_name:row_obj.itemsumbited.lt_name,from_zone:row_obj.itemsumbited.from_zone,from_state:row_obj.itemsumbited.from_state,
      from_region:row_obj.itemsumbited.from_region,from_locality:row_obj.itemsumbited.from_locality,from_country:row_obj.itemsumbited.from_country,
      from_city:row_obj.itemsumbited.from_city,from_post_code:row_obj.itemsumbited.from_post_code,to_zone:row_obj.itemsumbited.to_zone,to_state:row_obj.itemsumbited.to_state,
      to_region:row_obj.itemsumbited.from_region,to_locality:row_obj.itemsumbited.to_locality,to_country:row_obj.itemsumbited.to_country,
      to_city:row_obj.itemsumbited.to_city,to_post_code:row_obj.itemsumbited.to_post_code}     
       this.tarrifService.loctarput(row_obj.Id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.getloctarflist()
      })
     
    }
  
  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }
}
