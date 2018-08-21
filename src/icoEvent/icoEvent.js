import {Builder, By} from 'selenium-webdriver';
import fs from 'fs';
import util from 'util';
import {signInSimilarWeb, getTraffic} from '../similarweb';
import {getMillion, getDateByDayLeft, getDateFromStrMonth, getDomainName} from '../utility';
import toCsv from './csv';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const access = util.promisify(fs.access);

/**
 * Crawl ico event.
 * @param {string} source ico event source website
 * @return {number} process execute status
 */
async function crawlICO(source) {
  /* let data = await readFile('data/icoEvent(icodrops.com)', 'utf-8');
  let icoEventList = JSON.parse(data);
  icoEventList = transform(icoEventList);
  await writeFile('data/icoEvent(icodrops.com)', JSON.stringify(icoEventList)); */

  let fileName = 'data/icoEvent(' + source + ')';
  let icoEventList;

  console.log('I am ico crawler. Hi~');

  // check if ico event file already exist
  // if not, initialize it
  // if exist, read it from file
  try {
    console.log('Checking if ' + fileName + ' exist...');
    await access(fileName, fs.constants.F_OK);

    console.log(fileName + ' exist.');
    console.log('Read ' + fileName + ' into the crawler...');
    let data = await readFile(fileName, 'utf-8');
    icoEventList = JSON.parse(data);
    console.log('Read ' + fileName + ' success!');
  } catch (e) {
    console.log(fileName + ' doesn\'t exist.');
    icoEventList = initializeIcoEventList(source);
  }

  let driver = await new Builder().forBrowser('chrome').build();

  // if crawler haven't crawl icoEventList, crawl it
  if (!icoEventList.crawlerStatus.getEventList) {
    console.log('Crawler haven\'t crawled event list.');
    try {
      console.log('Crawling ico event list...');
      icoEventList.data = await crawlICOEvent(driver, source);
      icoEventList.crawlerStatus.getEventList = true;
      await writeFile(pathName, JSON.parse(icoEventList));
      console.log('Finish crawling ico event list.');
    } catch (e) {
      console.log('Error occurred when crawling event list.');
      console.error(e);
      return 1;
    }
  }

  // if crawler haven't crawl traffic, crawl it
  if (!icoEventList.crawlerStatus.getTraffic) {
    console.log('Crawler haven\'t finish crawling traffic.');
    try {
      console.log('Crawling ico event traffic...');
      await crawlICOEventTraffic(driver, icoEventList, fileName);
      if (checkAllTrafficSuccess(icoEventList)) {
        icoEventList.crawlerStatus.getTraffic = true;
      }
      await writeFile(fileName, JSON.stringify(icoEventList));
      console.log('Finish crawling ico event traffic. (some data might be incomplete).');
    } catch (e) {
      console.log('Error occurred when crawling event list.');
      console.error(e);
      return 2;
    }
  }

  // if finish getting all data, convert it into csv format and output it
  if (icoEventList.crawlerStatus.getEventList && icoEventList.crawlerStatus.getTraffic) {
    try {
      console.log('Finish getting all data, output csv...');
      let csv = toCsv(icoEventList);
      await writeFile(fileName + '.csv', csv);
      console.log('Finish outputing csv.');
    } catch (e) {
      console.log('Error occurred when writing csv.');
      console.error(e);
      return 3;
    }
  } else {
    console.log('Some job are still not done. But im going to rest now.');
    console.log('Restart me to finish those job.');
    return 4;
  }

  console.log('Finish all jobs. I can rest now. :)');
  console.log('Bye~');
  return 0;
}

/**
 * Initialize a ico Event file that store ico event data and crawler's basic info and current status
 * @param {string} source ico event source website
 * @return {object} initial icoEventList data structure
 */
function initializeIcoEventList(source) {
  console.log('Initializing icoEventList...');
  let object = {
    from: source,
    crawlerStatus: {
      getEventList: false,
      getTraffic: false,
    },
    data: [],
  };
  return object;
}

/**
 * Crawl ICO event.
 * @param {object} driver Selenium web driver.
 * @param {object} source source website to get ico event
 * @return {object} An object containing current data status and ICO event list and its information.
 */
async function crawlICOEvent(driver, source) {
  let icoEventList;

  if (source === 'icodrops.com') {
    icoEventList = await crawlICOEventFromICODrop(driver);
  }
  return icoEventList;
}

/**
 * Crawl ICO event from ICO drops.
 * @param {object} driver Selenium web driver.
 * @return {object} An object containing ICO event list and its information.
 */
