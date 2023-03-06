import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AwbIssueComponent } from './awb-issue/awb-issue.component';
import { AwbPurchaseComponent } from './awb-purchase/awb-purchase.component';
import { AwbSalesComponent } from './awb-sales/awb-sales.component';
import { AwbTypeComponent } from './awb-type/awb-type.component';
const routes: Routes = [
  { path:'awbtype',component:AwbTypeComponent},
  { path:'awbsales',component:AwbSalesComponent},
  { path:'awbpurchase',component:AwbPurchaseComponent},
  { path:'awbissue',component:AwbIssueComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class AwbStockRoutingModule {}
