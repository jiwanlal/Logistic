import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscanComponent } from './inscan/inscan.component';
import { DrsofdComponent } from './drsofd/drsofd.component';

const routes: Routes = [ 
  {path:"inscan", component:InscanComponent},
  {path:"drsofd", component:DrsofdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
