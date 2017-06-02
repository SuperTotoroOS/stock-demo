import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import 'rxjs/Rx.js';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css']
})
export class ContentWrapperComponent implements OnInit {

  pageTitle = '';
  pageDesc = '';

  constructor(public router: Router) {
    router
      .events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/dashboard') {
          this.pageTitle = '首页';
          this.pageDesc = '这是一个首页';
        } else if (event.url.startsWith('/stock')) {
          this.pageTitle = '列表页';
          this.pageDesc = '用于增删改查';
        }
      });
  }

  ngOnInit() {
  }

}
