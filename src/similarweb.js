import {By, until, Key} from 'selenium-webdriver';
import config from '../../similarweb.json';
import {writeFile} from './fsPromise';
import {sleep, getDomainName, getGoogle2faToken} from './utility';

const waitTime = 5000;
let timeInterval = '1m';

/**
 * Sign in to similarweb with username and password in config
 * @param {object} driver Selenium web driver.
 * @param {string} type 'similarweb' or 'google'
 */
async function signInSimilarWeb(driver, type) {
  console.log('Logging in to SimilarWeb...');

  await driver.get('https://account.similarweb.com/login');

  if (type === 'similarweb') {
    // Enter username and password
    let usernameElement = await driver.findElement(By.css('input#UserName--1'));
    await usernameElement.sendKeys(config.username);

    let passwordElement = await driver.findElement(By.css('input#Password--2'));
    await passwordElement.sendKeys(config.password, Key.ENTER);
  } else if (type ==='google') {
    // press the connect with google button
    let googleButtonElement = await driver.wait(until.elementLocated(By.css('button.social-form__social-button.social-form__social-button--google')), waitTime);
    await googleButtonElement.click();

    // enter email
    let emailElement = await driver.wait(until.elementLocated(By.css('input#identifierId')), waitTime);
    await emailElement.sendKeys(config.username);
    let continueElements = await driver.findElements(By.css('span.RveJvd.snByac'));
    await continueElements[1].click();

    // IMPORTANT
    // wait for google input field to load
    await sleep(3000);

    // enter password whsOnd zHQkBf
    let passwordElement = await driver.findElements(By.css('input.whsOnd.zHQkBf'));
    await passwordElement[0].sendKeys(config.password);
    continueElements = await driver.findElements(By.css('span.RveJvd.snByac'));
    await continueElements[0].click();

    // IMPORTANT
    // wait for google input field to load
    await sleep(3000);

    // enter 2fa token
    let tokenElement = await driver.wait(until.elementLocated(By.css('input#totpPin')), waitTime);
    let token = getGoogle2faToken(config.secret);
    await tokenElement.sendKeys(token);
    continueElements = await driver.findElements(By.css('span.RveJvd.snByac'));
    await continueElements[0].click();
  }

  // wait for similar web to load
  // await sleep(30000);
  await driver.wait(until.titleIs('SimilarWeb Home'), 100000);

  console.log('Logged in!');
}

/**
 * Crawl list item traffic from similarweb and modify crawllist directly.
 * @param {object} driver Selenium web driver.
 * @param {object} crawlList An object containing crawler status and list data.
 * @param {func} getData function that returns data segment in the crawlList data structure
 * @param {string} fileName output fileName
 */
export async function crawlListTraffic(driver, crawlList, getData, fileName) {
  console.log('Crawl traffic from similar web...');

  let item;
  let list = getData(crawlList);
  await signInSimilarWeb(driver, 'google');

  for (let i=0; i<list.length; i++) {
    console.log(i);

    if (list[i].hasOwnProperty('traffic') && list[i].traffic.success) continue;
    item = list[i];

    console.log('Crawling ' + item.name + ' traffic...');
    item.traffic = await getTraffic(driver, getDomainName(item.url));
    await writeFile(fileName, JSON.stringify(crawlList, null, 2));
  }
}

/**
 * Get domain traffic info
 * 1. total visit
 * 2. marketMix
 * 3. ranks
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name which you want to get traffic
 * @return {object} traffic data
 */
export async function getTraffic(driver, domain) {
  let traffic = {
    success: true,
    successDate: '',
    totalVisit: '',
    marketingMix: {},
    geographyRank: [],
    referralRank: [],
    socialRank: [],
    adRank: [],
  };

  //
  try {
    domain = await searchDomain(driver, domain);
    // await setTimeInterval(driver, 'Last 6 Months');

    // get totalVisit
    try {
      traffic.totalVisit = await getTotalVisit(driver, domain);
    } catch (e) {
      traffic.success = (e.message === 'domain not found');
      console.error(e);
      await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

      console.log(traffic);
      return traffic;
    }

    if (traffic.totalVisit === '< 5,000') {
      await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');
      console.log('This domain has no following data.');
      traffic.success = true;
      return traffic;
    }


    // get marketingMix
    try {
      traffic.marketingMix = await getMarketingMix(driver, domain);
    } catch (e) {
      traffic.success = false;
      console.error(e);
      await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

      console.log(traffic);
      return traffic;
    }

    // get gergraphy rank
    try {
      traffic.geographyRank = await getGeographyRanks(driver, domain);
    } catch (e) {
      traffic.success = false;
      console.error(e);
      await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

      console.log(traffic);
      return traffic;
    }

    // get referral rank
    try {
      traffic.referralRank = await getReferralRanks(driver, domain);
    } catch (e) {
      traffic.success = false;
      console.error(e);
      await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

      console.log(traffic);
      return traffic;
    }

    // get social rank
    try {
      traffic.socialRank = await getSocialRanks(driver, domain);
    } catch (e) {
      traffic.success = false;
      console.error(e);
      await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

      console.log(traffic);
      return traffic;
    }

    // get ad rank
    try {
      traffic.adRank = await getAdRanks(driver, domain);
    } catch (e) {
      traffic.success = false;
      console.error(e);
      await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

      console.log(traffic);
      return traffic;
    }
  } catch (e) {
    traffic.success = false;
    console.error(e);
    await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

    console.log(traffic);
    return traffic;
  }

  calculateTrafficNumbers(traffic);
  traffic.successDate = new Date();

  await driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

  console.log(traffic);
  return traffic;
}

/**
 * Get domain's total visit
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {string} the total visit string
 */
async function getTotalVisit(driver, domain) {
  console.log('Getting total visit...');

  await driver.get('https://pro.similarweb.com/#/website/audience-overview/' + domain +'/*/999/' + timeInterval + '/?webSource=Total');

  let visitElement = driver.wait(until.elementLocated(By.css('div.big-text.u-blueMediumMedium')), waitTime);

  let text = await visitElement.getText();

  // if didn't get total visit the first time, wait waitTime for it
  // if it still didn't show up, throw error
  for (let i=0; i<5; i++) {
    text = await visitElement.getText();
    if (text !== '') return text;

    await sleep(4000);
  }

  text = await visitElement.getText();
  if (text === '') throw new Error('domain not found');
  return text;
}

/**
 * Get domain's visit source and sources' percentage
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {object} domain's visit source and sources' percentage
 */
async function getMarketingMix(driver, domain) {
  console.log('Getting marketing mix...');

  await driver.get('https://pro.similarweb.com/#/website/traffic-overview/' + domain +'/*/999/' + timeInterval + '?category=no-category');

  // get chart and buttons
  let chartElement = await driver.wait(until.elementLocated(By.css('div.swWidget-frame.swWidget-frame--noBottomPadding')), waitTime);
  let buttonElements = await chartElement.findElements(By.css('button.sc-qrIAp'));
  let text;
  let marketingMix = {
    channelTraffic: '',
    percentages: [],
    numbers: [],
  };

  // get channel total traffic
  let channelTrafficElement = await driver.wait(until.elementLocated(By.css('div.u-blueMediumMedium.big-number')));
  marketingMix.channelTraffic = await channelTrafficElement.getText();

  // get percentage elements
  await buttonElements[0].click();
  let containerElement = await driver.wait(until.elementLocated(By.css('div.highcharts-data-labels')), waitTime);
  let percentageElements = await containerElement.findElements(By.css('span'));

  // busy waiting until percentage span is loaded
  while (true) {
    text = await percentageElements[0].getText();
    if (text !== '') break;
  }

  for (let i=0; i<percentageElements.length; i++) {
    text = await percentageElements[i].getText();
    if (text === '0') text += '%';
    marketingMix.percentages.push(text);
  }

  // get number elements
  await buttonElements[1].click();
  containerElement = await driver.wait(until.elementLocated(By.css('div.highcharts-data-labels')), waitTime);
  let numberElements = await containerElement.findElements(By.css('span'));

  // busy waiting until number span is loaded
  while (true) {
    text = await numberElements[0].getText();
    if (text !== '') break;
  }

  for (let i=0; i<percentageElements.length; i++) {
    text = await numberElements[i].getText();
    marketingMix.numbers.push(text);
  }

  return marketingMix;
}

/**
 * Get the geography ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */
async function getGeographyRanks(driver, domain) {
  console.log('Getting geography rank...');

  await driver.get('https://pro.similarweb.com/#/website/audience-geography/' + domain + '/*/999/' + timeInterval + '');

  let ranks = [];
  let tableElement;
  let countryElements;
  let percentageElements;

  try {
    tableElement = await driver.wait(until.elementLocated(By.css('div.swReactTable-wrapper')), waitTime);
    await driver.wait(until.elementIsVisible(tableElement));

    countryElements = await tableElement.findElements(By.css('div.country-text'));
    percentageElements = await tableElement.findElements(By.css('span.min-value'));
  } catch (e) {
    console.error(e);
    return ranks;
  }

  // let ranksNum = (countryElements.length > 10)? 10 : countryElements.length;
  let ranksNum = countryElements.length;

  for (let i=0; i<ranksNum; i++) {
    let rank = {};
    rank.name = await countryElements[i].getText();
    rank.percentage = await percentageElements[i].getText();

    ranks.push(rank);
  }

  return ranks;
}

/**
 * Get the referral ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */
