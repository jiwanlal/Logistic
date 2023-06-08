import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TarrifaddComponent } from '../dialogs/tarrifadd/tarrifadd.component';
import { LocationService } from '../../location/location.service';

@Component({
  selector: 'app-location-tarrif',
  templateUrl: './location-tarrif.component.html',
  styleUrls: ['./location-tarrif.component.sass']
})
export class LocationTarrifComponent implements OnInit{
  public Titlename="Location Tarrif"
  public pagename="locationTarrifDailog"
  public errormessage

  public AddAction={actionName:'Add',popupForm:this.pagename}
  dropdownzonedata: any;
  dropdownregion: any;
  dropdowncoutrydata: any;
  dropdowncitydata: any;
  dropdownlocation: any;
  dropdownstate: any;
  dropdownlicality: any;
  dropdownpostcodedata: any;
  constructor(private snackBar: MatSnackBar,public dialog: MatDialog,public locationservice:LocationService,public cityservice:LocationService){}
  ngOnInit(): void {
    this.locationsdata()

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
          dailogPage:this.pagename,
          from_city:'',
          from_county:'',
          from_pincode:'',
          from_zone:'',
          from_region:'',
          from_locality:'',
          from_state:'',
          zoneData:this.dropdownzonedata,
          regionData:this.dropdownregion,
          cityData:this.dropdowncitydata,
          stateData: this.dropdownstate,
          localityData:this.dropdownlicality,
          countryData:this.dropdowncoutrydata,
          postcodeData:this.dropdownpostcodedata


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
        //  this.updateRowData(result)
        
       }
       else if(result.action=='Add'){
        // this.addRowData(result)
       }
      
     });
  }
  Ondelete(event){

  }

  locationsdata(){
    this.locationservice.postcodelist().subscribe(res=>{
      setTimeout(() => {
        this.dropdownpostcodedata=res.data.values
      }, 1000);
      console.log(res)
    })
    this.locationservice.zonelist().subscribe(res=>{
      setTimeout(() => {
      this.dropdownzonedata=res.data.values
       
       },1000);
    })
    this.locationservice.contrylist().subscribe(res=>{
      this.dropdowncoutrydata=res.data.values
      console.log(res)
    })
    this.locationservice.localitylist().subscribe(res=>{
      this.dropdownlicality=res.data.values
    })
    this.locationservice.statelist().subscribe(res=>{
      this.dropdownstate=res.data.values
    })
    this.locationservice.regionlist().subscribe(res=>{
      this.dropdownregion=res.data.values
      console.log(res)
    })
    this.cityservice.citylist().subscribe(res=>{
      this.dropdowncitydata=res.data.values
      console.log(res)
    })
  }
}
