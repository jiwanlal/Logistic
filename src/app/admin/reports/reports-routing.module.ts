import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { A2zreportComponent } from './a2zreport/a2zreport.component';


const routes: Routes = [
    {
        path: '', redirectTo: 'atoz', pathMatch: 'full',
      },
  {
    path: 'atoz', component:A2zreportComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
