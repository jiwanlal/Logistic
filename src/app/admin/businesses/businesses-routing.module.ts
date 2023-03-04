import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './branch/branch.component';
import { BusinessesTypeComponent } from './businesses/businesses-type.component';
import { CreateofficeComponent } from './createoffice/createoffice.component';

const routes: Routes = [
{ path: '', component:BusinessesTypeComponent, redirectTo:'business' },
{ path: 'business', component:BusinessesTypeComponent },
  
{ path: 'branch', component:BranchComponent},
  
{ path: 'office', component:CreateofficeComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessesRoutingModule {}