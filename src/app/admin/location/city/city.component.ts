import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { statemodal } from '../location.modal';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { LocationService } from '../location.service';
import { DatatableComponent } from '../../common/datatable/datatable.component';
import { LocationdialogComponent } from '../dialogs/locationdialog/locationdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LocationdeleteComponent } from '../dialogs/locationdelete/locationdelete.component';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.sass'],
 // providers:[DatatableComponent]
})
export class CityComponent implements OnInit, OnChanges {
  public Titlename:string="City"
  public selectoption:string="State"
  //@ViewChild(LactiontableComponent) child;
 // @ViewChild(DatatableComponent) child:any
   public coutrydataobject:any = new statemodal()
   public pagename='cityDailog'
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public AddAction={actionName:'Add',popupForm:this.pagename}
  
   
    constructor(public cityservice:LocationService,private snackBar: MatSnackBar,public dialog: MatDialog, public LoaderService:LoaderService){ }
  ngOnInit(): void {
   
    this.OnCitylist()
    this.Onstatelist()
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
    if(event.popupForm=='Edit'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:event.actionName,
        list:this.selectboxdata,
        dropdownname:this.selectoption
        
      }
    }
    else if(event.popupForm=='Add'){
      dialogdata= {
        actionName:event.popupForm,
        tabledatadeatils:'',
        list:this.selectboxdata,
        popupForm:this.pagename,
        dropdownname:this.selectoption
        
      }
    }

    const dialogRef=this.dialog.open(LocationdialogComponent, {
      data:dialogdata,
       minWidth:'400px'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed',result);
       if(result.action=='Edit'){
         console.log(result)
         this.updateRowData(result.itemsumbited)
        // this.dataChange.emit(result);
       }
       else if(result.action=='Add'){
        this.addRowData(result.itemsumbited)
       }
      
     });
  }
  Ondelete(event){
  
    const dialogRef=this.dialog.open(LocationdeleteComponent, {
     
          data: { actionName:event.popupForm,
            tabledatadeatils:event.actionName,
            
          },
          minWidth:'400px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          if(result.action=='Delete'){
            console.log(result)
            this.deleteRowData(result.itemsumbited);
           }
         
        });
   

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
    this.LoaderService.Loaderpage.next(true)
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
        this.inload=true
       
        }
        this.LoaderService.Loaderpage.next(false)
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
    
   })
}
insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
}
