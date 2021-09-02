import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StockImage } from 'src/app/shared/models/stockImage';
import { StockItem } from 'src/app/shared/models/stockItem';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {
  @Input() stockItem: StockItem;
  constructor(private sanitizer: DomSanitizer,private stockService:StockService) { }

  ngOnInit(): void {
  }

  public getImage(images : StockImage[])
  {
    if (images.length>0) {
      let objectURL = 'data:image/png;base64,' + images[0].imageData;
      let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      return image;
    }
  }

  public deleteStockItem(id: number){
    this.stockService.deleteStockItem(id).subscribe(res => {

    });
  }

}
