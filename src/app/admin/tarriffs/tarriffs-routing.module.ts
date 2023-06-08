import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationTarrifComponent } from './location-tarrif/location-tarrif.component';
import { ContractComponent } from './contract/contract.component';
import { RateTarrifComponent } from './rate-tarrif/rate-tarrif.component';

const routes: Routes = [  { path:'custfran/loctarf',component:LocationTarrifComponent},
{path:'custfran/custarf',component:ContractComponent},
{path:'custfran/rattarf',component:RateTarrifComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeTarriffsRoutingModule { }
