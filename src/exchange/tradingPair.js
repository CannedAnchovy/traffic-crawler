import {Builder, By} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import {writeFile} from '../fsPromise';

/**
 * Crawl top 5 trading pairs of all exchanges
 */
export default async function main() {
  let string = '';

  const screen = {
    width: 2560,
    height: 1600,
  };

  // make chrome headless
  // let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();
  let driver = await new Builder().forBrowser('chrome').build();

  await driver.get('https://coinmarketcap.com/exchanges/volume/24-hour/');

  let trElements = await driver.findElements(By.css('tr'));
  let exchangeElements = await driver.findElements(By.css('tr[id]'));
  let currentIndex = 0;

  console.log('Total ' + exchangeElements.length + ' exchanges.');

  for (let i=0; i<exchangeElements.length; i++) {
    // get current exchange td index
    while (true) {
      let id = await trElements[currentIndex].getAttribute('id');
      if (id !== '') break;

      currentIndex += 1;
    }

    // get exchange name on cmc
    let data = [];
    let aElement = await trElements[currentIndex].findElement(By.css('a'));
    let name = await aElement.getText();
    data.push(name);

    console.log('Crawling ' + name + ' trading pairs...');

    // skip the table header row
    currentIndex += 2;

    // extract trading pair information
    for (let i=0; i<10; i++) {
      let tradingPairElement = trElements[currentIndex + i];
      let tdElements = await tradingPairElement.findElements(By.css('td'));

      // current td isn't trading pair
      if (tdElements.length !== 6) break;

      // get trading pair name
      let tradingPairNameElement = await tdElements[2].findElement(By.css('a'));
      let tradingPairName = await tradingPairNameElement.getText();
      console.log(tradingPairName);
      data.push(tradingPairName);

      // get trading pair volume
      data.push('\"' + await tdElements[3].getText() + '\"');
    }

    string += data.join(',');
    string += '\n';
  }

  await writeFile('data/tradingPairs.csv', string);
}
