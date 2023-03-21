import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Rss } from "angular-feather/icons";
import { UsersdialogComponent } from '../dialog/usersdialog/usersdialog.component';
import { AuthService } from "src/app/core/service/auth.service";
import { custompattern } from "../../pattern.modal";
import { UsersService } from "../users.service";
import { ProfileDeatils } from "./user.modal";
import { BusinessesService } from "../../businesses/businesses.service";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.sass"],
})
export class UserProfileComponent implements OnInit {
  public UserDetais:ProfileDeatils[]=[]
  public acceptonly='image/png, image/gif, image/jpeg'
  public formdata:any=FormGroup
  public Onlyalphabets=new custompattern()
  public countrylist=[]
  public statelist=[]
  public citylist=[]
  public postcodelist=[]
  public rolelist=[]
  public compnaylist=[]
  public officelist=[]
 
  constructor(public userservice:UsersService,public businessservice:BusinessesService, public authservice:AuthService,private snackBar: MatSnackBar,public dialog: MatDialog) {}
  ngOnInit(): void {
    const id= this.authservice.currentUserValue.id
    this.onUserDetails(id)
    this.Onstatelist()
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
  
  }
  onUserDetails(id){
    this.authservice.getselectUser(id).subscribe(res=>{
      console.log(res.data)
      if(res.success==true){
       this.UserDetais=res.data
       
      // console.log(this.UserDetais[0])
      }
    })
  }
  editprofile(eventedit:ProfileDeatils){
    console.log(eventedit)

   var dialogdata={
      actionName:'Edit',
      tabledatadeatils:{
        name:eventedit.first_name,
        lastname:eventedit.last_name,
        email:eventedit.email,
        mobile:eventedit.mobile,
        id:eventedit.id,
        address:eventedit.address,
        companylist:this.compnaylist,
        officelist:this.officelist,
        rolelist:this.rolelist,
        companyname:eventedit.company_id,
        officename:eventedit.office_id,
        rolename:eventedit.role_id,
        description:eventedit.address,
        uploadFile:eventedit.profile_picture,
        password:eventedit.password,
        dailogPage:'userDailog',

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
            this.userUdateDetails(result)
           }
          
         });
      
    }

    Onstatelist(){

      this.userservice.companyList().subscribe(res=>{
        
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
      
      
      this.userservice.roleget().subscribe(res=>{
        setTimeout(() => {
          this.rolelist=res.data
        }, 1000);
        
      })
      }
      userUdateDetails(row_obj){
        console.log(row_obj)
       let  itemvalue={
          first_name:row_obj.itemsumbited.CommonName,
          last_name:row_obj.itemsumbited.lastName,
          company_id:row_obj.itemsumbited.company,
          office_id:row_obj.itemsumbited.office,
          role_id:row_obj.itemsumbited.role,
          email:row_obj.itemsumbited.email,
          mobile:row_obj.itemsumbited.mobile,
          profile_picture:row_obj.itemsumbited.uploadFile==''?'':{name:row_obj.itemsumbited.uploadFile.name,size:row_obj.itemsumbited.uploadFile.size,
            type:row_obj.itemsumbited.uploadFile.type,path:'webkitRelativePath'
          },
          
          address:row_obj.itemsumbited.description
        }
        this.userservice.userput(row_obj.id,itemvalue).subscribe(res=>{
          console.log(res)
          this.showNotification(
            "black",
            "Edit Record Successfully...!!!",
            "top",
            "right"
          );
          this.onUserDetails(row_obj.id)
        })

  }
       
      
}
