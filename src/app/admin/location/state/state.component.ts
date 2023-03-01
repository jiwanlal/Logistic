import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { statemodal } from '../location.modal';
import { LactiontableComponent } from '../lactiontable/lactiontable.component';
import { LocationService } from '../location.service';
import { LocationdeleteComponent } from '../dialogs/locationdelete/locationdelete.component';
import { LocationdialogComponent } from '../dialogs/locationdialog/locationdialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.sass']
})
export class StateComponent implements OnInit, OnChanges {
  public Titlename="State"
  public selectoption="Region"
  @ViewChild(LactiontableComponent) child
   public coutrydataobject:any = new statemodal()
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public pagename='stateDailog'
   public AddAction={actionName:'Add',popupForm:this.pagename}
    constructor(public stateservice:LocationService,private snackBar: MatSnackBar,public dialog: MatDialog){ }
  ngOnInit(): void {
   
    this.Onstatelist()
    this.Onregionlist()
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
    //     value.state_name = row_obj.title;
    //     console.log( this.dataForTable)
     
    let itemvalue={
                 // country_id:row_obj.country_id,
                  state_name:row_obj.title,
                  region_id:row_obj.region_id

                  }
      this.stateservice.stateput(row_obj.Id,itemvalue).subscribe(res=>{
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
     // return true;
   // });
  
  addRowData(row_obj){
    console.log(row_obj)
   // var d = new Date();
  //  this.dataForTable.push({
  //     id:row_obj.id,
  //     state_name:row_obj.title
  //   });
    let itemvalue={
      state_name:row_obj.title,
      region_id:row_obj.region_id
    }
    this.stateservice.statepost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onstatelist()
      })
    console.log(this.dataForTable)
   
   // this.table.renderRows();
    
  }
  deleteRowData(row_obj){
    console.log(row_obj)
  //   this.tabledata = this.tabledata.filter((value,key)=>{
  //     return value.id != row_obj.id;
  //   });
 
    this.stateservice.statedelete(row_obj.Id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.title+ " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onstatelist()
  })
  }
  
  Onstatelist(){
    this.inload=false
    this.stateservice.statelist().subscribe(res=>{
   
      
      this.coutrydataobject=res
      if(this.coutrydataobject.success==true){
        
   
        let tableColNamesFromAPI=[]
          let tableColNamesWithSpace={}
        if(this.coutrydataobject.data.values){
          
              this.coutrydataobject.data.values.forEach(element => {
               
              //  element.state_name=element.state_name==null?'':element.state_name.charAt(0).toUpperCase()+ element.state_name.slice(1)
              
                element.popupForm=this.pagename
              
               
              })
      
                tableColNamesFromAPI=Object.keys(this.coutrydataobject.data.values[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.countryheader=tableColNamesWithSpace
                this.countryheader.zone_name=this.Titlename +' '+ this.countryheader.zone_name
               
                delete this.countryheader.popupForm
                delete this.countryheader.is_visible
                delete this.countryheader.zone_id
                delete this.countryheader.Id
                delete this.countryheader.actionIcons
                this.dataForTable= this.coutrydataobject.data.values
                
        }
       // this.Onregionlist()
       this.inload=true
        
        }
  
    })
}
Onregionlist(){
 
  this.stateservice.regionlist().subscribe(res=>{
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
