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
  public Titlename="Zone List"
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
    //     value.zone_name = row_obj.title;
    //     console.log( this.dataForTable)
     
    let itemvalue={
                 // country_id:row_obj.country_id,
                  zone_name:row_obj.title,
                  country_id:row_obj.country_id

                  }
      this.zonelistservice.zoneput(row_obj.zone_id,itemvalue).subscribe(res=>{
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
     // return true;
   // });
  
  addRowData(row_obj){
   // var d = new Date();
  //  this.dataForTable.push({
  //     id:row_obj.id,
  //     zone_name:row_obj.title
  //   });
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
   
   // this.table.renderRows();
    
  }
  deleteRowData(row_obj){
    console.log(row_obj)
  //   this.tabledata = this.tabledata.filter((value,key)=>{
  //     return value.id != row_obj.id;
  //   });
 
    this.zonelistservice.zonedelete(row_obj.zone_id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.zone_name+ " Record Delete Successfully...!!!",
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
        if(this.coutrydataobject.data.length>0){
              let i=0
              let Actions=['Edit','Delete']
              let actionIcon=['edit','delete']
              this.coutrydataobject.data.forEach(element => {
               
                element.id=i+1
                element.zone_name=element.zone_name==null?'':element.zone_name.charAt(0).toUpperCase()+ element.zone_name.slice(1)
                element.Actions=Actions
                element.actionIcon=actionIcon
                element.popupForm='zoneDailog'
                
                i+=1
               
              })
      
                tableColNamesFromAPI=Object.keys(this.coutrydataobject.data[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.countryheader=tableColNamesWithSpace
                this.countryheader.id='ID'
                //changed from Ui need cahnge col name fron Db
                this.countryheader.zone_name='Zone Name'
                this.countryheader.country_name='Country Name'
                delete this.countryheader.actionIcon
                delete this.countryheader.popupForm
                delete this.countryheader.is_visible
                              
                delete this.countryheader.country_id
                delete this.countryheader.zone_id
                //delete this.countryheader.id
                this.dataForTable= this.coutrydataobject.data
                console.log(this.coutrydataobject.data, this.countryheader)
                
        }
        this.OnCountrylist()
        this.inload=true
        }
  
    })
}
OnCountrylist(){
  
  this.zonelistservice.contrylist().subscribe(res=>{
   
    
    this.dropdowndata=res
    if(this.dropdowndata.success==true){
      this.selectboxdata=this.dropdowndata.data
     
      console.log(res,this.selectboxdata)
    }
   
    

  })
}
insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
}
