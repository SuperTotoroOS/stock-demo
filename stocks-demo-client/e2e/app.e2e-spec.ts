import { StocksDemoPage } from './app.po';

describe('stocks-demo App', () => {
  let page: StocksDemoPage;

  beforeEach(() => {
    page = new StocksDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
