const {By} = require('selenium-webdriver');
const config = require('../similarweb.json');

/**
 * Sign in to similarweb with username and password in config
 * @param {object} driver Selenium web driver.
 */
async function signInSimilarWeb(driver) {
  await driver.get('https://account.similarweb.com/login');
  await driver.findElement()
}
