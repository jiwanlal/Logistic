import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchTypeComponent } from './branch-type/branch-type.component';
import { BusinessesTypeComponent } from './businesses-type/businesses-type.component';
import { CreateofficeComponent } from './createoffice/createoffice.component';

const routes: Routes = [
{ path: '', component:BusinessesTypeComponent, redirectTo:'businesses-type' },
{ path: 'businesses-type', component:BusinessesTypeComponent },
  
{ path: 'branch-type', component:BranchTypeComponent},
  
{ path: 'office', component:CreateofficeComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessesRoutingModule {}