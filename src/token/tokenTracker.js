import {Builder, By} from 'selenium-webdriver';
import {writeFile} from '../fsPromise';
const tokenNum = 30;

/**
 * Crawl the top 30 token's Total Supply, Holders, Transfers from Etherscan
 */
export default async function main() {
  let data = [];

  let driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://etherscan.io/tokens-nft');

  let tableElement = await driver.findElement(By.css('table.table.table-bordered.table-striped'));
  let trElements = await tableElement.findElements(By.css('tr'));

  trElements = trElements.slice(1, tokenNum + 1);
  for (let i=0; i<trElements.length; i++) {
    let tokenElement = (await trElements[i].findElements(By.css('td')))[2];
    let hexElement = await tokenElement.findElement(By.css('span'));
    let linkElement = await tokenElement.findElement(By.css('a'));
    let nameElement = await tokenElement.findElement(By.css('font'));

    data.push([
      await hexElement.getText(),
      await nameElement.getText(),
      await linkElement.getAttribute('href'),
    ]);
  }

  for (let i=0; i<data.length; i++) {
    console.log(data[i]);
    await driver.get(data[i][2]);

    let tbodyElement = await driver.findElement(By.css('tbody'));

    // get total supply
    let totalSupplyElement = await tbodyElement.findElement(By.css('tr'));
    let tdElement = await totalSupplyElement.findElement(By.css('td.tditem'));
    data[i].push(await tdElement.getText());

    // get price
    let priceElement = await tbodyElement.findElement(By.css('tr#ContentPlaceHolder1_tr_valuepertoken'));
    let tdElements = await priceElement.findElements(By.css('td'));
    data[i].push(await tdElements[1].getText());

    // get holders
    let holderElement = await tbodyElement.findElement(By.css('tr#ContentPlaceHolder1_tr_tokenHolders'));
    tdElements = await holderElement.findElements(By.css('td'));
    data[i].push(await tdElements[1].getText());

    // get transfer
    let transferElement = await tbodyElement.findElement(By.css('span#totaltxns'));
    data[i].push(await transferElement.getText());
  }

  await writeFile('data/tokenTracker', JSON.stringify(data, '', 2));

  for (let i=0; i<data.length; i++) {
    for (let j=0; j<data[i].length; j++) {
      data[i][j] = '\"' + data[i][j] + '\"';
    }

    data[i] = data[i].join(',');
  }

  await writeFile('data/tokenTracker.csv', data.join('\n'));

}
