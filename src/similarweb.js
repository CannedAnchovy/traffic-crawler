import {By, until, Key} from 'selenium-webdriver'
import config from '../similarweb.json';
import {sleep} from './utility';

const waitTime = 20000;

/**
 * Sign in to similarweb with username and password in config
 * @param {object} driver Selenium web driver.
 */
export async function signInSimilarWeb(driver) {
  console.log('Logging in to SimilarWeb...');

  await driver.get('https://account.similarweb.com/login');

  // Enter username and password
  let usernameElement = await driver.findElement(By.css('input#UserName--1'));
  await usernameElement.sendKeys(config.username);

  let passwordElement = await driver.findElement(By.css('input#Password--2'));
  await passwordElement.sendKeys(config.password, Key.ENTER);

  // wait for similar web to load
  // await sleep(30000);
  await driver.wait(until.titleIs('SimilarWeb Home'), 100000);

  console.log('Logged in!');
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
    totalVisit: '',
    marketingMix: {},
    geographyRank: [],
    referralRank: [],
    socialRank: [],
    adRank: []
  };

  //
  try {
    await searchDomain(driver, domain);
    await setTimeInterval(driver, 'Last 6 Months');

    // get totalVisit
    try {
      traffic.totalVisit = await getTotalVisit(driver);
    } catch(e) {
      traffic.success = false;
      console.error(e);
    }

    // get marketingMix
    try {
      traffic.marketingMix = await getMarketingMix(driver);
    } catch(e) {
      traffic.success = false;
      console.error(e);
    }

    // get gergraphy rank
    try {
      traffic.geographyRank = await getGeographyRanks(driver);
    } catch(e) {
      traffic.success = false;
      console.error(e);
    }

    // get referral rank
    try {
      traffic.referralRank = await getReferralRanks(driver);
    } catch(e) {
      traffic.success = false;
      console.error(e);
    }

    // get social rank
    try {
      traffic.socialRank = await getSocialRanks(driver);
    } catch(e) {
      traffic.success = false;
      console.error(e);
    }

    // get ad rank
    try {
      traffic.adRank = await getAdRanks(driver);
    } catch(e) {
      traffic.success = false;
      console.error(e);
    }

    // get back to website overview
    await clickSideNav(driver, 0, 0);

  } catch (e) {
    traffic.success = false;
    console.error(e);
  }
  console.log(traffic);
  return traffic;
}

/**
 * Get domain's total visit
 * @param {object} driver Selenium web driver.
 * @return {string} the total visit string
 */
async function getTotalVisit(driver) {
  console.log('Getting total visit...');

  await clickSideNav(driver, 1, 0);
  let containerElement = driver.wait(until.elementLocated(By.css('div.single-metric-visits-with-share')), waitTime);
  let visitElement = containerElement.findElement(By.css('div.big-text.u-blueMediumMedium'));
  return await visitElement.getText();
}

/**
 * Get domain's visit source and sources' percentage
 * @param {object} driver Selenium web driver.
 * @return {object} domain's visit source and sources' percentage
 */
async function getMarketingMix(driver) {
  console.log('Getting marketingMix...');

  await clickSideNav(driver, 2, 0);

  // get chart and buttons
  let chartElement = await driver.wait(until.elementLocated(By.css('div.swWidget-frame.swWidget-frame--noBottomPadding')), waitTime);
  let buttonElements = await chartElement.findElements(By.css('button.circle-item'));
  let text;
  let marketingMix = {
    channelTraffic: '',
    percentage: [],
    number: []
  };

  // get channel total traffic
  let channelTrafficElement = await driver.wait(until.elementLocated(By.css('div.u-blueMediumMedium.big-number')));
  marketingMix.channelTraffic = await channelTrafficElement.getText();

  // get percentage elements
  await buttonElements[0].click();
  let containerElement = await driver.wait(until.elementLocated(By.css('div.highcharts-data-labels')), waitTime);
  let percentageElements = await containerElement.findElements(By.css('span'));

  // busy waiting until percentage span is loaded
  while(true) {
    text = await percentageElements[0].getText();
    if(text !== '') break;
  }

  for(let i=0; i<percentageElements.length; i++) {
    marketingMix.percentage.push(await percentageElements[i].getText());
  }

  // get number elements
  await buttonElements[1].click();
  containerElement = await driver.wait(until.elementLocated(By.css('div.highcharts-data-labels')), waitTime);
  let numberElements = await containerElement.findElements(By.css('span'));

  // busy waiting until percentage span is loaded
  while(true) {
    text = await numberElements[0].getText();
    if(text !== '') break;
  }

  for(let i=0; i<percentageElements.length; i++) {
    marketingMix.number.push(await numberElements[i].getText());
  }

  return marketingMix;
}

/**
 * Get the geography ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing ranks name and percentage
 */
