import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgScrollbarModule } from "ngx-scrollbar";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MainComponent } from "./main/main.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { SalesdashboardComponent } from './salesdashboard/salesdashboard.component';
import { OperationsdashboardComponent } from './operationsdashboard/operationsdashboard.component';
import { PurchasesdashboardComponent } from './purchasesdashboard/purchasesdashboard.component';
import { AccountsdashboardComponent } from './accountsdashboard/accountsdashboard.component';
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [MainComponent, Dashboard2Component, SalesdashboardComponent, OperationsdashboardComponent, PurchasesdashboardComponent, AccountsdashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    NgApexchartsModule,
    NgScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    ComponentsModule,
    MatTabsModule,
    SharedModule,
    

  ],
})
export class DashboardModule {}
