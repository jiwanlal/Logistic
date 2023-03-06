import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';

import { usermodal } from '../users.modal';
import { UsersService } from '../users.service';
import { UsersdialogComponent } from '../dialog/usersdialog/usersdialog.component';
import { DeletedialogComponent } from '../dialog/deletedialog/deletedialog.component';
import { LocationService } from '../../location/location.service';
import { BusinessesService } from '../../businesses/businesses.service';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.sass']
})
export class UserTypeComponent implements OnInit, OnChanges{
  public Titlename:string="user"
  public selectoption:string=""
  //@ViewChild(LactiontableComponent) child;
 // @ViewChild(DatatableComponent) child:any
   public dataobject:any = new usermodal()
   public pagename='userDailog'
   public inload=false
   public countryheader
   public dataForTable
   public dropdowndata
   public selectboxdata
   public countrylist=[]
  public statelist=[]
  public citylist=[]
  public postcodelist=[]
  public rolelist=[]
  public compnaylist=[]
  public officelist=[]
  public Alldata:boolean=false
  litstitme
   public AddAction={actionName:'Add',popupForm:this.pagename}
  
   
    constructor(public usersservice:UsersService,public businessservice:BusinessesService,private snackBar: MatSnackBar,public dialog: MatDialog){ }
  async ngOnInit(): Promise<void> {
   
    this.Onuserlist()
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
    console.log(this.Onstatelist)
    var dialogdata:any
    if(event.popupForm=='Edit'){
      
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.frist_name,
          lastname:event.actionName.last_name,
          id:event.actionName.user_id,
          address:event.actionName.address,
          companylist:this.compnaylist,
          office:this.officelist,
          description:event.actionName.description,
          dailogPage:event.actionName.dailogPage,

          }
        
      }
    }
    else if(event.popupForm=='Add'){
      this.Onstatelist()
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:'',
          lastname:'',
          id:'',
          address:'',
          companylist:this.compnaylist,
          office:this.officelist,
          description:'',
          dailogPage:event.actionName.dailogPage,

          }
        
      }
    }

    const dialogRef=this.dialog.open(UsersdialogComponent, {
      data:dialogdata,
       minWidth:'768px'
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
              name:event.actionName.user_name,
              id:event.actionName.user_id,
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
                  user_name:row_obj.itemsumbited.CommonName,
                  description:row_obj.itemsumbited.description
                //  state_id:row_obj.state_id

                  }
      this.usersservice.userput(row_obj.id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onuserlist()
      })
     
    }
  
  addRowData(row_obj){
    console.log(row_obj)

    let itemvalue={
      first_name:row_obj.itemsumbited.CommonName,
      country_id:row_obj.itemsumbited.countryselect

     // state_id:row_obj.state_id
    }
    this.usersservice.userpost(itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onuserlist()
      })
    console.log(this.dataForTable)
   
   // this.table.renderRows();
    
  }
 
  deleteRowData(row_obj){
    console.log(row_obj)

    this.usersservice.userdelete(row_obj.itemsumbited.id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.itemsumbited.name+ " Record Delete Successfully...!!!",
      "top",
      "right"
    );
    this.Onuserlist()
  })
  }
  
  Onuserlist(){
    this.inload=false
    this.usersservice.userget().subscribe(res=>{
      this.Onstatelist()
      this.dataobject=res
      console.log(res)
      if(this.dataobject.success==true){
        
       // let actions = ['Edit','Delete']
      //  let actionIcon = ['edit', 'delete']
        let tableColNamesFromAPI=[]
          let tableColNamesWithSpace={}
        if(this.dataobject.data.values){
        
              this.dataobject.data.values.forEach(element => {
               
               element.dailogPage=this.pagename
             //  element.actions = actions
             //  element.actionIcon = actionIcon
             
               
              })
      
                tableColNamesFromAPI=Object.keys(this.dataobject.data.values[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.countryheader=tableColNamesWithSpace
               
               // this.countryheader.first_name=this.Titlename 
               // this.countryheader.user_id='user Id'
                delete this.countryheader.dailogPage
                delete this.countryheader.is_visible
               
                
                delete this.countryheader.actionIcons
                 this.dataForTable= this.dataobject.data.values
                console.log(this.dataobject.data, this.countryheader)
                
        }
        this.inload=true
       
        }
  
    })
}
 
 Onstatelist(){

this.usersservice.companyList().subscribe(res=>{
  
    setTimeout(() => {
      this.compnaylist=res.data.values
    }, 1000);
   // this.onobectitem(this.compnaylist)
 
  
})
this.businessservice.getofficelist().subscribe(res=>{
  
  setTimeout(() => {
    this.officelist=res.data.values
  }, 1000);
 // this.onobectitem(this.compnaylist)


})


this.usersservice.roleget().subscribe(res=>{
  setTimeout(() => {
    this.rolelist=res.data
  }, 1000);
  
})
}
insertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
  return string;
}
}