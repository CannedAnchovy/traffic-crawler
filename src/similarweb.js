import {By} from 'selenium-webdriver'
import config from '../similarweb.json';

/**
 * Sign in to similarweb with username and password in config
 * @param {object} driver Selenium web driver.
 */
async function signInSimilarWeb(driver) {
  console.log('Logging in to SimilarWeb...');

  await driver.get('https://account.similarweb.com/login');
  let userNameElement = await driver.findElement(By.css('input#UserName--1'));
  userNameElement.sendKeys(config.username);
}
