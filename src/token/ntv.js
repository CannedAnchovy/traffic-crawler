import {Builder, By} from 'selenium-webdriver';
import {Origin} from 'selenium-webdriver/lib/input';
import {writeFile} from '../fsPromise';
import {sleep} from '../utility';

/**
 * main function for tokenPrice.js
 *
 */
export default async function main() {
  // crawl token price from gecko and store the result
  let data = await crawlPriceFromCoinGecko('https://coinmetrics.io/nvt/#assets=btc');
  let csvData = data.map(timePointDatatoCsvString);
  let header = 'Date,Price(USD),Volume(USD)\n';
  await writeFile('data/token/tokenPrice(COB)', JSON.stringify(data, '', 2));
  await writeFile('data/token/tokenPrice(COB).csv', header + csvData.join('\n') + '\n');


}

/**
 * crawl token price data from coin gecko
 * @param {*} url coin gecko url
 * @return {array} token price data array
 */
async function crawlPriceFromCoinGecko(url, coin) {
  let data = [];

  // get webpage
  let driver = await new Builder().forBrowser('safari').build();
  await driver.get(url);

  /* // click the Max button
  const buttonElement = await driver.findElement(By.css('a.graph-stats-btn-max.center'));
  await buttonElement.click(); */
  await sleep(5000);

  // create mouse action class
  const chartElement = await driver.findElement(By.css('canvas'));
  console.log('gi');
  const labelElement = await driver.findElement(By.css('div.dygraph-legend'));
  console.log('hi');
  // move chart to the center of the screen
  await driver.executeScript('arguments[0].scrollIntoView()', chartElement);

  let count = 0;
  let repeatCount = 0;

  // crawl the right part of the chart
  await driver.actions().move({origin: chartElement}).perform();

  while (true) {
    console.log(++count);

    await driver.actions().move({origin: Origin.POINTER, x: 1, y: 0}).perform();

    console.log(await labelElement.getText());
    let tempData = await getCoinGeckoTimePointData(driver, chartElement);

    if (data.length !== 0 && isEqual(tempData, data[data.length -1])) {
      repeatCount++;

      if (repeatCount >= 10) {
        repeatCount = 0;
        break;
      }
    } else {
      data.push(tempData);
      console.log(tempData);
      repeatCount = 0;
    }
  }
  console.log('finish right');

  // crawl the left part of the chart
  await driver.actions().move({origin: chartElement}).perform();

  while (true) {
    console.log(++count);

    await driver.actions().move({origin: Origin.POINTER, x: -1, y: 0}).perform();


    let tempData = await getCoinGeckoTimePointData(driver, chartElement);

    if (data.length !== 0 && isEqual(tempData, data[data.length -1])) {
      repeatCount++;
      if (repeatCount >= 10) {
        repeatCount = 0;
        break;
      }
    } else {
      data.push(tempData);
      console.log(tempData);
      repeatCount = 0;
    }
  }
  console.log('finish left');

  data.sort((a, b) => {
    if (a.time < b.time) return -1;
    else if (a.time > b.time) return 1;
    else return 0;
  });

  for (let i=0; i<data.length-1; i++) {
    if (isEqual(data[i], data[i+1])) {
      data.splice(i, 1);
      i--;
    }
  }

  return data;
}

/**
 * get a single time point data from coin gecko page
 * @param {object} driver selenium web driver
 * @return {object} time point data
 */
async function getCoinGeckoTimePointData(driver) {
  let labelElement = await driver.findElement(By.css('div.highcharts-label'));
  let spanElement = await labelElement.findElement(By.css('span'));

  // 'Sat 12 May 2018, 08:00:00Price: US$0.081853Vol: US$475,986'
  let text = await spanElement.getText();
  let priceIndex = text.indexOf('Price: ');
  let volIndex = text.indexOf('Vol: ');

  return {
    time: new Date(text.slice(0, priceIndex)),
    price: Number(text.slice(priceIndex + 10, volIndex)),
    volume: Number(text.slice(volIndex + 8).split(',').join('')),
  };
}

/**
 * determine whether two timePointData is equal
 * @param {object} timePointData1
 * @param {object} timePointData2
 * @return {bool} whether two timePointData is equal
 */
function isEqual(timePointData1, timePointData2) {
  return (timePointData1.price === timePointData2.price) && (timePointData1.volume === timePointData2.volume);
}

/**
 * convert timePointData to a csv string
 * @param {object} timePointData
 * @return {string}
 */
function timePointDatatoCsvString(timePointData) {
  let string = '';
  string += '\"' + timePointData.time.toISOString().slice(0, 10) + '\",';
  string += '\"' + timePointData.price.toFixed(6) + '\",';
  string += '\"' + timePointData.volume.toFixed(0) + '\"';
  return string;
}
