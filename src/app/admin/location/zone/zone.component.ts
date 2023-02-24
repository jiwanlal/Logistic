import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { countrydatamodal, zonedatamodal } from '../country/location.modal';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.sass']
})
export class ZoneComponent implements OnInit, OnChanges {
  public Titlename="Zone"
  public selectoption="Country"
  @ViewChild(LactiontableComponent) child
   public coutrydataobject:any = new zonedatamodal()
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public pagename='zoneDailog'
    constructor(public zonelistservice:LocationService,private snackBar: MatSnackBar){ }
  ngOnInit(): void {
    this.Onzonelist()
  }

  ngOnChanges(changes: SimpleChanges): void {
   
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
  console.log(event.itemsumbited
    )
  if(event.action=='Edit'){
    console.log(event)
    this.updateRowData(event.itemsumbited)
  }
  if(event.action=='Add'){
  this.addRowData(event.itemsumbited)
  }
  if(event.action=='Delete'){
    console.log(event)
    this.deleteRowData(event.itemsumbited)
    }
  
  }
  
  updateRowData(row_obj){
  let itemvalue={
                  zone_name:row_obj.title,
                  country_id:row_obj.country_id
                  }
      this.zonelistservice.zoneput(row_obj.Id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onzonelist()
      })
     
    }
  
  
  addRowData(row_obj){
  let itemvalue={
      zone_name:row_obj.title,
      country_id:row_obj.country_id
    }
    this.zonelistservice.zonepost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onzonelist()
      })
    console.log(this.dataForTable)
    
  }
  deleteRowData(row_obj){
  this.zonelistservice.zonedelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
          row_obj.Name+ " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onzonelist()
  })
  }
  
  Onzonelist(){
    this.inload=false
    this.zonelistservice.zonelist().subscribe(res=>{
      console.log(res)
      this.coutrydataobject=res
     
      if(this.coutrydataobject.success==true){
        
   
        let tableColNamesFromAPI=[]
          let tableColNamesWithSpace={}
        if(this.coutrydataobject.data.values){
           
              let Actions=['Edit','Delete']
              let actionIcon=['edit','delete']
              this.coutrydataobject.data.values.forEach(element => {
               element.popupForm='zoneDailog'
               })
      
                tableColNamesFromAPI=Object.keys(this.coutrydataobject.data.values[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.countryheader=tableColNamesWithSpace
                this.countryheader.Name=this.Titlename+' '+ this.countryheader.Name
                delete this.countryheader.actionIcons
                delete this.countryheader.popupForm
                delete this.countryheader.is_visible
                delete this.countryheader.Id
                this.dataForTable= this.coutrydataobject.data.values
                console.log(this.coutrydataobject.data.values, this.countryheader)
                
        }
        this.OnCountrylist()
       
        }
  
    })
}
OnCountrylist(){
  
  this.zonelistservice.contrylist().subscribe(res=>{
    this.dropdowndata=res
    if(this.dropdowndata.success==true){
      this.selectboxdata = this.dropdowndata.data.values
      // this.selectboxdata = this.dropdowndata.data.values.map(item => {
      //   return {
      //     Name: item.Name,
      //     Id: item.Id
      //   };
      // });
   
    }
   
    this.inload=true

  })
}
insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
}
