import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { LeftmenulistService } from 'src/app/core/service/leftmenulist.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.sass']
})
export class PermissionComponent implements OnInit {
  public rolelist=[]
  public sidebarItems=[]
  roleid
 constructor( public userservice:UsersService, public leftmenuservice:LeftmenulistService,private authService: AuthService){
  this
 }
 ngOnInit(): void {
  this.userservice.roleget().subscribe(res=>{
    console.log(res.data,this.authService.currentUserValue.roleid)
    this.rolelist=res.data
    
    this.roleid=this.authService.currentUserValue.roleid
    this.onChange(this.roleid)
    // this.rolelist.filter(item=>item.roleid=='')
  },
  error=>{

  })

  // this.leftmenuservice.getMenulist().subscribe(res=>{
  //   this.sidebarItems=res.data;
  //   console.log(this.sidebarItems)
  // },

  //   error=>{

  //   })
   
 }
 onChange(event){
  console.log(event)
 
  this.userservice.permisson(event).subscribe(res=>{
    console.log(res.data)
    this.sidebarItems=res.data
  })
 }
  
}
