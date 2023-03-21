import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { LocalityComponent } from './locality/locality.component';
import { PostalcodeComponent } from './postalcode/postalcode.component';
import { RegionComponent } from './region/region.component';
import { StateComponent } from './state/state.component';
import { ZoneComponent } from './zone/zone.component';

const routes: Routes = [
  {
    path: 'location', component:CountryComponent, redirectTo:'country'
  },
  {
    path: 'country', component:CountryComponent
  },
  {
    path: 'zone', component:ZoneComponent
  },
  {
    path: 'region', component:RegionComponent
  },
  {
    path: 'state', component:StateComponent
  },
  {
    path: 'city', component:CityComponent
  },
  {
    path: 'postalcode', component:PostalcodeComponent
  },
  {
    path: 'locality', component:LocalityComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoctionRoutingModule {}
