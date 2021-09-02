import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { StockEditAddComponent } from './stock/stock-edit-add/stock-edit-add.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
      .then(mod => mod.AccountModule), data: { breadcrumb: { skip: true } }
  },
  {
    path: 'stock',
    canActivate:[AuthGuard],
    loadChildren: () => import('./stock/stock.module')
      .then(mod => mod.StockModule), data: { breadcrumb: { skip: true } }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
