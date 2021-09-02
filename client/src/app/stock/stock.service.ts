import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult, Pagination } from '../shared/models/pagination';
import { StockItem } from '../shared/models/stockItem';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<StockItem[]> = new PaginatedResult<StockItem[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getTokenFromLocalStorage(){
    return localStorage.getItem('token');
  }
  getStock(page?: number, itemsPerPage?:number, sortSelected?:string, searchText?: string) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    console.log(sortSelected);
    if (sortSelected) {
      params = params.append('orderBy', sortSelected);
    }
    if (searchText) {
      params = params.append('searchText', searchText);
    }
    const token = this.getTokenFromLocalStorage();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.baseUrl + 'stock/GetStock',{headers,observe:'response',params}).pipe(map( response =>{
      
      this.paginatedResult.result = response.body.data;
      this.paginatedResult.pagination = response.body;
      return this.paginatedResult;
    }));
  }
  getStockItem(id:number) {
    const token = this.getTokenFromLocalStorage();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.baseUrl + 'stock/getStockItem'+id,{headers});
  }

  addStockItem(stockItem:StockItem){
    const token = this.getTokenFromLocalStorage();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post(this.baseUrl + 'stock/addStockItem',stockItem,{headers});
  }
  updateStockItem(stockItem:StockItem){
    const token = this.getTokenFromLocalStorage();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post(this.baseUrl + 'stock/updateStockItem',stockItem,{headers});
  }
  
  deleteStockItem(id:number){
    const token = this.getTokenFromLocalStorage();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post(this.baseUrl + 'stock/deleteStockItem',id,{headers});
  }
}
