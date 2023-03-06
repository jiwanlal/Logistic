import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AwbIssueComponent } from './awb-issue/awb-issue.component';
import { AwbPurchaseComponent } from './awb-purchase/awb-purchase.component';
import { AwbSalesComponent } from './awb-sales/awb-sales.component';
import { AwbTypeComponent } from './awb-type/awb-type.component';
const routes: Routes = [
  { path:'type',component:AwbTypeComponent},
  { path:'sale',component:AwbSalesComponent},
  { path:'purchase',component:AwbPurchaseComponent},
  { path:'issue',component:AwbIssueComponent},
  // { path:'in',component:AwbIssueComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class AwbStockRoutingModule {}
