import {By, until, Key} from 'selenium-webdriver'
import config from '../similarweb.json';
import {sleep} from './utility';

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
 * Get domain's total visit
 * @param {object} driver Selenium web driver.
 * @return {string} the total visit string
 */
export async function getTotalVisit(driver) {
  await clickSideNav(driver, 1, 0);
  let containerElement = driver.wait(until.elementLocated(By.css('div.single-metric-visits-with-share')), 10000);
  let visitElement = containerElement.findElement(By.css('div.big-text.u-blueMediumMedium'));
  return await visitElement.getText();
}

/**
 * Get domain's visit source and sources' percentage
 * @param {object} driver Selenium web driver.
 * @return {object} domain's visit source and sources' percentage
 */
export async function getVisitSource(driver) {

  // get percentage elements
  await clickSideNav(driver, 2, 0);
  let containerElement = await driver.wait(until.elementLocated(By.css('div.highcharts-data-labels')), 10000);
  let percentageElements = await containerElement.findElements(By.css('span'));
  let percentageArray = [];
  let text;

  // busy waiting until percentage span is loaded
  while(true) {
    text = await percentageElements[0].getText();
    if(text !== '') break;
  }

  for(let i=0; i<percentageElements.length; i++) {
    percentageArray.push(await percentageElements[i].getText());
  }

  return {
    direct: percentageArray[0],
    referrals: percentageArray[2],
    social: percentageArray[3],
    organic: percentageArray[4],
    ads: percentageArray[6]
  };
}

/**
 * Set the time interval in similarweb
 * @param {object} driver Selenium web driver.
 * @param {string} timeString The time string (display text) in the dropdown list.
 */
export async function setTimeInterval(driver, timeString) {
  // get to random domain search result
  console.log('go kfc');
  await searchDomain(driver, 'kfc.com');

  // click time interval dropdown button
  let timeIntervalElement = await driver.wait(until.elementLocated(By.css('div.DropdownButton')));
  await timeIntervalElement.click();

  // select time interval
  let durationContainer = await driver.wait(until.elementLocated(By.css('div.DurationSelector-container')), 10000);
  let selectTimeElement = await durationContainer.findElement(By.css('div.DropdownButton'));
  await selectTimeElement.click();

  let dropdownItems = await driver.findElements(By.css('div.DropdownItem'));
  let itemIndex = await getElementIndex(dropdownItems, timeString);
  await dropdownItems[itemIndex].click();
  await driver.findElement(By.css('button.Button.DurationSelector-action-submit')).click();
  await driver.wait(until.elementLocated(By.css('div.website-header-title')), 10000);
}

/**
 * Search specified domain in similar web
 * @param {object} driver Selenium web driver.
 * @param {string} domain
 */
async function searchDomain(driver, domain) {
  let searchElement = await driver.findElement(By.css('input.universalInput-input'));
  await searchElement.click();
  await searchElement.sendKeys(domain);
  await sleep(1000);
  await searchElement.sendKeys(Key.ENTER);
  await driver.wait(until.elementLocated(By.css('div.website-header-title')), 10000);
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
