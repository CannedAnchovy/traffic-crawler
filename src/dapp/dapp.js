import {Builder, until, By} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import fs from 'fs';
import {readFile, writeFile, access} from '../fsPromise';
import {initializeCrawlList} from '../crawlList';
import {crawlListTraffic, checkAllTrafficSuccess} from '../similarweb';
import { dappListToCsvString } from '../csv';
import { sleep } from '../utility';
const rankNum = 100;

/**
 * Crawl dapp.
 * @param {string} source exchanges source website
 * @return {string} the name of the file stored all the data
 */
async function crawlDapp(source) {
  let fileName = 'data/dapp(2018-Dec)';
  let dappList;

  console.log('I am dapp crawler. Hi~');

  // check if dappList file already exist
  // if not, initialize it
  // if exist, read it from file
  try {
    console.log('Checking if ' + fileName + ' exist...');
    await access(fileName, fs.constants.F_OK);

    console.log(fileName + ' exist.');
    console.log('Read ' + fileName + ' into the crawler...');
    let data = await readFile(fileName, 'utf-8');
    dappList = JSON.parse(data);

    console.log('Read ' + fileName + ' success!');
  } catch (e) {
    console.log(fileName + ' doesn\'t exist.');

    dappList = initializeCrawlList(source);
    await writeFile(fileName, JSON.stringify(dappList, null, 2));
    console.log(fileName + ' created.');
  }

  const screen = {
    width: 2560,
    height: 1600,
  };

  // make chrome headless
  // let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();
  let driver = await new Builder().forBrowser('chrome').build();

  // if crawler haven't crawl dappList, crawl it
  if (!dappList.crawlerStatus.getList) {
    console.log('Crawler haven\'t crawled dapp list.');
    try {
      console.log('Crawling dapp list...');
      dappList.data = await crawlDappList(driver, source);
      dappList.crawlerStatus.getList = true;
      await writeFile(fileName, JSON.stringify(dappList, null, 2));
      console.log('Finish crawling dapp list.');
    } catch (e) {
      console.log('Error occurred when crawling dapp list.');
      console.error(e);
      await driver.close();
      process.exit(1);
    }
  }

  // if crawler haven't crawl traffic, crawl it
  if (!dappList.crawlerStatus.getTraffic) {
    console.log('Crawler haven\'t finish crawling traffic.');
    try {
      console.log('Crawling dapp traffic...');

      let getData = (dappList) => dappList.data;

      await crawlListTraffic(driver, dappList, getData, fileName);
      if (checkAllTrafficSuccess(dappList.data)) {
        dappList.crawlerStatus.getTraffic = true;
      }
      await writeFile(fileName, JSON.stringify(dappList, null, 2));
      console.log('Finish crawling dapp traffic. (some data might be incomplete).');
    } catch (e) {
      console.log('Error occurred when crawling traffic.');
      console.error(e);
      // await driver.close();
      process.exit(2);
    }
  }

  await driver.close();

  // if finish getting all data, convert it into csv format and output it
  if (dappList.crawlerStatus.getList && dappList.crawlerStatus.getTraffic) {
    try {
      console.log('Finish getting all data, output csv...');
      let csv = dappListToCsvString(dappList);
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
 * Crawl dapp list.
 * @param {object} driver Selenium web driver.
 * @param {object} source source website to get exchange list
 * @return {array} An array containing exchange list and their basic information.
 */
async function crawlDappList(driver, source) {
  let list;

  if (source === 'dappradar.com/rankings') {
    list = await crawlDappListFromDappradar(driver);
  } else {
    throw new Error('I don\'t know how to crawl dapp from ' + source + '.');
  }
  return list;
}


/**
 * Crawl exchanges from cmc.
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing exchange lists and their information.
 */
async function crawlDappListFromDappradar(driver) {
  console.log('Crawling exchange from dapp radar...');

  let list = [];

  await driver.get('https://dappradar.com/rankings');

  console.log('Total ' + rankNum + ' dapps to be crawled.');
  await sleep(3000);


  for (let i=0; i<rankNum/50; i++) {
    let rowElements = await driver.findElements(By.css('div.flex-body.flex-row'));

    // get dapp data

    for (let j=1; j<51; j++) {
      let dapp = {};
      let colElements = await rowElements[j].findElements(By.css('div.column-flex'));

      // get name
      let aElement = await colElements[1].findElement(By.css('a'));
      dapp.name = await aElement.getAttribute('title');

      console.log('Crawling ' + dapp.name + '\'s data...');

      // get rank
      dapp.rank = await colElements[0].getText();

      // get url on dapp radar
      dapp.radarUrl = await aElement.getAttribute('href');

      // get category
      let spanElement = await colElements[2].findElement(By.css('span'));
      dapp.category = await spanElement.getText();

      // get chain
      let divElement = await colElements[3].findElement(By.css('div'));
      let text = await divElement.getText();
      dapp.chain = text.trim();

      // get balance
      let spanElements = await colElements[4].findElements(By.css('span'));
      dapp.balance = await spanElements[1].getText();

      // get user24
      spanElement = await colElements[5].findElement(By.css('span'));
      dapp.user24h = await spanElement.getText();

      // get volume24
      divElement = await colElements[6].findElement(By.css('div'));
      divElement = await divElement.findElement(By.css('div'));
      dapp.volume24h = await divElement.getText();

      // get volume7d
      divElement = await colElements[7].findElement(By.css('div'));
      divElement = await divElement.findElement(By.css('div'));
      dapp.volume7d = await divElement.getText();

      // get tx24
      spanElement = await colElements[8].findElement(By.css('span'));
      dapp.tx24h = await spanElement.getText();

      // get tx7d
      spanElement = await colElements[9].findElement(By.css('span'));
      dapp.tx7d = await spanElement.getText();

      console.log(dapp);
      list.push(dapp);
    }

    let nextPageButtonElement = await driver.findElement(By.css('a#next'));
    await nextPageButtonElement.click();
    await sleep(3000);
  }

  for (let i=0; i<list.length; i++) {
    console.log('Crawling ' + list[i].name + ' url...');
    let item = list[i];

    // get exchange url and trading volume on their own cmc page
    await driver.get(item.radarUrl);
    await sleep(3000);
    let divElement = await driver.wait(until.elementLocated(By.css('div.dapp-links')));
    let aElement = await divElement.findElement(By.css('a'));
    let url = await aElement.getAttribute('href');

    item.url = url;

    /* await driver.get(url);
    await sleep(3000);

    item.url = await driver.getCurrentUrl();*/

    console.log(item);
  }

  return list;
}

export default crawlDapp;
