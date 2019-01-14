import {Builder, By} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import fs from 'fs';
import {readFile, writeFile, access} from '../fsPromise';
import {initializeCrawlList} from '../crawlList';
import {crawlListTraffic, checkAllTrafficSuccess} from '../similarweb';
import {exchangeListToCsvString} from '../csv';
import { sleep } from '../utility';

/**
 * Crawl exchanges.
 * @param {string} source exchanges source website
 * @return {string} the name of the file stored all the data
 */
async function crawlExchange(source) {
  let fileName = 'data/exchanges(2018-Dec)';
  let exchangeList;

  console.log('I am exchange crawler. Hi~');

  // check if exchangeList file already exist
  // if not, initialize it
  // if exist, read it from file
  try {
    console.log('Checking if ' + fileName + ' exist...');
    await access(fileName, fs.constants.F_OK);

    console.log(fileName + ' exist.');
    console.log('Read ' + fileName + ' into the crawler...');
    let data = await readFile(fileName, 'utf-8');
    exchangeList = JSON.parse(data);

    console.log('Read ' + fileName + ' success!');
  } catch (e) {
    console.log(fileName + ' doesn\'t exist.');

    exchangeList = initializeCrawlList(source);
    await writeFile(fileName, JSON.stringify(exchangeList, null, 2));
    console.log(fileName + ' created.');
  }

  const screen = {
    width: 2560,
    height: 1600,
  };

  // make chrome headless
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();
  // let driver = await new Builder().forBrowser('chrome').build();

  // if crawler haven't crawl exchangeList, crawl it
  if (!exchangeList.crawlerStatus.getList) {
    console.log('Crawler haven\'t crawled exchange list.');
    try {
      console.log('Crawling exchange list...');
      exchangeList.data = await crawlExchangeList(driver, source);
      exchangeList.crawlerStatus.getList = true;
      await writeFile(fileName, JSON.stringify(exchangeList, null, 2));
      console.log('Finish crawling exchange list.');
    } catch (e) {
      console.log('Error occurred when crawling exchange list.');
      console.error(e);
      await driver.close();
      process.exit(1);
    }
  }

  // if crawler haven't crawl traffic, crawl it
  if (!exchangeList.crawlerStatus.getTraffic) {
    console.log('Crawler haven\'t finish crawling traffic.');
    try {
      console.log('Crawling exchange traffic...');

      let getData = (exchangeList) => exchangeList.data;

      await crawlListTraffic(driver, exchangeList, getData, fileName);
      if (checkAllTrafficSuccess(exchangeList.data)) {
        exchangeList.crawlerStatus.getTraffic = true;
      }
      await writeFile(fileName, JSON.stringify(exchangeList, null, 2));
      console.log('Finish crawling exchange traffic. (some data might be incomplete).');
    } catch (e) {
      console.log('Error occurred when crawling traffic.');
      console.error(e);
      // await driver.close();
      process.exit(2);
    }
  }

  await driver.close();

  // if finish getting all data, convert it into csv format and output it
  if (exchangeList.crawlerStatus.getList && exchangeList.crawlerStatus.getTraffic) {
    try {
      console.log('Finish getting all data, output csv...');
      let csv = exchangeListToCsvString(exchangeList);
      await writeFile(fileName + '.csv', csv);
      console.log('Finish outputing csv.');
    } catch (e) {
      console.log('Error occurred when writing csv.');
      console.error(e);
      process.exit(3);
    }
  } else {
    console.log('Some job are still not done. But im going to rest now.');
    console.log('Restart me to finish those job.');
    process.exit(4);
  }

  console.log('Finish all jobs. I can rest now. :)');
  console.log('Bye~');
  return fileName;
}

/**
 * Crawl exchange list.
 * @param {object} driver Selenium web driver.
 * @param {object} source source website to get exchange list
 * @return {array} An array containing exchange list and their basic information.
 */
async function crawlExchangeList(driver, source) {
  let list;

  if (source === 'coinmarketcap.com') {
    list = await crawlExchangeListFromCMC(driver);
  } else {
    throw new Error('I don\'t know how to crawl exchange from ' + source + '.');
  }
  return list;
}


/**
 * Crawl exchanges from cmc.
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing exchange lists and their information.
 */
async function crawlExchangeListFromCMC(driver) {
  console.log('Crawling exchange from cmc...');

  let list = [];

  await driver.get('https://coinmarketcap.com/exchanges/volume/24-hour/all/');

  let trElements = await driver.findElements(By.css('tr[id]'));
  console.log('Total ' + trElements.length + ' exchanges.');

  for (let i=0; i<trElements.length; i++) {
    // get exchange name, rank, cmcUrl on cmc
    let exchange = {};
    let aElement = await trElements[i].findElement(By.css('a'));
    exchange.name = await aElement.getText();

    console.log('Crawling ' + exchange.name + ' basic info...');
    exchange.rank = i.toString();
    exchange.cmcUrl = await aElement.getAttribute('href');

    list.push(exchange);
  }

  for (let i=0; i<list.length; i++) {
    console.log('Crawling ' + list[i].name + ' url and trading volume...');
    let item = list[i];

    // get exchange url and trading volume on their own cmc page
    await driver.get(item.cmcUrl);

    await sleep(3000);

    let containerElement = await driver.findElement(By.css('div.col-xs-12'));
    let urlElement = await containerElement.findElement(By.css('a'));
    item.url = await urlElement.getAttribute('href');

    containerElement = await driver.findElement(By.css('div.text-left'));
    let tradeVolumeElement = await containerElement.findElement(By.css('span'));
    item.tradingVolume24hr = await tradeVolumeElement.getAttribute('data-usd');

    console.log(item);
  }

  // add exchange that is not on cmc
  let data = await readFile('src/exchange/exchangeList', 'utf-8');
  data = data.split('\n');
  for (let i=0; i<data.length; i++) {
    if (data[i] !== '') {
      let exchange = {};
      exchange.name = data[i];
      exchange.rank = '-';
      exchange.cmcUrl = '-';
      exchange.url = data[i];
      exchange.tradingVolume24hr = '-';

      list.push(exchange);
    }
  }

  return list;
}

export default crawlExchange;
