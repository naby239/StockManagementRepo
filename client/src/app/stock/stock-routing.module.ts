import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StockEditAddComponent } from './stock-edit-add/stock-edit-add.component';
import { StockListComponent } from './stock-list/stock-list.component';
const routes: Routes = [
  {path: 'editadd', component: StockEditAddComponent},
  {path: 'editadd/:id', component: StockEditAddComponent},
  {path: 'list', component: StockListComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StockRoutingModule { }
