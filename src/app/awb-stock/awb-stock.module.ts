import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwbTypeComponent } from './awb-type/awb-type.component';
import { NgScrollbarModule } from "ngx-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { ComponentsModule } from "../shared/components/components.module";
import { SharedModule } from '../shared/shared.module';
import { AwbStockRoutingModule } from './awb-stock-routing.module';
import { AddAwbTypeComponent } from './dialog/add-awb-type/add-awb-type.component';
import { AwbSalesComponent } from './awb-sales/awb-sales.component';
import { AwbPurchaseComponent } from './awb-purchase/awb-purchase.component';
import { AwbIssueComponent } from './awb-issue/awb-issue.component';
import { AddAwbSaleComponent } from './dialog/add-awb-sale/add-awb-sale.component';
import { AddAwbPurchaseComponent } from './dialog/add-awb-purchase/add-awb-purchase.component';
import { AddAwbIssueComponent } from './dialog/add-awb-issue/add-awb-issue.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AwbTypeComponent,
    AddAwbTypeComponent,
    AwbSalesComponent,
    AwbPurchaseComponent,
    AwbIssueComponent,
    AddAwbSaleComponent,
    AddAwbPurchaseComponent,
    AddAwbIssueComponent
  ],
  imports: [
    CommonModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    NgScrollbarModule,
    MatIconModule,
    MatButtonModule,
    ComponentsModule,
    SharedModule,
    AwbStockRoutingModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
  ]
})
export class AwbStockModule { }
