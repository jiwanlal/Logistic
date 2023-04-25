import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AwbsearchRoutingModule } from './awbsearch-routing.module';
import { AwbsearchComponent } from './awbsearch.component';


@NgModule({
  declarations: [
    AwbsearchComponent
  ],
  imports: [
    CommonModule,
    AwbsearchRoutingModule
  ]
})
export class AwbsearchModule { }
