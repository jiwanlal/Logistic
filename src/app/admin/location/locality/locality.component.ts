import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { statemodal } from '../country/location.modal';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.sass']
})
export class LocalityComponent implements OnInit, OnChanges {
  public Titlename="Locality"
  public selectoption="Post Code"
  
  @ViewChild(LactiontableComponent) child
   public coutrydataobject:any = new statemodal()
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public pagename='localityDailog'
    constructor(public localityservice:LocationService,private snackBar: MatSnackBar){ }
  ngOnInit(): void {
   
    this.Onlocalitylist()
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
                  locality_name:row_obj.title,
                  post_code_id:row_obj.post_code_id

                  }
      this.localityservice.localityput(row_obj.Id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onlocalitylist()
      })
     
    }
 
  
  addRowData(row_obj){
    let itemvalue={
      locality_name:row_obj.title,
      post_code_id:row_obj.post_code_id
    }
    this.localityservice.localitypost(itemvalue).subscribe(res=>{
       
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onlocalitylist()
      })
    }
  deleteRowData(row_obj){
  this.localityservice.localitydelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.Name+ " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onlocalitylist()
  })
  }
  
  Onlocalitylist(){
    this.inload=false
    this.localityservice.localitylist().subscribe(res=>{
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
                delete this.countryheader.post_code_id
                delete this.countryheader.actionIcons
                delete this.countryheader.Id

                this.dataForTable= this.coutrydataobject.data.values
                
        }
        this.Onpostcodelist()
      
        }
  
    })
}
Onpostcodelist(){
  
  this.localityservice.postcodelist().subscribe(res=>{
   this.dropdowndata=res
    if(this.dropdowndata.success==true){
      this.selectboxdata=this.dropdowndata.data.values
      console.log(this.selectboxdata)
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