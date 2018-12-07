import {Builder, By} from 'selenium-webdriver';
import {writeFile} from '../fsPromise';
import {sleep} from '../utility';

/**
 * main function tokenData.js
 * crawl all page's token data
 */
export default async function main() {
  let data = [];
  let driver = await new Builder().forBrowser('chrome').build();

  await driver.get('https://www.tokendata.io/');
  await sleep(10000);

  for (let i=1; i<=24; i++) {
    let tbodyElement = await driver.findElement(By.css('tbody'));
    let trElements = await tbodyElement.findElements(By.css('tr'));
    console.log(trElements.length);
    for (let j=1; j<trElements.length; j++) {
      data.push(await getTokenData(trElements[j]));
    }

    if (i !== 24) {
      let nextButtonElement = driver.findElement(By.css('li#sample_1_next'));
      await nextButtonElement.click();
      await sleep(10000);
    }
  }

  let header = [
    'name',
    'website url',
    'symbol text',
    'symbol img url',
    'status',
    'USD raised',
    'time',
    'sale price',
    'current price',
    'return',
    'whitepaper url',
  ];

  header = header.map((string) => '\"' + string + '\"');
  header = header.join(',');
  header += '\n';

  for (let i=0; i<data.length; i++) {
    data[i] = data[i].map((string) => '\"' + string + '\"');
    data[i] = data[i].join(',');
  }
  data = data.join('\n');
  data += '\n';

  console.log('Writing data to csv...');
  await writeFile('data/tokenData.csv', header + data);
}

/**
 * get token data from https://www.tokendata.io/ table
 * @param {object} trElement trElement containing token's data
 * @return {array} token data
 */
async function getTokenData(trElement) {
  let data = [];
  let string = '';
  let tempElement;
  let tdElements = await trElement.findElements(By.css('td'));
  let nameHasNoHref = false;

  // get token name
  try {
    tempElement = await tdElements[1].findElement(By.css('span'));
    string = await tempElement.getText();
  } catch (e) {
    console.error('Error occurred when getting token name');

    try {
      string = await tdElements[1].getText();
      nameHasNoHref = true;
    } catch (e) {
      string = '';
    }
  }
  data.push(string);

  console.log('Crawling ' + string + '\'s data...');

  // get token website url
  try {
    if (!nameHasNoHref) {
      tempElement = await tdElements[1].findElement(By.css('a'));
    } else {
      tempElement = await tdElements[0].findElement(By.css('a'));
      nameHasNoHref = false;
    }
    string = await tempElement.getAttribute('href');
  } catch (e) {
    console.error('Error occurred when getting token website url');
    string = '';
  }
  data.push(string);

  // get token symbol text
  try {
    tempElement = await tdElements[2].findElement(By.css('span'));
    string = await tempElement.getText();
  } catch (e) {
    console.error('Error occurred when getting token symbol text');
    string = '';
  }
  data.push(string);

  // get token symbol img url
  try {
    tempElement = await tdElements[0].findElement(By.css('img'));
    string = await tempElement.getAttribute('src');
  } catch (e) {
    console.error('Error occurred when getting token symbol img url');
    string = '';
  }
  data.push(string);

  // get token status
  try {
    tempElement = await tdElements[3].findElement(By.css('span'));
    string = await tempElement.getText();
  } catch (e) {
    console.error('Error occurred when getting token status');
    string = '';
  }
  data.push(string);

  // get token raised money
  try {
    string = await tdElements[4].getText();
    if (string === '') throw new Error('Empty text!');
  } catch (e) {
    console.error('Error occurred when getting token raised money');
    string = '';
  }
  data.push(string);

  // get token ico time
  try {
    tempElement = await tdElements[5].findElement(By.css('span'));
    string = await tempElement.getAttribute('data-original-title');
  } catch (e) {
    console.error('Error occurred when getting token ico time');
    string = '';
  }
  data.push(string);

  // get token sale price
  try {
    string = await tdElements[6].getText();
    if (string === '') throw new Error('Empty text!');
  } catch (e) {
    console.error('Error occurred when getting token sale price');
    string = '';
  }
  data.push(string);

  // get token current price
  try {
    string = await tdElements[7].getText();
    if (string === '') throw new Error('Empty text!');
  } catch (e) {
    console.error('Error occurred when getting token current price');
    string = '';
  }
  data.push(string);

  // get token return
  try {
    string = await tdElements[8].getText();
    if (string === '') throw new Error('Empty text!');
  } catch (e) {
    console.error('Error occurred when getting token return');
    string = '';
  }
  data.push(string);

  // get token whitepaper url
  try {
    tempElement = await tdElements[9].findElement(By.css('a'));
    string = await tempElement.getAttribute('href');
  } catch (e) {
    console.error('Error occurred when getting token whitepaper url');
    string = '';
  }
  data.push(string);

  return data;
}
