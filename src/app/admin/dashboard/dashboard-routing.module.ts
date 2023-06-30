
import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { PurchasesdashboardComponent } from "./purchasesdashboard/purchasesdashboard.component";
import { OperationsdashboardComponent } from "./operationsdashboard/operationsdashboard.component";
import { AccountsdashboardComponent } from "./accountsdashboard/accountsdashboard.component";
import { SalesdashboardComponent } from "./salesdashboard/salesdashboard.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "sales",
    pathMatch: "full",
  },
  {
    path: "sales",
    component: SalesdashboardComponent,
  },

  {
    path: "purchases",
    component: PurchasesdashboardComponent,
  },
  {
    path: "operations",
    component: OperationsdashboardComponent,
  },
  {
    path: "accounts",
    component: AccountsdashboardComponent,
  },
  
  
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
