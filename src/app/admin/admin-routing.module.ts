import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'location',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./location/location.module').then((m) => m.LocationModule),
  },
  {
    path: 'businesses',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./businesses/businesses.module').then((m) => m.BusinessesModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'awb',
    canActivate: [AuthGuard],
    // data: {
    //   role: Role.Admin,
    // },
    loadChildren: () =>
      import('./awb-stock/awb-stock.module').then((m) => m.AwbStockModule),
  },
  {
    path: 'transaction',
    canActivate: [AuthGuard],
    // data: {
    //   role: Role.Admin,
    // },
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: 'transaction',
    canActivate: [AuthGuard],
    // data: {
    //   role: Role.Admin,
    // },
    loadChildren: () =>
      import('./transaction/transaction.module').then((m) => m.TransactionModule),
  },
  { path: 'search', loadChildren: () => import('./awbsearch/awbsearch.module').then(m => m.AwbsearchModule) },
  { path: 'tarriffs', loadChildren: () => import('./tarriffs/tarriffs.module').then(m => m.TreeTarriffsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
