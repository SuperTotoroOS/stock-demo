/**
 * Created by yangyunqi on 2017/6/1.
 */
import * as express from 'express';
import * as path from 'path';
import {Server} from 'ws';

export class Stock {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>
    ) {}
}

const stocks: Stock[] = [
  new Stock(1, '第一只股票', 1.99, 1.5, '这是第一只股票', ['IT']),
  new Stock(2, '第二只股票', 2.99, 2.5, '这是第二只股票', ['IT', '互联网']),
  new Stock(3, '第三只股票', 3.99, 3.5, '这是第三只股票', ['IT', '互联网', '金融']),
  new Stock(4, '第四只股票', 4.99, 4.5, '这是第四只股票', ['IT', '互联网']),
  new Stock(5, '第五只股票', 5.99, 5.0, '这是第五只股票', ['IT']),
  new Stock(6, '第六只股票', 6.99, 4.0, '这是第六只股票', ['IT']),
  new Stock(7, '第七只股票', 7.99, 3.0, '这是第七只股票', ['IT', '互联网']),
  new Stock(8, '第八只股票', 8.99, 2.0, '这是第八只股票', ['IT', '互联网', '金融']),
  new Stock(9, '第九只股票', 9.99, 1.0, '这是第九只股票', ['IT', '互联网']),
  new Stock(0, '第十只股票', 10.99, 0.5, '这是第十只股票', ['IT']),
];

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.get('/api/stocks', (req, res) => {
    let result = stocks;
    if (req.params.name) {
        result = result.filter(stock => stock.name.indexOf(req.params.name) != -1);
    }
    res.json(result)
});

app.get('/api/stocks/:id', (req, res) => {
    res.json(stocks.find(stock => stock.id == req.params.id))
});

const server = app.listen(8000, 'localhost', () => {
    console.log('服务器已经启动, 地址是http://localhost:8000')
});

let subscriptions = new Set<any>();

const wsServer = new Server({port: 8085});
wsServer.on('connection', webSocket => {
    subscriptions.add(webSocket);
});

let messageCount = 0;

setInterval(() => {
    subscriptions.forEach(ws => {
        if(ws.readyState == 1) {
            ws.send(JSON.stringify({messageCount : messageCount++}));
        } else {
            subscriptions.delete(ws);
        }
    })
}, 2000);
