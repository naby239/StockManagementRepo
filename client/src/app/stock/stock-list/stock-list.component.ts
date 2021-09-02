import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Pagination } from 'src/app/shared/models/pagination';
import { StockImage } from 'src/app/shared/models/stockImage';
import { StockItem } from 'src/app/shared/models/stockItem';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stockItems: Array<StockItem>;
  pagination: Pagination;
  pageNumber = 1;
  pazeSize = 6;

  searchText :string;

  sortSelected = 'costPriceAsc'
  sortOptions = [
    { name: 'Cost Price: Low to High', value: 'costPriceAsc' },
    { name: 'Cost Price: High to low', value: 'costPriceDesc' },
    { name: 'Retail Price: Low to High', value: 'retailPriceAsc' },
    { name: 'Retail Price: High to low', value: 'retailPriceDesc' },
    { name: 'Model year: Low to High', value: 'modelYearAsc' },
    { name: 'Model year: High to low', value: 'modelYearDesc' }
  ]
  constructor(private stockService: StockService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getStockItems();
  }

  public getStockItems() {
    this.stockService.getStock(this.pageNumber, this.pazeSize, this.sortSelected,this.searchText).subscribe(res => {
      if (res) {
        this.stockItems = res.result;
        this.pagination = res.pagination;
        console.log(this.pagination);
      }
    });
  }

  public getImage(images: StockImage[]) {
    if (images.length > 0) {
      let objectURL = 'data:image/png;base64,' + images[0].imageData;
      let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      return image;
    }
  }

  public pageChanged(event: any) {
    this.pageNumber = event.page;
    this.getStockItems();
  }

  public onSortSelected(sort: string) {
    console.log(sort)
    this.sortSelected = sort;
    this.getStockItems();
  }

  public onSearch(searchText: string) {
    console.log(searchText);
    this.searchText = searchText;
    this.getStockItems()
  }

}