async function getGeographyRanks(driver) {
  console.log('Getting geography rank...');

  await clickSideNav(driver, 1, 1);
  let ranks = [];
  let tableElement;
  let countryElements;
  let percentageElements;

  try {
    tableElement = await driver.wait(until.elementLocated(By.css('div.swReactTable-wrapper')), waitTime);
    countryElements = await tableElement.findElements(By.css('div.country-text'));
    percentageElements = await tableElement.findElements(By.css('span.min-value'));
  } catch (e) {
    console.error(e);
    return ranks;
  }

  let ranksNum = (countryElements.length > 10)? 10 : countryElements.length;
  for(let i=0; i<ranksNum; i++) {
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
 * @return {array} An array containing ranks name and percentage
 */
async function getReferralRanks(driver) {
  console.log('Getting referral rank...');

  await clickSideNav(driver, 2, 1);
  let ranks = [];
  let tableElement;
  let siteElements;
  let percentageElements;

  try {
    tableElement = await driver.wait(until.elementLocated(By.css('div.swReactTable-wrapper')), waitTime);
    siteElements = await tableElement.findElements(By.css('a.cell-clickable'));
    percentageElements = await tableElement.findElements(By.css('span.min-value'));
  } catch (e) {
    console.error(e);
    return ranks;
  }

  let ranksNum = (siteElements.length > 10)? 10 : siteElements.length;
  for(let i=0; i<ranksNum; i++) {
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
 * @return {array} An array containing ranks name and percentage
 */
async function getSocialRanks(driver) {
  console.log('Getting social rank...');

  await clickSideNav(driver, 2, 3);
  let ranks = [];
  let element;
  let siteElements;
  let percentageElements;

  try {
    // wait for site element to load
    element = await driver.wait(until.elementLocated(By.css('span.swTable-content.text-select')), waitTime);
    await driver.wait(until.elementIsEnabled(element));

    // get site elements
    siteElements = await driver.findElements(By.css('span.swTable-content.text-select'));

    // wait for percentage element to load
    element = await driver.wait(until.elementLocated(By.css('span.min-value')), waitTime);
    await driver.wait(until.elementIsEnabled(element));

    // get percentage elements
    percentageElements = await driver.findElements(By.css('span.min-value'));
  } catch (e) {
    console.error(e);
    return ranks;
  }

  let ranksNum = (siteElements.length > 10)? 10 : siteElements.length;
  for(let i=0; i<ranksNum; i++) {
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
 * @return {array} An array containing ranks name and percentage
 */
async function getAdRanks(driver) {
  console.log('Getting ad rank...');

  await clickSideNav(driver, 2, 4);
  let ranks = [];
  let element;
  let siteElements;
  let percentageElements;

  try {
    // wait for site element to load
    element = await driver.wait(until.elementLocated(By.css('a.cell-clickable')), waitTime);
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

  for(let i=0; i<siteElements.length; i++) {
    let rank = {};
    rank.name = await siteElements[i].getText();
    rank.percentage = await percentageElements[i].getText();

    ranks.push(rank);
  }
  return ranks;
}

/**
 * Set the time interval in similarweb (can only be used after searchDomain())
 * @param {object} driver Selenium web driver.
 * @param {string} timeString The time string (display text) in the dropdown list.
 */
async function setTimeInterval(driver, timeString) {

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
}

/**
 * Search specified domain in similar web
 * @param {object} driver Selenium web driver.
 * @param {string} domain
 */
async function searchDomain(driver, domain) {
  console.log('Searching domain: ' + domain);

  let searchElement = await driver.findElement(By.css('input.universalInput-input'));
  await searchElement.click();
  await searchElement.sendKeys(domain);
  await sleep(3000);
  await searchElement.sendKeys(Key.ENTER);
  await driver.wait(until.elementLocated(By.css('div.website-header-title')), waitTime);
}

/**
 * Click the side nav link according to listText and itemText
 * (cant use getElementIndex because <a></a> cannot getText())
 * @param {object} driver Selenium web driver.
 * @param {number} listIndex the list index
 * @param {number} itemIndex the item index
 */
async function clickSideNav(driver, listIndex, itemIndex) {

  // get list index and container elements (item are not list's but container's children)
  let listElements = await driver.findElements(By.css('div.sc-VJcYb.cOSUNP'));
  let containerElements = await driver.findElements(By.css('div.SideNavGroupContainer-glSWhQ.cWqtzl'));

  // get item elements and item index
  let itemElements = await containerElements[listIndex].findElements(By.css('a.sc-bsbRJL.jceUKY'));

  // click the fucking item
  try {
    await itemElements[itemIndex].click();
  } catch(e) {
    await listElements[listIndex].click();
    await itemElements[itemIndex].click();
  }
}

/**
 * return the element index of the specified text
 * @param {array} elements An array of webElement.
 * @param {string} text item text
 * @return {number} The element index of the specified text.
 */
async function getElementIndex(elements, text) {
  let elementText;
  for(let i=0; i<elements.length; i++) {
    try {
      elementText = await elements[i].getText();
      if(elementText === text) return i;
    } catch (e) {
    }
  }
  return -1;
}
