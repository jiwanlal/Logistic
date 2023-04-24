import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { LeftmenulistService } from 'src/app/core/service/leftmenulist.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.sass']
})
export class PermissionComponent implements OnInit {
  public rolelist=[]
  public sidebarItems=[]
 constructor( public userservice:UsersService, public leftmenuservice:LeftmenulistService){}
 ngOnInit(): void {
  this.userservice.roleget().subscribe(res=>{
    console.log(res.data)
    this.rolelist=res.data
  },
  error=>{

  })

  this.leftmenuservice.getMenulist().subscribe(res=>{
    this.sidebarItems=res.data;
    console.log(this.sidebarItems)
  },

    error=>{

    })
   
 }

  
}
