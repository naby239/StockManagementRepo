import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockEditAddComponent } from './stock-edit-add/stock-edit-add.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockItemComponent } from './stock-item/stock-item.component';
import { SharedModule } from '../shared/shared.module';
import { StockImageComponent } from './stock-image/stock-image.component';
import { StockAccessoryComponent } from './stock-accessory/stock-accessory.component';



@NgModule({
  declarations: [StockListComponent, StockEditAddComponent, StockItemComponent, StockImageComponent, StockAccessoryComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule
  ]
})
export class StockModule { }
