import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { RolesComponent } from './roles/roles.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserTypeComponent } from './user-type/user-type.component';

const routes: Routes = [
{ path: '', component:UserTypeComponent  },
{ path: 'user', component:UserTypeComponent},
{ path: 'createuser', component:CreateuserComponent},
{ path: 'role', component:RolesComponent},
{ path: 'profile', component:UserProfileComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}