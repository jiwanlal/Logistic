import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwbsearchRoutingModule } from './awbsearch-routing.module';
import { AwbsearchComponent } from './awbsearch.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AwbsearchComponent
  ],
  imports: [
    CommonModule,
    AwbsearchRoutingModule,
    MatCheckboxModule,
    MatIconModule

  ]
})
export class AwbsearchModule { }
