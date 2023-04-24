import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Rss } from "angular-feather/icons";
import { UsersdialogComponent } from '../dialog/usersdialog/usersdialog.component';
import { AuthService } from "src/app/core/service/auth.service";
import { custompattern } from "../../pattern.modal";
import { UsersService } from "../users.service";
import { ProfileDeatils } from "./user.modal";
import { BusinessesService } from "../../businesses/businesses.service";
import { ProfileuploadComponent } from "../dialog/profileupload/profileupload.component";
import { environment } from "src/environments/environment";
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
  imgurl=environment.imgUrl
  error_messages = {
  

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length.' },
      { type: 'maxlength', message: 'Password length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password length.' },
      { type: 'maxlength', message: 'Password length.' }
      
    ],
  }
 public userrole
 public img='assets/images/user.png'
 public userImg
  constructor(public userservice:UsersService,public businessservice:BusinessesService, public authservice:AuthService,private snackBar: MatSnackBar,public dialog: MatDialog,public formBuilder: FormBuilder,) {}
  ngOnInit(): void {
    const id= this.authservice.currentUserValue.id
    this.userrole = this.authservice.currentUserValue.role;
    this.userImg = this.authservice.currentUserValue.img=='[object Object]'||this.authservice.currentUserValue.img==''||this.authservice.currentUserValue.img==null?this.img:this.imgurl+this.authservice.currentUserValue.img;
    this.formdata = this.formBuilder.group({
      oldpassword:['', [ Validators.required]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])],
      confirmpassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])],
    }, { 
      validators: this.password.bind(this)
    })
    this.onUserDetails(id)
    this.Onstatelist()
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
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
      pagetype:'profile',
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
        gender:eventedit.gender,
        dob:eventedit.dob,
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
          gender:row_obj.itemsumbited.gender,
          password:row_obj.itemsumbited.password,
          profile_picture:row_obj.itemsumbited.uploadFile==null?'':{name:row_obj.itemsumbited.uploadFile.name,size:row_obj.itemsumbited.uploadFile.size,
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
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  onSubmit(){
 
    if(!this.formdata.value){
      return
    }
    else{
      let body={
        "old_password":this.formdata.controls['oldpassword'].value,
        "new_password":this.formdata.controls['confirmpassword'].value
      }

      this.userservice.Onchangpassword(this.authservice.currentUserValue.id,body).subscribe((res)=>{

        console.log(res)
        if(res.success){
          this.showNotification(
            "snackbar-success",
            res.message,
            "top",
            "right"
          );
          this.formdata.reset({
            oldpassword:[''],
            password: [''],
            confirmpassword:['']
           });
        }
      
      },
      (error)=>{
        console.log(error)
      }
      )
      
    }
  }
  onuploadProfileimg(){
        const dialogRef=this.dialog.open(ProfileuploadComponent, {
          data:'',
           minWidth:'475px'
         });
         dialogRef.afterClosed().subscribe(result => {
          if(result!=false){
          const formData = new FormData();
          formData.append('profile_picture',result.profile_picture)
          console.log(result)
          this.userservice.Onchangprofile(this.authservice.currentUserValue.id,formData).subscribe(res=>{
            this.showNotification(
              "snackbar-success",
              res.message,
              "top",
              "right"
            );


          })
         
          }
          
         });
      
       }
      
}
