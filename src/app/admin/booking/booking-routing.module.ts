import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ManifestComponent } from './manifest/manifest.component';

const routes: Routes = [
  { path:'booking',component:BookingComponent},
  { path:'manifest',component:ManifestComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class BookingRoutingModule {}
