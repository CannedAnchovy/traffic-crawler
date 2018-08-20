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
            _context2.next = 6;
            return setTimeInterval(driver, 'Last 6 Months');

          case 6:
            _context2.prev = 6;
            _context2.next = 9;
            return getTotalVisit(driver);

          case 9:
            traffic.totalVisit = _context2.sent;
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](6);

            traffic.success = false;
            console.error(_context2.t0);

          case 16:
            _context2.prev = 16;
            _context2.next = 19;
            return getMarketingMix(driver);

          case 19:
            traffic.marketingMix = _context2.sent;
            _context2.next = 26;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t1 = _context2['catch'](16);

            traffic.success = false;
            console.error(_context2.t1);

          case 26:
            _context2.prev = 26;
            _context2.next = 29;
            return getGeographyRanks(driver);

          case 29:
            traffic.geographyRank = _context2.sent;
            _context2.next = 36;
            break;

          case 32:
            _context2.prev = 32;
            _context2.t2 = _context2['catch'](26);

            traffic.success = false;
            console.error(_context2.t2);

          case 36:
            _context2.prev = 36;
            _context2.next = 39;
            return getReferralRanks(driver);

          case 39:
            traffic.referralRank = _context2.sent;
            _context2.next = 46;
            break;

          case 42:
            _context2.prev = 42;
            _context2.t3 = _context2['catch'](36);

            traffic.success = false;
            console.error(_context2.t3);

          case 46:
            _context2.prev = 46;
            _context2.next = 49;
            return getSocialRanks(driver);

          case 49:
            traffic.socialRank = _context2.sent;
            _context2.next = 56;
            break;

          case 52:
            _context2.prev = 52;
            _context2.t4 = _context2['catch'](46);

            traffic.success = false;
            console.error(_context2.t4);

          case 56:
            _context2.prev = 56;
            _context2.next = 59;
            return getAdRanks(driver);

          case 59:
            traffic.adRank = _context2.sent;
            _context2.next = 66;
            break;

          case 62:
            _context2.prev = 62;
            _context2.t5 = _context2['catch'](56);

            traffic.success = false;
            console.error(_context2.t5);

          case 66:
            _context2.next = 68;
            return clickSideNav(driver, 0, 0);

          case 68:
            _context2.next = 74;
            break;

          case 70:
            _context2.prev = 70;
            _context2.t6 = _context2['catch'](1);

            traffic.success = false;
            console.error(_context2.t6);

          case 74:
            console.log(traffic);
            return _context2.abrupt('return', traffic);

          case 76:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 70], [6, 12], [16, 22], [26, 32], [36, 42], [46, 52], [56, 62]]);
  }));

  return function getTraffic(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Get domain's total visit
 * @param {object} driver Selenium web driver.
 * @return {string} the total visit string
 */


var getTotalVisit = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver) {
    var containerElement, visitElement;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('Getting total visit...');

            _context3.next = 3;
            return clickSideNav(driver, 1, 0);

          case 3:
            containerElement = driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.single-metric-visits-with-share')), waitTime);
            visitElement = containerElement.findElement(_seleniumWebdriver.By.css('div.big-text.u-blueMediumMedium'));
            _context3.next = 7;
            return visitElement.getText();

          case 7:
            return _context3.abrupt('return', _context3.sent);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getTotalVisit(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Get domain's visit source and sources' percentage
 * @param {object} driver Selenium web driver.
 * @return {object} domain's visit source and sources' percentage
 */


var getMarketingMix = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(driver) {
    var chartElement, buttonElements, text, marketingMix, channelTrafficElement, containerElement, percentageElements, i, numberElements, _i;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('Getting marketingMix...');

            _context4.next = 3;
            return clickSideNav(driver, 2, 0);

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

            _context4.t0 = marketingMix.percentage;
            _context4.next = 38;
            return percentageElements[i].getText();

          case 38:
            _context4.t1 = _context4.sent;

            _context4.t0.push.call(_context4.t0, _context4.t1);

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
              _context4.next = 69;
              break;
            }

            _context4.t2 = marketingMix.number;
            _context4.next = 64;
            return numberElements[_i].getText();

          case 64:
            _context4.t3 = _context4.sent;

            _context4.t2.push.call(_context4.t2, _context4.t3);

          case 66:
            _i++;
            _context4.next = 60;
            break;

          case 69:
            return _context4.abrupt('return', marketingMix);

          case 70:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getMarketingMix(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Get the geography ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing ranks name and percentage
 */


var getGeographyRanks = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(driver) {
    var ranks, tableElement, countryElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('Getting geography rank...');

            _context5.next = 3;
            return clickSideNav(driver, 1, 1);

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
            return tableElement.findElements(_seleniumWebdriver.By.css('div.country-text'));

          case 13:
            countryElements = _context5.sent;
            _context5.next = 16;
            return tableElement.findElements(_seleniumWebdriver.By.css('span.min-value'));

          case 16:
            percentageElements = _context5.sent;
            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5['catch'](7);

            console.error(_context5.t0);
            return _context5.abrupt('return', ranks);

          case 23:
            ranksNum = countryElements.length > 10 ? 10 : countryElements.length;
            i = 0;

          case 25:
            if (!(i < ranksNum)) {
              _context5.next = 37;
              break;
            }

            rank = {};
            _context5.next = 29;
            return countryElements[i].getText();

          case 29:
            rank.name = _context5.sent;
            _context5.next = 32;
            return percentageElements[i].getText();

          case 32:
            rank.percentage = _context5.sent;


            ranks.push(rank);

          case 34:
            i++;
            _context5.next = 25;
            break;

          case 37:
            return _context5.abrupt('return', ranks);

          case 38:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[7, 19]]);
  }));

  return function getGeographyRanks(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Get the referral ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing ranks name and percentage
 */


var getReferralRanks = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(driver) {
    var ranks, tableElement, siteElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('Getting referral rank...');

            _context6.next = 3;
            return clickSideNav(driver, 2, 1);

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
            return tableElement.findElements(_seleniumWebdriver.By.css('a.cell-clickable'));

          case 13:
            siteElements = _context6.sent;
            _context6.next = 16;
            return tableElement.findElements(_seleniumWebdriver.By.css('span.min-value'));

          case 16:
            percentageElements = _context6.sent;
            _context6.next = 23;
            break;

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6['catch'](7);

            console.error(_context6.t0);
            return _context6.abrupt('return', ranks);

          case 23:
            ranksNum = siteElements.length > 10 ? 10 : siteElements.length;
            i = 0;

          case 25:
            if (!(i < ranksNum)) {
              _context6.next = 37;
              break;
            }

            rank = {};
            _context6.next = 29;
            return siteElements[i].getText();

          case 29:
            rank.name = _context6.sent;
            _context6.next = 32;
            return percentageElements[i].getText();

          case 32:
            rank.percentage = _context6.sent;


            ranks.push(rank);

          case 34:
            i++;
            _context6.next = 25;
            break;

          case 37:
            return _context6.abrupt('return', ranks);

          case 38:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[7, 19]]);
  }));

  return function getReferralRanks(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Get the referral ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing ranks name and percentage
 */


var getSocialRanks = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(driver) {
    var ranks, element, siteElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log('Getting social rank...');

            _context7.next = 3;
            return clickSideNav(driver, 2, 3);

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
            return driver.wait(_seleniumWebdriver.until.elementIsEnabled(element));

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
            return driver.wait(_seleniumWebdriver.until.elementIsEnabled(element));

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
            ranksNum = siteElements.length > 10 ? 10 : siteElements.length;
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

  return function getSocialRanks(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Get the ad ranks (top 5)
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing ranks name and percentage
 */


var getAdRanks = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(driver) {
    var ranks, element, siteElements, percentageElements, i, rank;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log('Getting ad rank...');

            _context8.next = 3;
            return clickSideNav(driver, 2, 4);

          case 3:
            ranks = [];
            element = void 0;
            siteElements = void 0;
            percentageElements = void 0;
            _context8.prev = 7;
            _context8.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('a.cell-clickable')), waitTime);

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

  return function getAdRanks(_x9) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Set the time interval in similarweb (can only be used after searchDomain())
 * @param {object} driver Selenium web driver.
 * @param {string} timeString The time string (display text) in the dropdown list.
 */


var setTimeInterval = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(driver, timeString) {
    var timeIntervalElement, durationContainer, selectTimeElement, dropdownItems, itemIndex;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.DropdownButton')));

          case 2:
            timeIntervalElement = _context9.sent;
            _context9.next = 5;
            return timeIntervalElement.click();

          case 5:
            _context9.next = 7;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.DurationSelector-container')), waitTime);

          case 7:
            durationContainer = _context9.sent;
            _context9.next = 10;
            return durationContainer.findElement(_seleniumWebdriver.By.css('div.DropdownButton'));

          case 10:
            selectTimeElement = _context9.sent;
            _context9.next = 13;
            return selectTimeElement.click();

          case 13:
            _context9.next = 15;
            return driver.findElements(_seleniumWebdriver.By.css('div.DropdownItem'));

          case 15:
            dropdownItems = _context9.sent;
            _context9.next = 18;
            return getElementIndex(dropdownItems, timeString);

          case 18:
            itemIndex = _context9.sent;
            _context9.next = 21;
            return dropdownItems[itemIndex].click();

          case 21:
            _context9.next = 23;
            return driver.findElement(_seleniumWebdriver.By.css('button.Button.DurationSelector-action-submit')).click();

          case 23:
            _context9.next = 25;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.website-header-title')), waitTime);

          case 25:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function setTimeInterval(_x10, _x11) {
    return _ref9.apply(this, arguments);
  };
}();

/**
 * Search specified domain in similar web
 * @param {object} driver Selenium web driver.
 * @param {string} domain
 */


var searchDomain = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(driver, domain) {
    var searchElement;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            console.log('Searching domain: ' + domain);

            _context10.next = 3;
            return driver.findElement(_seleniumWebdriver.By.css('input.universalInput-input'));

          case 3:
            searchElement = _context10.sent;
            _context10.next = 6;
            return searchElement.click();

          case 6:
            _context10.next = 8;
            return searchElement.sendKeys(domain);

          case 8:
            _context10.next = 10;
            return (0, _utility.sleep)(3000);

          case 10:
            _context10.next = 12;
            return searchElement.sendKeys(_seleniumWebdriver.Key.ENTER);

          case 12:
            _context10.next = 14;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.website-header-title')), waitTime);

          case 14:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function searchDomain(_x12, _x13) {
    return _ref10.apply(this, arguments);
  };
}();

/**
 * Click the side nav link according to listText and itemText
 * (cant use getElementIndex because <a></a> cannot getText())
 * @param {object} driver Selenium web driver.
 * @param {number} listIndex the list index
 * @param {number} itemIndex the item index
 */


var clickSideNav = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(driver, listIndex, itemIndex) {
    var listElements, containerElements, itemElements;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return driver.findElements(_seleniumWebdriver.By.css('div.sc-VJcYb.cOSUNP'));

          case 2:
            listElements = _context11.sent;
            _context11.next = 5;
            return driver.findElements(_seleniumWebdriver.By.css('div.SideNavGroupContainer-glSWhQ.cWqtzl'));

          case 5:
            containerElements = _context11.sent;
            _context11.next = 8;
            return containerElements[listIndex].findElements(_seleniumWebdriver.By.css('a.sc-bsbRJL.jceUKY'));

          case 8:
            itemElements = _context11.sent;
            _context11.prev = 9;
            _context11.next = 12;
            return itemElements[itemIndex].click();

          case 12:
            _context11.next = 20;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11['catch'](9);
            _context11.next = 18;
            return listElements[listIndex].click();

          case 18:
            _context11.next = 20;
            return itemElements[itemIndex].click();

          case 20:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this, [[9, 14]]);
  }));

  return function clickSideNav(_x14, _x15, _x16) {
    return _ref11.apply(this, arguments);
  };
}();

/**
 * return the element index of the specified text
 * @param {array} elements An array of webElement.
 * @param {string} text item text
 * @return {number} The element index of the specified text.
 */


var getElementIndex = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(elements, text) {
    var elementText, i;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            elementText = void 0;
            i = 0;

          case 2:
            if (!(i < elements.length)) {
              _context12.next = 16;
              break;
            }

            _context12.prev = 3;
            _context12.next = 6;
            return elements[i].getText();

          case 6:
            elementText = _context12.sent;

            if (!(elementText === text)) {
              _context12.next = 9;
              break;
            }

            return _context12.abrupt('return', i);

          case 9:
            _context12.next = 13;
            break;

          case 11:
            _context12.prev = 11;
            _context12.t0 = _context12['catch'](3);

          case 13:
            i++;
            _context12.next = 2;
            break;

          case 16:
            return _context12.abrupt('return', -1);

          case 17:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this, [[3, 11]]);
  }));

  return function getElementIndex(_x17, _x18) {
    return _ref12.apply(this, arguments);
  };
}();

var _seleniumWebdriver = require('selenium-webdriver');

var _similarweb = require('../similarweb.json');

var _similarweb2 = _interopRequireDefault(_similarweb);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var waitTime = 20000;