async function crawlICOEventFromICODrop(driver) {
  let icoEventList = [];
  const genre = ['active', 'ended'];

  for (let i=0; i<genre.length; i++) {
    console.log('Crawling ' + genre[i] + ' ico event from icodrops.com...');

    // get ico elements
    await driver.get(`https://icodrops.com/category/${genre[i]}-ico/`);
    let parentElement = await driver.findElement(By.css('div.all'));
    let icoElements = await parentElement.findElements(By.css('div.a_ico'));
    console.log('Total ' + icoElements.length + ' ' + genre[i] + ' ICO event.');

    // get ico event info (name, status, icoUrl, raised)
    for (let j=0; j<icoElements.length; j++) {
      let icoEvent = {};
      icoEvent.status = genre[i];

      try {
        // get ico event name
        let mainInfoElement = await icoElements[j].findElement(By.css('div.ico-main-info'));
        let nameElement = mainInfoElement.findElement(By.css('a'));
        icoEvent.name = await nameElement.getText();
        console.log('Crawling ' + icoEvent.name + ' name and raised money...');

        // get ico website url (not project website url)
        icoEvent.icoUrl = await nameElement.getAttribute('href');

        // get ico event raised money
        let raisedElement = await icoElements[j].findElement(By.css('div#new_column_categ_invisted')).findElement(By.css('span'));
        let raised = getMillion(await raisedElement.getText());
        icoEvent.raised = (isNaN(raised))? 'pending' : raised;
        // console.log(icoEvent.raised);
      } catch (e) {
        console.error(e);
      }
      // store icoEvent object in icoEventList
      icoEventList.push(icoEvent);
    }
  }

  // get each ico event end date and website url from their icoUrl page
  for (let i=0; i<icoEventList.length; i++) {
    let icoEvent = icoEventList[i];
    let year = 2018;
    let lastMonthString = '';

    try {
      console.log('Crawling ' + icoEvent.name + ' website url and end date...');
      await driver.get(icoEvent.icoUrl);

      // get ico event website url
      let linkElement = await driver.findElement(By.css('div.ico-right-col')).findElement(By.css('a'));
      let url = await linkElement.getAttribute('href');
      icoEvent.url = url;

      // get ico event end date
      let dateElement = await driver.findElement(By.css('div.sale-date'));
      let dateString;

      // Active ico event has two kinds of date format,
      // one is how many days left (12 days left)
      // the other is string month (15 Aug)
      // this part parse this two kinds of date format into YYYY/MM/DD
      if (icoEvent.status === 'active') {
        dateString = await dateElement.findElement(By.css('strong')).getText();
        if (dateString === 'IS ACTIVE') dateString = 'TBA';
        else {
          dateString = (dateString.split(' '))[0];
          dateString = getDateByDayLeft(Number(dateString));
        }
      } else if (icoEvent.status === 'ended') {
        dateString = await dateElement.getText();
        let dateArray = dateString.split(' ');

        // check if cross year
        if (lastMonthString === 'Jan' && dateArray[1] === 'Dec') year -= 1;

        dateString = getDateFromStrMonth(year, dateArray[1], Number(dateArray[0]));
        lastMonthString = dateArray[1];
      }
      icoEvent.endDate = dateString;
      icoEvent.traffic = {success: false};
    } catch (e) {
      console.error(e);
    }
  }
  return icoEventList;
}

/**
 * Crawl ICO event traffic from similarweb and modify icoEventList directly.
 * @param {object} driver Selenium web driver.
 * @param {object} icoEventList An object containing ICO event information.
 * @param {string} fileName output fileName
 */
async function crawlICOEventTraffic(driver, icoEventList, fileName) {
  console.log('Crawl traffic from similar web...');

  let icoEvent;
  await signInSimilarWeb(driver);

  for (let i=0; i<icoEventList.data.length; i++) {
    console.log(i);

    if (icoEventList.data[i].hasOwnProperty('traffic') && icoEventList.data[i].traffic.success) continue;
    icoEvent = icoEventList.data[i];

    console.log('Crawl ' + icoEvent.name + ' traffic...');
    icoEvent.traffic = await getTraffic(driver, getDomainName(icoEvent.url));
    await writeFile(fileName, JSON.stringify(icoEventList));
  }
}

/**
 * Check if all ico event finish getting traffic data
 * @param {object} icoEventList An object containing ICO event information.
 * @return {bool} whether all ico event finish getting traffic data
 */
function checkAllTrafficSuccess(icoEventList) {
  for (let i=0; i<icoEventList.data.length; i++) {
    if (!icoEventList.data[i].hasOwnProperty('traffic') || !icoEventList.data[i].traffic.success) {
      return false;
    }
  }
  return true;
}

/**
 * transform
 * @param {object} icoEventList An object containing ICO event information.
 * @return {objec}  An object containing ICO event information.
 */
function transform(icoEventList) {
  let newIcoEventList = {};
  console.log('hi');
  console.log(icoEventList);
  newIcoEventList.source = 'icodrops.com';
  newIcoEventList.crawlerStatus = {
    getEventList: icoEventList.getEventList,
    getTraffic: icoEventList.getTraffic,
  };
  newIcoEventList.data = icoEventList.data;
  return newIcoEventList;
}

export default crawlICO;
