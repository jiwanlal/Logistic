import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  regionmodal } from '../country/location.modal';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.sass']
})
export class RegionComponent implements OnInit, OnChanges {
  public Titlename="Region List"
  @ViewChild(LactiontableComponent) child
   public coutrydataobject:any = new regionmodal()
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public pagename='regionDailog'
    constructor(public regionservice:LocationService,private snackBar: MatSnackBar){ }
  ngOnInit(): void {
   
    this.Onregionlist()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    //this.addItem(changes)
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
    // this.dataForTable= this.dataForTable.filter((value,key)=>{
    //   if(value.country_id== row_obj.country_id){
    //     value.region_name = row_obj.title;
    //     console.log( this.dataForTable)
     
    let itemvalue={
                 // country_id:row_obj.country_id,
                  region_name:row_obj.title,
                  zone_id:row_obj.zone_id

                  }
      this.regionservice.regionput(row_obj.region_id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onregionlist()
      })
     
    }
     // return true;
   // });
  
  addRowData(row_obj){
    console.log(row_obj)
   // var d = new Date();
  //  this.dataForTable.push({
  //     id:row_obj.id,
  //     region_name:row_obj.title
  //   });
    let itemvalue={
      region_name:row_obj.title,
      zone_id:row_obj.zone_id
    }
    this.regionservice.regionpost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onregionlist()
      })
    console.log(this.dataForTable)
   
   // this.table.renderRows();
    
  }
  deleteRowData(row_obj){
    console.log(row_obj)
  //   this.tabledata = this.tabledata.filter((value,key)=>{
  //     return value.id != row_obj.id;
  //   });
 
    this.regionservice.regiondelete(row_obj.region_id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.region_name+ " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onregionlist()
  })
  }
  
  Onregionlist(){
    this.inload=false
    this.regionservice.regionlist().subscribe(res=>{
      console.log(res)
      this.coutrydataobject=res
     
      if(this.coutrydataobject.success==true){
        
   
        let tableColNamesFromAPI=[]
          let tableColNamesWithSpace={}
        if(this.coutrydataobject.data.length>0){
              let i=0
              let Actions=['Edit','Delete']
              let actionIcon=['edit','delete']
              this.coutrydataobject.data.forEach(element => {
               
                element.id=i+1
                element.region_name=element.region_name==null?'':element.region_name.charAt(0).toUpperCase()+ element.region_name.slice(1)
                element.Actions=Actions
                element.actionIcon=actionIcon
                element.popupForm=this.pagename
                
                i+=1
               
              })
      
                tableColNamesFromAPI=Object.keys(this.coutrydataobject.data[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.countryheader=tableColNamesWithSpace
                this.countryheader.id='ID'
                //changed from Ui need cahnge col name fron Db
                this.countryheader.region_name='Zone Name'
                this.countryheader.zone_name='Region Name'
                delete this.countryheader.actionIcon
                delete this.countryheader.popupForm
                delete this.countryheader.is_visible
                delete this.countryheader.zone_id
                //delete this.countryheader.id
                this.dataForTable= this.coutrydataobject.data
                console.log(this.coutrydataobject.data, this.countryheader)
                
        }
        this.Onzonelist()
        this.inload=true
        }
  
    })
}
Onzonelist(){
  
  this.regionservice.zonelist().subscribe(res=>{
   this.dropdowndata=res
    if(this.dropdowndata.success==true){
      this.selectboxdata=this.dropdowndata.data
    }
   })
}
insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
}