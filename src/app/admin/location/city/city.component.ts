import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { statemodal } from '../country/location.modal';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.sass']
})
export class CityComponent implements OnInit, OnChanges {
  public Titlename:string="City"
  public selectoption:string="State"
  @ViewChild(LactiontableComponent) child
   public coutrydataobject:any = new statemodal()
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public pagename='cityDailog'
    constructor(public cityservice:LocationService,private snackBar: MatSnackBar){ }
  ngOnInit(): void {
   
    this.OnCitylist()
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
    //     value.city_name = row_obj.title;
    //     console.log( this.dataForTable)
     
    let itemvalue={
                 // country_id:row_obj.country_id,
                  city_name:row_obj.title,
                  state_id:row_obj.state_id

                  }
      this.cityservice.cityput(row_obj.Id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.OnCitylist()
      })
     
    }
     // return true;
   // });
  
  addRowData(row_obj){
    console.log(row_obj)
   // var d = new Date();
  //  this.dataForTable.push({
  //     id:row_obj.id,
  //     city_name:row_obj.title
  //   });
    let itemvalue={
      city_name:row_obj.title,
      state_id:row_obj.state_id
    }
    this.cityservice.citypost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.OnCitylist()
      })
    console.log(this.dataForTable)
   
   // this.table.renderRows();
    
  }
  deleteRowData(row_obj){
    console.log(row_obj)
  //   this.tabledata = this.tabledata.filter((value,key)=>{
  //     return value.id != row_obj.id;
  //   });
 
    this.cityservice.citydelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.Name+ " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.OnCitylist()
  })
  }
  
  OnCitylist(){
    this.inload=false
    this.cityservice.citylist().subscribe(res=>{
      
      this.coutrydataobject=res
      console.log(res)
    //  this.countryheader=this.coutrydataobject.data.columns
      if(this.coutrydataobject.success==true){
        
   
        let tableColNamesFromAPI=[]
          let tableColNamesWithSpace={}
        if(this.coutrydataobject.data.values){
        
              this.coutrydataobject.data.values.forEach(element => {
               
               element.popupForm=this.pagename
             
               
              })
      
                tableColNamesFromAPI=Object.keys(this.coutrydataobject.data.values[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.countryheader=tableColNamesWithSpace
               
                this.countryheader.Name=this.Titlename +' '+ this.countryheader.Name
                delete this.countryheader.popupForm
                delete this.countryheader.is_visible
                delete this.countryheader.zone_id
                delete this.countryheader.Id
                delete this.countryheader.actionIcons
                
                this.dataForTable= this.coutrydataobject.data.values
                console.log(this.coutrydataobject.data, this.countryheader)
                
        }
        this.Onstatelist()
       
        }
  
    })
}
Onstatelist(){
  
  this.cityservice.statelist().subscribe(res=>{
   this.dropdowndata=res
  console.log(res)
    if(this.dropdowndata.success==true){
      this.selectboxdata=this.dropdowndata.data.values
      // this.selectboxdata = this.dropdowndata.data.values.map(item => {
      //   return {
      //     Name: item.Name,
      //     Id: item.Id
      //   };
      // });
      // console.log(this.selectboxdata)
    //  this.dropdowndata=res
      
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
