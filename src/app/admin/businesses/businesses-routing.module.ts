import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { BranchComponent } from './branch/branch.component';
import { BusinessesTypeComponent } from './businesses/businesses-type.component';
import { CreateofficeComponent } from './createoffice/createoffice.component';

const routes: Routes = [
{ path: '', component:BusinessesTypeComponent},
{ path: 'business', component:BusinessesTypeComponent },
  
{ path: 'branch', component:BranchComponent},
  
{ path: 'office', component:CreateofficeComponent },
{ path: '**', component: Page404Component },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessesRoutingModule {}