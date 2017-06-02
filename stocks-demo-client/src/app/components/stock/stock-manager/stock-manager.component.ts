import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StockService} from '../../../service/stock.service';
import {Observable} from 'rxjs/Observable';
import {Stock} from '../../../model/stock';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {

  stocks: Observable<Stock[]>;

  nameFilter: FormControl = new FormControl();

  keyword: string;

  constructor(public router: Router, public stockServer: StockService) { }

  ngOnInit() {
    this.stocks = this.stockServer.getStocks();
    this.nameFilter
      .valueChanges
      .debounceTime(500)
      .subscribe(value => this.keyword = value);
  }

  create() {
    this.router.navigateByUrl('/stock/0');
  }

  update(stock: Stock) {
    this.router.navigateByUrl('/stock/' + stock.id);
  }

}
