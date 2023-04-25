import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwbsearchComponent } from './awbsearch.component';

const routes: Routes = [{ path: '', component: AwbsearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwbsearchRoutingModule { }
