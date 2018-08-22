'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTraffic = exports.signInSimilarWeb = undefined;

/**
 * Sign in to similarweb with username and password in config
 * @param {object} driver Selenium web driver.
 */
var signInSimilarWeb = exports.signInSimilarWeb = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver) {
    var usernameElement, passwordElement;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Logging in to SimilarWeb...');

            _context.next = 3;
            return driver.get('https://account.similarweb.com/login');

          case 3:
            _context.next = 5;
            return driver.findElement(_seleniumWebdriver.By.css('input#UserName--1'));

          case 5:
            usernameElement = _context.sent;
            _context.next = 8;
            return usernameElement.sendKeys(_similarweb2.default.username);

          case 8:
            _context.next = 10;
            return driver.findElement(_seleniumWebdriver.By.css('input#Password--2'));

          case 10:
            passwordElement = _context.sent;
            _context.next = 13;
            return passwordElement.sendKeys(_similarweb2.default.password, _seleniumWebdriver.Key.ENTER);

          case 13:
            _context.next = 15;
            return driver.wait(_seleniumWebdriver.until.titleIs('SimilarWeb Home'), 100000);

          case 15:

            console.log('Logged in!');

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function signInSimilarWeb(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get domain traffic info
 * 1. total visit
 * 2. marketMix
 * 3. ranks
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name which you want to get traffic
 * @return {object} traffic data
 */


var getTraffic = exports.getTraffic = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver, domain) {
    var traffic;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            traffic = {
              success: true,
              successDate: '',
              totalVisit: '',
              marketingMix: {},
              geographyRank: [],
              referralRank: [],
              socialRank: [],
              adRank: []
            };

            //

            _context2.prev = 1;
            _context2.next = 4;
            return searchDomain(driver, domain);

          case 4:
            domain = _context2.sent;
            _context2.prev = 5;
            _context2.next = 8;
            return getTotalVisit(driver, domain);

          case 8:
            traffic.totalVisit = _context2.sent;
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](5);

            traffic.success = false;
            console.error(_context2.t0);

          case 15:
            _context2.prev = 15;
            _context2.next = 18;
            return getMarketingMix(driver, domain);

          case 18:
            traffic.marketingMix = _context2.sent;
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t1 = _context2['catch'](15);

            traffic.success = false;
            console.error(_context2.t1);

          case 25:
            _context2.prev = 25;
            _context2.next = 28;
            return getGeographyRanks(driver, domain);

          case 28:
            traffic.geographyRank = _context2.sent;
            _context2.next = 35;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t2 = _context2['catch'](25);

            traffic.success = false;
            console.error(_context2.t2);

          case 35:
            _context2.prev = 35;
            _context2.next = 38;
            return getReferralRanks(driver, domain);

          case 38:
            traffic.referralRank = _context2.sent;
            _context2.next = 45;
            break;

          case 41:
            _context2.prev = 41;
            _context2.t3 = _context2['catch'](35);

            traffic.success = false;
            console.error(_context2.t3);

          case 45:
            _context2.prev = 45;
            _context2.next = 48;
            return getSocialRanks(driver, domain);

          case 48:
            traffic.socialRank = _context2.sent;
            _context2.next = 55;
            break;

          case 51:
            _context2.prev = 51;
            _context2.t4 = _context2['catch'](45);

            traffic.success = false;
            console.error(_context2.t4);

          case 55:
            _context2.prev = 55;
            _context2.next = 58;
            return getAdRanks(driver, domain);

          case 58:
            traffic.adRank = _context2.sent;
            _context2.next = 65;
            break;

          case 61:
            _context2.prev = 61;
            _context2.t5 = _context2['catch'](55);

            traffic.success = false;
            console.error(_context2.t5);

          case 65:
            _context2.next = 71;
            break;

          case 67:
            _context2.prev = 67;
            _context2.t6 = _context2['catch'](1);

            console.error(_context2.t6);
            traffic.success = false;

          case 71:

            calculateTrafficNumbers(traffic);
            traffic.successDate = new Date();
            console.log(traffic);

            _context2.next = 76;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/6m?webSource=Total');

          case 76:
            return _context2.abrupt('return', traffic);

          case 77:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 67], [5, 11], [15, 21], [25, 31], [35, 41], [45, 51], [55, 61]]);
  }));

  return function getTraffic(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Get domain's total visit
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {string} the total visit string
 */


var getTotalVisit = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver, domain) {
    var visitElement, text;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('Getting total visit...');

            _context3.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/audience-overview/' + domain + '/*/999/6m/?webSource=Total');

          case 3:
            visitElement = driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.big-text.u-blueMediumMedium')));
            // let visitElement = containerElement.findElement(By.css('div.big-text.u-blueMediumMedium'));

            _context3.next = 6;
            return visitElement.getText();

          case 6:
            text = _context3.sent;
            return _context3.abrupt('return', text);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getTotalVisit(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Get domain's visit source and sources' percentage
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {object} domain's visit source and sources' percentage
 */


var getMarketingMix = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(driver, domain) {
    var chartElement, buttonElements, text, marketingMix, channelTrafficElement, containerElement, percentageElements, i, numberElements, _i;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('Getting marketing mix...');

            _context4.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/traffic-overview/' + domain + '/*/999/6m?category=no-category');

          case 3:
            _context4.next = 5;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.swWidget-frame.swWidget-frame--noBottomPadding')), waitTime);

          case 5:
            chartElement = _context4.sent;
            _context4.next = 8;
            return chartElement.findElements(_seleniumWebdriver.By.css('button.circle-item'));

          case 8:
            buttonElements = _context4.sent;
            text = void 0;
            marketingMix = {
              channelTraffic: '',
              percentage: [],
              number: []
            };

            // get channel total traffic

            _context4.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.u-blueMediumMedium.big-number')));

          case 13:
            channelTrafficElement = _context4.sent;
            _context4.next = 16;
            return channelTrafficElement.getText();

          case 16:
            marketingMix.channelTraffic = _context4.sent;
            _context4.next = 19;
            return buttonElements[0].click();

          case 19:
            _context4.next = 21;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.highcharts-data-labels')), waitTime);

          case 21:
            containerElement = _context4.sent;
            _context4.next = 24;
            return containerElement.findElements(_seleniumWebdriver.By.css('span'));

          case 24:
            percentageElements = _context4.sent;

          case 25:
            if (!true) {
              _context4.next = 33;
              break;
            }

            _context4.next = 28;
            return percentageElements[0].getText();

          case 28:
            text = _context4.sent;

            if (!(text !== '')) {
              _context4.next = 31;
              break;
            }

            return _context4.abrupt('break', 33);

          case 31:
            _context4.next = 25;
            break;

          case 33:
            i = 0;

          case 34:
            if (!(i < percentageElements.length)) {
              _context4.next = 43;
              break;
            }

            _context4.next = 37;
            return percentageElements[i].getText();

          case 37:
            text = _context4.sent;

            if (text === '0') text += '%';
            marketingMix.percentage.push(text);

          case 40:
            i++;
            _context4.next = 34;
            break;

          case 43:
            _context4.next = 45;
            return buttonElements[1].click();

          case 45:
            _context4.next = 47;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.highcharts-data-labels')), waitTime);

          case 47:
            containerElement = _context4.sent;
            _context4.next = 50;
            return containerElement.findElements(_seleniumWebdriver.By.css('span'));

          case 50:
            numberElements = _context4.sent;

          case 51:
            if (!true) {
              _context4.next = 59;
              break;
            }

            _context4.next = 54;
            return numberElements[0].getText();

          case 54:
            text = _context4.sent;

            if (!(text !== '')) {
              _context4.next = 57;
              break;
            }

            return _context4.abrupt('break', 59);

          case 57:
            _context4.next = 51;
            break;

          case 59:
            _i = 0;

          case 60:
            if (!(_i < percentageElements.length)) {
              _context4.next = 68;
              break;
            }

            _context4.next = 63;
            return numberElements[_i].getText();

          case 63:
            text = _context4.sent;

            marketingMix.number.push(text);

          case 65:
            _i++;
            _context4.next = 60;
            break;

          case 68:
            return _context4.abrupt('return', marketingMix);

          case 69:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getMarketingMix(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Get the geography ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */


var getGeographyRanks = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(driver, domain) {
    var ranks, tableElement, countryElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('Getting geography rank...');

            _context5.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/audience-geography/' + domain + '/*/999/6m');

          case 3:
            ranks = [];
            tableElement = void 0;
            countryElements = void 0;
            percentageElements = void 0;
            _context5.prev = 7;
            _context5.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.swReactTable-wrapper')), waitTime);

          case 10:
            tableElement = _context5.sent;
            _context5.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementIsVisible(tableElement));

          case 13:
            _context5.next = 15;
            return tableElement.findElements(_seleniumWebdriver.By.css('div.country-text'));

          case 15:
            countryElements = _context5.sent;
            _context5.next = 18;
            return tableElement.findElements(_seleniumWebdriver.By.css('span.min-value'));

          case 18:
            percentageElements = _context5.sent;
            _context5.next = 27;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5['catch'](7);

            console.error(_context5.t0);
            _context5.next = 26;
            return clickSideNav(driver, 2);

          case 26:
            return _context5.abrupt('return', ranks);

          case 27:

            // let ranksNum = (countryElements.length > 10)? 10 : countryElements.length;
            ranksNum = countryElements.length;
            i = 0;

          case 29:
            if (!(i < ranksNum)) {
              _context5.next = 41;
              break;
            }

            rank = {};
            _context5.next = 33;
            return countryElements[i].getText();

          case 33:
            rank.name = _context5.sent;
            _context5.next = 36;
            return percentageElements[i].getText();

          case 36:
            rank.percentage = _context5.sent;


            ranks.push(rank);

          case 38:
            i++;
            _context5.next = 29;
            break;

          case 41:
            return _context5.abrupt('return', ranks);

          case 42:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[7, 21]]);
  }));

  return function getGeographyRanks(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Get the referral ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */


var getReferralRanks = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(driver, domain) {
    var ranks, tableElement, siteElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('Getting referral rank...');

            _context6.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/traffic-referrals/' + domain + '/*/999/6m?webSource=Desktop');

          case 3:
            ranks = [];
            tableElement = void 0;
            siteElements = void 0;
            percentageElements = void 0;
            _context6.prev = 7;
            _context6.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.swReactTable-wrapper')), waitTime);

          case 10:
            tableElement = _context6.sent;
            _context6.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementIsVisible(tableElement));

          case 13:
            _context6.next = 15;
            return tableElement.findElements(_seleniumWebdriver.By.css('a.cell-clickable'));

          case 15:
            siteElements = _context6.sent;
            _context6.next = 18;
            return tableElement.findElements(_seleniumWebdriver.By.css('span.min-value'));

          case 18:
            percentageElements = _context6.sent;
            _context6.next = 25;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6['catch'](7);

            console.error(_context6.t0);
            return _context6.abrupt('return', ranks);

          case 25:

            // let ranksNum = (siteElements.length > 10)? 10 : siteElements.length;
            ranksNum = siteElements.length;
            i = 0;

          case 27:
            if (!(i < ranksNum)) {
              _context6.next = 39;
              break;
            }

            rank = {};
            _context6.next = 31;
            return siteElements[i].getText();

          case 31:
            rank.name = _context6.sent;
            _context6.next = 34;
            return percentageElements[i].getText();

          case 34:
            rank.percentage = _context6.sent;


            ranks.push(rank);

          case 36:
            i++;
            _context6.next = 27;
            break;

          case 39:
            return _context6.abrupt('return', ranks);

          case 40:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[7, 21]]);
  }));

  return function getReferralRanks(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Get the referral ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */


var getSocialRanks = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(driver, domain) {
    var ranks, element, siteElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log('Getting social rank...');

            _context7.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/traffic-social/' + domain + '/*/999/6m');

          case 3:
            ranks = [];
            element = void 0;
            siteElements = void 0;
            percentageElements = void 0;
            _context7.prev = 7;
            _context7.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('span.swTable-content.text-select')), waitTime);

          case 10:
            element = _context7.sent;
            _context7.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementIsVisible(element));

          case 13:
            _context7.next = 15;
            return driver.findElements(_seleniumWebdriver.By.css('span.swTable-content.text-select'));

          case 15:
            siteElements = _context7.sent;
            _context7.next = 18;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('span.min-value')), waitTime);

          case 18:
            element = _context7.sent;
            _context7.next = 21;
            return driver.wait(_seleniumWebdriver.until.elementIsVisible(element));

          case 21:
            _context7.next = 23;
            return driver.findElements(_seleniumWebdriver.By.css('span.min-value'));

          case 23:
            percentageElements = _context7.sent;
            _context7.next = 30;
            break;

          case 26:
            _context7.prev = 26;
            _context7.t0 = _context7['catch'](7);

            console.error(_context7.t0);
            return _context7.abrupt('return', ranks);

          case 30:

            // let ranksNum = (siteElements.length > 10)? 10 : siteElements.length;
            ranksNum = siteElements.length;
            i = 0;

          case 32:
            if (!(i < ranksNum)) {
              _context7.next = 44;
              break;
            }

            rank = {};
            _context7.next = 36;
            return siteElements[i].getText();

          case 36:
            rank.name = _context7.sent;
            _context7.next = 39;
            return percentageElements[i].getText();

          case 39:
            rank.percentage = _context7.sent;


            ranks.push(rank);

          case 41:
            i++;
            _context7.next = 32;
            break;

          case 44:
            return _context7.abrupt('return', ranks);

          case 45:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this, [[7, 26]]);
  }));

  return function getSocialRanks(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Get the ad ranks (top 5)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */


var getAdRanks = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(driver, domain) {
    var ranks, element, siteElements, percentageElements, i, rank;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log('Getting ad rank...');

            _context8.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/traffic-display/' + domain + '/*/999/6m?selectedTab=overview&webSource=Desktop');

          case 3:
            ranks = [];
            element = void 0;
            siteElements = void 0;
            percentageElements = void 0;
            _context8.prev = 7;
            _context8.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('a.cell-clickable')), 5000);

          case 10:
            element = _context8.sent;
            _context8.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementIsEnabled(element));

          case 13:
            _context8.next = 15;
            return driver.findElements(_seleniumWebdriver.By.css('a.cell-clickable'));

          case 15:
            siteElements = _context8.sent;
            _context8.next = 18;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('span.min-value')), waitTime);

          case 18:
            element = _context8.sent;
            _context8.next = 21;
            return driver.wait(_seleniumWebdriver.until.elementIsEnabled(element));

          case 21:
            _context8.next = 23;
            return driver.findElements(_seleniumWebdriver.By.css('span.min-value'));

          case 23:
            percentageElements = _context8.sent;
            _context8.next = 30;
            break;

          case 26:
            _context8.prev = 26;
            _context8.t0 = _context8['catch'](7);

            console.error(_context8.t0);
            return _context8.abrupt('return', ranks);

          case 30:
            i = 0;

          case 31:
            if (!(i < siteElements.length)) {
              _context8.next = 43;
              break;
            }

            rank = {};
            _context8.next = 35;
            return siteElements[i].getText();

          case 35:
            rank.name = _context8.sent;
            _context8.next = 38;
            return percentageElements[i].getText();

          case 38:
            rank.percentage = _context8.sent;


            ranks.push(rank);

          case 40:
            i++;
            _context8.next = 31;
            break;

          case 43:
            return _context8.abrupt('return', ranks);

          case 44:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this, [[7, 26]]);
  }));

  return function getAdRanks(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Calculate numbers in traffic data based on total number and percentage
 * @param {object} traffic Data structures that stores traffic data
 */


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
var searchDomain = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(driver, domain) {
    var searchElement, url;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log('Searching domain: ' + domain);

            _context9.next = 3;
            return driver.findElement(_seleniumWebdriver.By.css('input.universalInput-input'));

          case 3:
            searchElement = _context9.sent;
            _context9.next = 6;
            return searchElement.click();

          case 6:
            _context9.next = 8;
            return searchElement.sendKeys(domain);

          case 8:
            _context9.next = 10;
            return (0, _utility.sleep)(3000);

          case 10:
            _context9.next = 12;
            return searchElement.sendKeys(_seleniumWebdriver.Key.ENTER);

          case 12:
            _context9.next = 14;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.website-header-title')), waitTime);

          case 14:
            _context9.next = 16;
            return driver.getCurrentUrl();

          case 16:
            url = _context9.sent;
            return _context9.abrupt('return', url.split('/')[6]);

          case 18:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function searchDomain(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();

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
 * return the element index of the specified text
 * @param {array} elements An array of webElement.
 * @param {string} text item text
 * @return {number} The element index of the specified text.
 */


var getElementIndex = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(elements, text) {
    var elementText, i;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            elementText = void 0;
            i = 0;

          case 2:
            if (!(i < elements.length)) {
              _context10.next = 16;
              break;
            }

            _context10.prev = 3;
            _context10.next = 6;
            return elements[i].getText();

          case 6:
            elementText = _context10.sent;

            if (!(elementText === text)) {
              _context10.next = 9;
              break;
            }

            return _context10.abrupt('return', i);

          case 9:
            _context10.next = 13;
            break;

          case 11:
            _context10.prev = 11;
            _context10.t0 = _context10['catch'](3);

          case 13:
            i++;
            _context10.next = 2;
            break;

          case 16:
            return _context10.abrupt('return', -1);

          case 17:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this, [[3, 11]]);
  }));

  return function getElementIndex(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();

/**
 * Calculate each rank element's number based on numberString and element's percentage
 * @param {string} numberString number string
 * @param {array} rank Array of objects that contain rank info
 */


exports.calculateTrafficNumbers = calculateTrafficNumbers;

var _seleniumWebdriver = require('selenium-webdriver');

var _similarweb = require('../../../Work/Cobinhood/similarweb.json');

var _similarweb2 = _interopRequireDefault(_similarweb);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var waitTime = 20000;function calculateTrafficNumbers(traffic) {
  console.log('Calculating traffic numbers...');

  if (!traffic.success) {
    console.log('Traffic data of this ico event is not complete.');
    return;
  }

  // calculate geography rank number
  calculateNumberInRank(traffic.marketingMix.number[0], traffic.geographyRank);

  // referral referral rank number
  calculateNumberInRank(traffic.marketingMix.number[2], traffic.referralRank);

  // referral social rank number
  calculateNumberInRank(traffic.marketingMix.number[3], traffic.socialRank);

  // referral geography rank number
  calculateNumberInRank(traffic.marketingMix.number[6], traffic.adRank);
}function calculateNumberInRank(numberString, rank) {
  var number = getNum(numberString);
  for (var i = 0; i < rank.length; i++) {
    rank[i].number = (number * getPercentage(rank[i].percentage)).toFixed(2);
  }
}
/**
 * convert similarweb marketing mix number string to number
 * @param {string} numString number string
 * @return {number} number of numString
 */
function getNum(numString) {
  var num = void 0;
  if (numString === '0') return 0;

  // get rid of '<'
  if (numString[0] === '<') numString = numString.slice(2);

  // get rid of 'K' and 'M'
  if (numString.includes('K')) {
    numString = numString.slice(0, numString.length - 1);
    num = Number(numString) * 1000;
  } else if (numString.includes('M')) {
    numString = numString.slice(0, numString.length - 1);
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
  percentageString = percentageString.slice(0, percentageString.length - 1);
  return Number(percentageString) / 100;
}