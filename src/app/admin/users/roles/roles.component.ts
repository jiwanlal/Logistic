import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';

import { rolemodal } from '../users.modal';
import { UsersService } from '../users.service';
import { UsersdialogComponent } from '../dialog/usersdialog/usersdialog.component';
import { DeletedialogComponent } from '../dialog/deletedialog/deletedialog.component';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass']
})
export class RolesComponent implements OnInit, OnChanges {
  public Titlename:string="Role"
  public selectoption:string=""
  //@ViewChild(LactiontableComponent) child;
 // @ViewChild(DatatableComponent) child:any
   public dataobject:any = new rolemodal()
   public pagename='roleDailog'
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public AddAction={actionName:'Add',popupForm:this.pagename}
   public errormessage
  
   
    constructor(public usersservice:UsersService,private snackBar: MatSnackBar,public dialog: MatDialog,public loaderservice:LoaderService){ }
  ngOnInit(): void {
   
    this.Onrolelist()
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
    console.log()
    var dialogdata:any
    if(event.popupForm=='Edit' ||event.status=='status'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.role_name,
          id:event.actionName.role_id,
          description:event.actionName.description,
          dailogPage:event.actionName.dailogPage,
          status:event.status=='status'?event.event.checked:event.actionName.status,
          statusoption:event.status=='status'?'statusDailog':''
          }
        
      }
    }
    else if(event.popupForm=='Add'){
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:'',
          id:null,
          description:'',
          dailogPage:this.pagename
          }
        
      }
    }

    const dialogRef=this.dialog.open(UsersdialogComponent, {
      data:dialogdata,
       minWidth:'400px'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed',result);
       if(result.action=='Edit'){
         console.log(result)
         this.updateRowData(result)
        // this.dataChange.emit(result);
       }
       else if(result.action=='Add'){
        this.addRowData(result)
       }
      
     });
  }
  Ondelete(event){
    console.log(event)
  
    const dialogRef=this.dialog.open(DeletedialogComponent, {
     
          data: { actionName:event.popupForm,
            tabledatadeatils:{
              name:event.actionName.role_name,
              id:event.actionName.role_id,
              description:event.actionName.description,
              dailogPage:event.actionName.dailogPage
              }
            
          },
          minWidth:'400px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          if(result.action=='Delete'){
            console.log(result)
            this.deleteRowData(result);
           }
         
        });
   

  }
  
  updateRowData(row_obj){
 console.log(row_obj)
     
    let itemvalue={
                  role_name:row_obj.itemsumbited.CommonName,
                  description:row_obj.itemsumbited.description
                //  state_id:row_obj.state_id

                  }
      this.usersservice.roleput(row_obj.id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onrolelist()
      })
     
    }
  
  addRowData(row_obj){
    console.log(row_obj)

    let itemvalue={
      role_name:row_obj.itemsumbited.CommonName,
      description:row_obj.itemsumbited.description

     // state_id:row_obj.state_id
    }
    this.usersservice.rolepost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onrolelist()
      })
    console.log(this.dataForTable)
   
   // this.table.renderRows();
    
  }
 
  deleteRowData(row_obj){
    console.log(row_obj)

    this.usersservice.roledelete(row_obj.itemsumbited.id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.itemsumbited.name+ " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onrolelist()
  })
  }
  
  Onrolelist(){
    this.inload=false
    this.loaderservice.Loaderpage.next(true)
    this.usersservice.roleget().subscribe(res=>{
      
      this.dataobject=res
      this.errormessage=res['message']
      console.log(res)
      if(this.dataobject.success==true){
        
        let actions = ['Edit','Delete']
        let actionIcon = ['edit', 'delete']
        let tableColNamesFromAPI=[]
          let tableColNamesWithSpace={}
        if(this.dataobject.data){
        
              this.dataobject.data.forEach(element => {
               
               element.dailogPage=this.pagename
               element.actions = actions
               element.actionIcon = actionIcon
             
               
              })
      
                tableColNamesFromAPI=Object.keys(this.dataobject.data[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.countryheader=tableColNamesWithSpace
               
                this.countryheader.role_name=this.Titlename 
                this.countryheader.role_id='Role Id'
                delete this.countryheader.dailogPage
                delete this.countryheader.is_visible
                delete this.countryheader.updated_at
                delete this.countryheader.updated_by
                delete this.countryheader.created_by
                delete this.countryheader.created_at
                
               
                
                delete this.countryheader.actionIcon
                
                this.dataForTable= this.dataobject.data
                console.log(this.dataobject.data, this.countryheader)
                
        }
        this.inload=true
       
        }
        this.loaderservice.Loaderpage.next(false)
  
    })
}
Onstatelist(){
  
  // this.roleservice.statelist().subscribe(res=>{
  //  this.dropdowndata=res
  // console.log(res)
  //   if(this.dropdowndata.success==true){
  //     this.selectboxdata=this.dropdowndata.data.values
   
  //   }
    
  //  })
}
insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
}
