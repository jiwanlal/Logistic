import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscanComponent } from './inscan/inscan.component';
import { DrsofdComponent } from './drsofd/drsofd.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DrspodComponent } from './drspod/drspod.component';

const routes: Routes = [ 
  {path:"inscan", component:InscanComponent},
  {path:"drsofd", component:DrsofdComponent},
  {path:"delivery", component:DeliveryComponent},
  {path:"drspod",component:DrspodComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
