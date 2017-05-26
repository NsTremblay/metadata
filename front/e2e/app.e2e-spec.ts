import { MetadataPage } from './app.po';

describe('metadata App', () => {
  let page: MetadataPage;

  beforeEach(() => {
    page = new MetadataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
