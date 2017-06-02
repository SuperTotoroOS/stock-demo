import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Stock} from '../model/stock';

@Injectable()
export class StockService {

  constructor(public http: Http) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get('/api/stocks').map(res => res.json());
  }

  getStock(id: number): Observable<Stock> {
    return this.http.get('/api/stocks/' + id).map(res => res.json());
  }

}
