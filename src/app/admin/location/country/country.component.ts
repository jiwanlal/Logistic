import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { LocationService } from '../location.service';
import { countrydatamodal} from './location.modal';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.sass']
})
export class CountryComponent implements OnInit, OnChanges{
public Titlename="Country"
public pagename="countryDailog"
public selectoption=''
@ViewChild(LactiontableComponent) child
 public coutrydataobject:any = new countrydatamodal()
 public inload=false
 public countryheader
 public dataForTable
  constructor(public contrylistservice:LocationService,private snackBar: MatSnackBar){ }
ngOnInit(): void {
  this.Oncountrylist()
  
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
console.log(event.itemsumbited
  )
if(event.action=='Edit'){
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
 let itemvalue={country_name:row_obj.title }
    this.contrylistservice.countryput(row_obj.Id,itemvalue).subscribe(res=>{
      console.log(res)
      this.showNotification(
        "black",
        "Edit Record Successfully...!!!",
        "top",
        "right"
      );
      this.Oncountrylist()
    })
   
  }

addRowData(row_obj){
 
  let itemvalue={
    country_name:row_obj.title
  }
    this.contrylistservice.countrypost(itemvalue).subscribe(res=>{
      console.log(res)
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "top",
        "right"
      );
      this.Oncountrylist()
    })
  console.log(this.dataForTable)
 }
deleteRowData(row_obj){
 this.contrylistservice.countrydelete(row_obj.Id).subscribe(res=>{
  this.showNotification(
    "snackbar-danger",
    row_obj.Name + " Record Delete Successfully...!!!",
    "top",
    "right"
  );
  this.Oncountrylist()
})
}

Oncountrylist(){
  this.inload=false
  this.contrylistservice.contrylist().subscribe(res=>{
    console.log(res)
    this.coutrydataobject=res
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
            this.countryheader.Name=this.Titlename+' '+this.countryheader.Name
              delete this.countryheader.actionIcons
              delete this.countryheader.popupForm
              delete this.countryheader.is_visible
              delete this.countryheader.Id
              this.dataForTable= this.coutrydataobject.data.values
              console.log(this.coutrydataobject.data.values, this.countryheader)
              
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
