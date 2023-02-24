import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { statemodal } from '../country/location.modal';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-postalcode',
  templateUrl: './postalcode.component.html',
  styleUrls: ['./postalcode.component.sass']
})
export class PostalcodeComponent implements OnInit, OnChanges {
  public Titlename="Post code"
  public selectoption="City"
  
  @ViewChild(LactiontableComponent) child
   public coutrydataobject:any = new statemodal()
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public pagename='postcodeDailog'
    constructor(public stateservice:LocationService,private snackBar: MatSnackBar){ }
  ngOnInit(): void {
   
    this.Onstatelist()
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
                  post_code:row_obj.title,
                  city_id:row_obj.city_id

                  }
      this.stateservice.postcodeput(row_obj.Id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onstatelist()
      })
     
    }
 
  
  addRowData(row_obj){
    let itemvalue={
      post_code:row_obj.title,
      city_id:row_obj.city_id
    }
    this.stateservice.postcodepost(itemvalue).subscribe(res=>{
       
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onstatelist()
      })
    }
  deleteRowData(row_obj){
  this.stateservice.postcodedelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.Name+ " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onstatelist()
  })
  }
  
  Onstatelist(){
    this.inload=false
    this.stateservice.postcodelist().subscribe(res=>{
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
                delete this.countryheader.popupForm
                delete this.countryheader.is_visible
                delete this.countryheader.Id
                delete this.countryheader.actionIcons
                this.dataForTable= this.coutrydataobject.data.values
                
        }
        this.Onregionlist()
        this.inload=true
        }
  
    })
}
Onregionlist(){
  
  this.stateservice.citylist().subscribe(res=>{
   this.dropdowndata=res
    if(this.dropdowndata.success==true){
      this.selectboxdata=this.dropdowndata.data.values
      console.log(this.selectboxdata)
    }
   })
}
insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
}