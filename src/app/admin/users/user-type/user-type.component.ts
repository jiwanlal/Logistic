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
    console.log(event.actionName.status)
 
  if(event.popupForm == 'Delete' && (event.popupForm=='Edit'||event.popupForm=='Add' || event.actionName.status!=true))
  {
    
      console.log(event) 
      this.OpenDialog(event)
    
   
  }


  else{
    console.log(event)
    this.Ondelete(event)
  }
 }
 

  OpenDialog(event){
  //  console.log(event.event.checked)
    var dialogdata:any
    // if(event.actionName.status==false){
    //       if(){
              
    //         dialogdata={
    //           actionName:'Active User',
    //           tabledatadeatils:{
            
    //             id:event.actionName.id,
    //             dailogPage:'statusDailog',
    //             rolelist:this.rolelist,
    //             status:event.actionName.status

    //             }
    //       }
    //     }
    //     }
  
    if(event.popupForm=='Edit' ||event.status=='status'){
      
      dialogdata={
        actionName:event.popupForm,
        tabledatadeatils:{
          name:event.actionName.first_name,
          lastname:event.actionName.last_name,
          email:event.actionName.email,
          mobile:event.actionName.mobile,
          id:event.actionName.id,
          address:event.actionName.address,
          companylist:this.compnaylist,
          officelist:this.officelist,
          rolelist:this.rolelist,
          gender:event.actionName.gender,
          companyname:event.actionName.company_id,
          officename:event.actionName.office_id,
          rolename:event.actionName.role_id,
          description:event.actionName.description,
          uploadFile:event.actionName.profile_picture,
          password:event.actionName.password,
          dob:event.actionName.dob,
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
          lastname:'',
          id:'',
          address:'',
          email:'',
          mobile:'',
          companylist:this.compnaylist,
          officelist:this.officelist,
          rolelist:this.rolelist,
          companyname:'',
          officename:'',
          rolename:'',
          description:'',
          uploadFile:'',
          gender:'male',
          dob:'',
          dailogPage:this.pagename,

          }
        
      }
    }
    

    const dialogRef=this.dialog.open(UsersdialogComponent, {
      data:dialogdata,
       minWidth:'767px'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed',result);
       if(result.action=='Edit'){
         console.log(result)
         this.updateRowData(result)
        // this.dataChange.emit(result);
       }
       else if(result.statusoption=="statusDailog"){
        this.roleUdate(result)
       }
       else{
        this.addRowData(result)
       }
      
     });
  }
  Ondelete(event){
    console.log(event)
  
    const dialogRef=this.dialog.open(DeletedialogComponent, {
     
          data: { actionName:event.popupForm=='Delete'? 'Delete':'ActiveInactive',
            tabledatadeatils:{
              name:event.actionName.first_name+''+ (event.actionName.last_name==null?"":event.actionName.last_name),
              id:event.actionName.id,
              description:event.actionName.address,
              dailogPage:event.actionName.dailogPage,
              statusoption:event.status=='status'?'status':'',
              status:event.actionName.status

              }
            
          },
          minWidth:'400px'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          if(result!=false){
            this.deleteRowData(result);
          }
            
            
           
         
        });
   

  }
  roleUdate(row_obj){
   let  itemvalue={
      role_id:row_obj.itemsumbited.role,
      status:row_obj.status,
     }
    this.usersservice.OnChangeStatus(row_obj.id,itemvalue).subscribe(res=>{
      console.log(res)
      this.showNotification(
        "snackbar-success",
        res.message,
        "top",
        "right"
      );
      this.Onuserlist()
    })
   
  }
  
  
  updateRowData(row_obj){
    console.log('update',row_obj)
  

 
  let  itemvalue={
    
    first_name:row_obj.itemsumbited.CommonName,
    last_name:row_obj.itemsumbited.lastName,
    company_id:row_obj.itemsumbited.company,
    office_id:row_obj.itemsumbited.office,
    role_id:row_obj.itemsumbited.role,
    email:row_obj.itemsumbited.email,
    mobile:row_obj.itemsumbited.mobile,
    gender:row_obj.itemsumbited.gender,
    dob:row_obj.itemsumbited.dob,
    address:row_obj.itemsumbited.description
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
    const formData = new FormData()
    let item={
      "first_name":row_obj.itemsumbited.CommonName,
   "last_name":row_obj.itemsumbited.lastName,
   "company_id":row_obj.itemsumbited.company,
   "office_id":row_obj.itemsumbited.office,
   "role_id":row_obj.itemsumbited.role,
   "email":row_obj.itemsumbited.email,
   "mobile":row_obj.itemsumbited.mobile,
   "gender":row_obj.itemsumbited.gender,
   "dob":row_obj.itemsumbited.dob,
   "address":row_obj.itemsumbited.description,
    }
    
  //   formData.append("first_name",row_obj.itemsumbited.CommonName),
  //   formData.append("last_name",row_obj.itemsumbited.lastName),
  //   formData.append("company_id",row_obj.itemsumbited.company),
  //   formData.append("password",row_obj.itemsumbited.password),
  //   formData.append("office_id",row_obj.itemsumbited.office),
  //   formData.append("role_id",row_obj.itemsumbited.role),
  //   formData.append("email",row_obj.itemsumbited.email),
  //   formData.append("mobile",row_obj.itemsumbited.mobile),
  //   formData.append("gender",row_obj.itemsumbited.gender),
  //   formData.append("dob",row_obj.itemsumbited.dob),
  //  formData.append('profile_picture', row_obj.file);
    this.usersservice.userpost(item).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
        this.Onuserlist()
      }),
      error=>{
        console.log(error)
        this.showNotification(
          "snackbar-danger",
          error,
          "top",
          "right"
        );
        console.log(error)
      }

    console.log(this.dataForTable)
   
   // this.table.renderRows();
    
  }
 
  deleteRowData(row_obj){
    console.log(row_obj)
    if(row_obj.action=='ActiveInactive'){
      let  itemvalue={
        // role_id:row_obj.itemsumbited.role,
        status:row_obj.itemsumbited.status,
       }
       console.log(itemvalue)
      this.usersservice.OnChangeStatus(row_obj.itemsumbited.id,itemvalue).subscribe(res=>{
        console.log(res)
        this.showNotification(
          "snackbar-success",
          res.message,
          "top",
          "right"
        );
        this.Onuserlist()
      })

    }
    else{
         this.usersservice.userdelete(row_obj.itemsumbited.id).subscribe(res=>{
    this.showNotification(
      "snackbar-danger",
      row_obj.itemsumbited.name+ res.message,
      "top",
      "right"
    );
    this.Onuserlist()
  })
    }
 

 
  }
  
  Onuserlist(){
    this.inload=false
    this.usersservice.userget().subscribe(res=>{
    
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
              
             //  element.actionIcon = actionIcon
             
               
              })
      
                tableColNamesFromAPI=Object.keys(this.dataobject.data.values[0])
                for(let i=0;i<tableColNamesFromAPI.length;i++){
                  tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
                }
                this.countryheader=tableColNamesWithSpace
               
               this.countryheader.first_name='Name' 
               this.countryheader.last_name='Last Name' 
               this.countryheader.temp_password='Password'
                 delete this.countryheader.last_name
               delete this.countryheader.password
                delete this.countryheader.dailogPage
                delete this.countryheader.is_visible
                delete this.countryheader.id
                delete this.countryheader.role_id
                delete this.countryheader.company_id
                delete this.countryheader.system_ip
                delete this.countryheader.system_name
                
                delete this.countryheader.profile_picture
                delete this.countryheader.gender
                delete this.countryheader.dob
                delete this.countryheader.address
                delete this.countryheader.city_id
                delete this.countryheader.state_id
                delete this.countryheader.country_id
                delete this.countryheader.post_code_id
                delete this.countryheader.updated_at
                delete this.countryheader.updated_by
                delete this.countryheader.created_by
                delete this.countryheader.created_at
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