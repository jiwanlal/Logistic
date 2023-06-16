import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscanComponent } from './inscan/inscan.component';

const routes: Routes = [ 
  {path:"inscan", component:InscanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
