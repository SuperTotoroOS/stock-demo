import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {WebSocketService} from '../../service/web-socket.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  title = environment.appTitle;

  messageCount = 0;

  constructor(public webSocketServer: WebSocketService) { }

  ngOnInit() {
    this.webSocketServer
      .createObservableSocket('ws://localhost:8085')
      .map(event => JSON.parse(event))
      .subscribe(
        event => this.messageCount = event.messageCount
      );
  }

}
