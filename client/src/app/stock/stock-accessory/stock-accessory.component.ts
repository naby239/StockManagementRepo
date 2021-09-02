import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockAccessory } from 'src/app/shared/models/stockAccessory';

@Component({
  selector: 'app-stock-accessory',
  templateUrl: './stock-accessory.component.html',
  styleUrls: ['./stock-accessory.component.scss']
})
export class StockAccessoryComponent implements OnInit {
  name: string = "";
  description: string = "";
  @Input() editStockAccessory: StockAccessory;
  @Output() addStockAccessory: EventEmitter<StockAccessory> = new EventEmitter<StockAccessory>();
  @Output() editStockAccessoryEvent: EventEmitter<StockAccessory> = new EventEmitter<StockAccessory>();
  @Output() cancelAccessoryAdd = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    if (this.editStockAccessory) {
      this.name = this.editStockAccessory.name;
      this.description = this.editStockAccessory.description;
    }
  }

  public setName(event) {
    this.name = event.target.value;
  }

  public setDescription(event) {
    this.description = event.target.value;
  }


  public addAccessory() {
    let stockImageToAdd: StockAccessory = {
      name: this.name,
      description: this.description
    };

    if (this.editStockAccessory === undefined) {      
    this.addStockAccessory.emit(stockImageToAdd)
    }
    else{
      this.editStockAccessoryEvent.emit(stockImageToAdd);
    }
  }

  public cancel() {
    this.cancelAccessoryAdd.emit()
  }
}