async function getReferralRanks(driver, domain) {
  console.log('Getting referral rank...');

  await driver.get('https://pro.similarweb.com/#/website/traffic-referrals/' + domain + '/*/999/' + timeInterval + '?webSource=Desktop');

  let ranks = [];
  let tableElement;
  let siteElements;
  let percentageElements;

  try {
    tableElement = await driver.wait(until.elementLocated(By.css('div.swReactTable-wrapper')), waitTime);
    await driver.wait(until.elementIsVisible(tableElement));

    siteElements = await tableElement.findElements(By.css('a.cell-clickable'));
    percentageElements = await tableElement.findElements(By.css('span.min-value'));
  } catch (e) {
    console.error(e);
    return ranks;
  }

  // let ranksNum = (siteElements.length > 10)? 10 : siteElements.length;
  let ranksNum = siteElements.length;

  for (let i=0; i<ranksNum; i++) {
    let rank = {};
    rank.name = await siteElements[i].getText();
    rank.percentage = await percentageElements[i].getText();

    ranks.push(rank);
  }
  return ranks;
}

/**
 * Get the referral ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */
async function getSocialRanks(driver, domain) {
  console.log('Getting social rank...');

  await driver.get('https://pro.similarweb.com/#/website/traffic-social/' + domain + '/*/999/' + timeInterval);

  let ranks = [];
  let element;
  let siteElements;
  let percentageElements;

  try {
    // wait for site element to load
    element = await driver.wait(until.elementLocated(By.css('span.swTable-content.text-select')), waitTime);
    await driver.wait(until.elementIsVisible(element));

    // get site elements
    siteElements = await driver.findElements(By.css('span.swTable-content.text-select'));

    // wait for percentage element to load
    element = await driver.wait(until.elementLocated(By.css('span.min-value')), waitTime);
    await driver.wait(until.elementIsVisible(element));
    // await driver.wait(until.elementIsEnabled(element));

    // get percentage elements
    percentageElements = await driver.findElements(By.css('span.min-value'));
  } catch (e) {
    console.error(e);
    return ranks;
  }

  // let ranksNum = (siteElements.length > 10)? 10 : siteElements.length;
  let ranksNum = siteElements.length;

  for (let i=0; i<ranksNum; i++) {
    let rank = {};
    rank.name = await siteElements[i].getText();
    rank.percentage = await percentageElements[i].getText();

    ranks.push(rank);
  }
  return ranks;
}

/**
 * Get the ad ranks (top 5)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */
async function getAdRanks(driver, domain) {
  console.log('Getting ad rank...');

  await driver.get('https://pro.similarweb.com/#/website/traffic-display/' + domain + '/*/999/' + timeInterval + '?selectedTab=overview&webSource=Desktop');
  let ranks = [];
  let element;
  let siteElements;
  let percentageElements;

  try {
    // wait for site element to load
    element = await driver.wait(until.elementLocated(By.css('a.cell-clickable')), 5000);
    await driver.wait(until.elementIsEnabled(element));

    // get site
    siteElements = await driver.findElements(By.css('a.cell-clickable'));

    // wait for percentage element to load
    element = await driver.wait(until.elementLocated(By.css('span.min-value')), waitTime);
    await driver.wait(until.elementIsEnabled(element));

    // get percentage
    percentageElements = await driver.findElements(By.css('span.min-value'));
  } catch (e) {
    console.error(e);
    return ranks;
  }

  for (let i=0; i<siteElements.length; i++) {
    let rank = {};
    rank.name = await siteElements[i].getText();
    rank.percentage = await percentageElements[i].getText();

    ranks.push(rank);
  }
  return ranks;
}

/**
 * Calculate numbers in traffic data based on total number and percentage
 * @param {object} traffic Data structures that stores traffic data
 */
export function calculateTrafficNumbers(traffic) {
  console.log('Calculating traffic numbers...');

  if (!traffic.success) {
    console.log('Traffic data of this item is not complete.');
    return;
  }

  // calculate geography rank number
  calculateNumberInRank(traffic.marketingMix.numbers[0], traffic.geographyRank);

  // referral referral rank number
  calculateNumberInRank(traffic.marketingMix.numbers[2], traffic.referralRank);

  // referral social rank number
  calculateNumberInRank(traffic.marketingMix.numbers[3], traffic.socialRank);

  // referral geography rank number
  calculateNumberInRank(traffic.marketingMix.numbers[6], traffic.adRank);
}

/**
 * !!! deprecated because similar web updated !!!
 * set time interval directly in the url!
 *
 * Set the time interval in similarweb (can only be used after searchDomain())
 * @param {object} driver Selenium web driver.
 * @param {string} timeString The time string (display text) in the dropdown list.
 */
/* async function setTimeInterval(driver, timeString) {
  // click time interval dropdown button
  let timeIntervalElement = await driver.wait(until.elementLocated(By.css('div.DropdownButton')));
  await timeIntervalElement.click();

  // select time interval
  let durationContainer = await driver.wait(until.elementLocated(By.css('div.DurationSelector-container')), waitTime);
  let selectTimeElement = await durationContainer.findElement(By.css('div.DropdownButton'));
  await selectTimeElement.click();

  let dropdownItems = await driver.findElements(By.css('div.DropdownItem'));
  let itemIndex = await getElementIndex(dropdownItems, timeString);
  await dropdownItems[itemIndex].click();
  await driver.findElement(By.css('button.Button.DurationSelector-action-submit')).click();
  await driver.wait(until.elementLocated(By.css('div.website-header-title')), waitTime);
} */

/**
 * Search specified domain in similar web
 * @param {object} driver Selenium web driver.
 * @param {string} domain
 * @return {string} domain name in similar web
 */
async function searchDomain(driver, domain) {
  console.log('Searching domain: ' + domain);

  let searchElement = await driver.findElement(By.css('input.universalInput-input'));
  await searchElement.click();
  await searchElement.sendKeys(domain);
  await sleep(3000);
  await searchElement.sendKeys(Key.ENTER);
  await driver.wait(until.elementLocated(By.css('div.website-header-title')), waitTime);
  let url = await driver.getCurrentUrl();
  return url.split('/')[6];
}

/**
 * !!! deprecated because similar web updated !!!
 *
 * Click the side nav link according to listText and itemText
 * (cant use getElementIndex because <a></a> cannot getText())
 * @param {object} driver Selenium web driver.
 * @param {number} listIndex the list index
 * @param {number} itemIndex the item index
 */
/* async function clickSideNav(driver, listIndex, itemIndex) {
  // get list index and container elements (item are not list's but container's children)
  let listElements = await driver.findElements(By.css('div.sc-VJcYb.cOSUNP'));
  let containerElements = await driver.findElements(By.css('div.SideNavGroupContainer-glSWhQ.cWqtzl'));

  // get item elements and item index
  let itemElements = await containerElements[listIndex].findElements(By.css('a.sc-bsbRJL.jceUKY'));

  // click the fucking item
  try {
    await itemElements[itemIndex].click();
  } catch (e) {
    await listElements[listIndex].click();
    await itemElements[itemIndex].click();
  }
} */

/**
 * Check if all item in list finish getting traffic data
 * @param {array} list An array storing object
 * @return {bool} whether all item finish getting traffic data
 */
export function checkAllTrafficSuccess(list) {
  for (let i=0; i<list.length; i++) {
    if (!list[i].hasOwnProperty('traffic') || !list[i].traffic.success) {
      return false;
    }
  }
  return true;
}

/**
 * !!! deprecated !!!
 *
 * return the element index of the specified text
 * @param {array} elements An array of webElement.
 * @param {string} text item text
 * @return {number} The element index of the specified text.
 */
/* async function getElementIndex(elements, text) {
  let elementText;
  for (let i=0; i<elements.length; i++) {
    try {
      elementText = await elements[i].getText();
      if (elementText === text) return i;
    } catch (e) {
    }
  }
  return -1;
} */

/**
 * Calculate each rank element's number based on numberString and element's percentage
 * @param {string} numberString number string
 * @param {array} rank Array of objects that contain rank info
 */
function calculateNumberInRank(numberString, rank) {
  let number = getNum(numberString);
  for (let i=0; i<rank.length; i++) {
    rank[i].number = (number * getPercentage(rank[i].percentage)).toFixed(2);

    if (isNaN(rank[i].number)) {
      console.log('!!! Some rank number is NaN !!!');
      console.log(number);
      console.log(getPercentage(rank[i].percentage));
    }
  }
}
/**
 * convert similarweb marketing mix number string to number
 * @param {string} numString number string
 * @return {number} number of numString
 */
function getNum(numString) {
  let num;
  if (numString === '0') return 0;

  // get rid of '<'
  if (numString[0] === '<') numString = numString.slice(2);

  // get rid of 'K' and 'M'
  if (numString.includes('K')) {
    numString = numString.slice(0, numString.length-1);
    num = Number(numString) * 1000;
  } else if (numString.includes('M')) {
    numString = numString.slice(0, numString.length-1);
    num = Number(numString) * 1000000;
  } else {
    num = Number(numString);
  }
  return num;
}

/**
 * convert similarweb marketing mix percentage string to number
 * @param {string} percentageString percentage string
 * @return {number} number of numString
 */
function getPercentage(percentageString) {
  if (percentageString.includes('<') || percentageString.includes('>')) {
    percentageString = percentageString.slice(2);
  }
  percentageString = percentageString.slice(0, percentageString.length-1);
  return Number(percentageString) / 100;
}
