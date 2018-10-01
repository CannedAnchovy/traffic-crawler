'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTraffic = exports.crawlListTraffic = undefined;

/**
 * Sign in to similarweb with username and password in config
 * @param {object} driver Selenium web driver.
 * @param {string} type 'similarweb' or 'google'
 */
var signInSimilarWeb = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver, type) {
    var usernameElement, passwordElement, googleButtonElement, emailElement, continueElements, _passwordElement, tokenElement, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Logging in to SimilarWeb...');

            _context.next = 3;
            return driver.get('https://account.similarweb.com/login');

          case 3:
            if (!(type === 'similarweb')) {
              _context.next = 16;
              break;
            }

            _context.next = 6;
            return driver.findElement(_seleniumWebdriver.By.css('input#UserName--1'));

          case 6:
            usernameElement = _context.sent;
            _context.next = 9;
            return usernameElement.sendKeys(_similarweb2.default.username);

          case 9:
            _context.next = 11;
            return driver.findElement(_seleniumWebdriver.By.css('input#Password--2'));

          case 11:
            passwordElement = _context.sent;
            _context.next = 14;
            return passwordElement.sendKeys(_similarweb2.default.password, _seleniumWebdriver.Key.ENTER);

          case 14:
            _context.next = 57;
            break;

          case 16:
            if (!(type === 'google')) {
              _context.next = 57;
              break;
            }

            _context.next = 19;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('button.social-form__social-button.social-form__social-button--google')), waitTime);

          case 19:
            googleButtonElement = _context.sent;
            _context.next = 22;
            return googleButtonElement.click();

          case 22:
            _context.next = 24;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('input#identifierId')), waitTime);

          case 24:
            emailElement = _context.sent;
            _context.next = 27;
            return emailElement.sendKeys(_similarweb2.default.username);

          case 27:
            _context.next = 29;
            return driver.findElements(_seleniumWebdriver.By.css('span.RveJvd.snByac'));

          case 29:
            continueElements = _context.sent;
            _context.next = 32;
            return continueElements[1].click();

          case 32:
            _context.next = 34;
            return (0, _utility.sleep)(3000);

          case 34:
            _context.next = 36;
            return driver.findElements(_seleniumWebdriver.By.css('input.whsOnd.zHQkBf'));

          case 36:
            _passwordElement = _context.sent;
            _context.next = 39;
            return _passwordElement[0].sendKeys(_similarweb2.default.password);

          case 39:
            _context.next = 41;
            return driver.findElements(_seleniumWebdriver.By.css('span.RveJvd.snByac'));

          case 41:
            continueElements = _context.sent;
            _context.next = 44;
            return continueElements[0].click();

          case 44:
            _context.next = 46;
            return (0, _utility.sleep)(3000);

          case 46:
            _context.next = 48;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('input#totpPin')), waitTime);

          case 48:
            tokenElement = _context.sent;
            token = (0, _utility.getGoogle2faToken)(_similarweb2.default.secret);
            _context.next = 52;
            return tokenElement.sendKeys(token);

          case 52:
            _context.next = 54;
            return driver.findElements(_seleniumWebdriver.By.css('span.RveJvd.snByac'));

          case 54:
            continueElements = _context.sent;
            _context.next = 57;
            return continueElements[0].click();

          case 57:
            _context.next = 59;
            return driver.wait(_seleniumWebdriver.until.titleIs('SimilarWeb Home'), 100000);

          case 59:

            console.log('Logged in!');

          case 60:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function signInSimilarWeb(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Crawl list item traffic from similarweb and modify crawllist directly.
 * @param {object} driver Selenium web driver.
 * @param {object} crawlList An object containing crawler status and list data.
 * @param {func} getData function that returns data segment in the crawlList data structure
 * @param {string} fileName output fileName
 */


var crawlListTraffic = exports.crawlListTraffic = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver, crawlList, getData, fileName) {
    var item, list, i;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('Crawl traffic from similar web...');

            item = void 0;
            list = getData(crawlList);
            _context2.next = 5;
            return signInSimilarWeb(driver, 'google');

          case 5:
            i = 0;

          case 6:
            if (!(i < list.length)) {
              _context2.next = 20;
              break;
            }

            console.log(i);

            if (!(list[i].hasOwnProperty('traffic') && list[i].traffic.success)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt('continue', 17);

          case 10:
            item = list[i];

            console.log('Crawling ' + item.name + ' traffic...');
            _context2.next = 14;
            return getTraffic(driver, (0, _utility.getDomainName)(item.url));

          case 14:
            item.traffic = _context2.sent;
            _context2.next = 17;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(crawlList, null, 2));

          case 17:
            i++;
            _context2.next = 6;
            break;

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function crawlListTraffic(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
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
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver, domain) {
    var traffic;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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

            _context3.prev = 1;
            _context3.next = 4;
            return searchDomain(driver, domain);

          case 4:
            domain = _context3.sent;
            _context3.prev = 5;
            _context3.next = 8;
            return getTotalVisit(driver, domain);

          case 8:
            traffic.totalVisit = _context3.sent;
            _context3.next = 19;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3['catch'](5);

            traffic.success = _context3.t0.message === 'domain not found';
            console.error(_context3.t0);
            _context3.next = 17;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

          case 17:

            console.log(traffic);
            return _context3.abrupt('return', traffic);

          case 19:
            _context3.prev = 19;
            _context3.next = 22;
            return getMarketingMix(driver, domain);

          case 22:
            traffic.marketingMix = _context3.sent;
            _context3.next = 33;
            break;

          case 25:
            _context3.prev = 25;
            _context3.t1 = _context3['catch'](19);

            traffic.success = false;
            console.error(_context3.t1);
            _context3.next = 31;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

          case 31:

            console.log(traffic);
            return _context3.abrupt('return', traffic);

          case 33:
            _context3.prev = 33;
            _context3.next = 36;
            return getGeographyRanks(driver, domain);

          case 36:
            traffic.geographyRank = _context3.sent;
            _context3.next = 47;
            break;

          case 39:
            _context3.prev = 39;
            _context3.t2 = _context3['catch'](33);

            traffic.success = false;
            console.error(_context3.t2);
            _context3.next = 45;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

          case 45:

            console.log(traffic);
            return _context3.abrupt('return', traffic);

          case 47:
            _context3.prev = 47;
            _context3.next = 50;
            return getReferralRanks(driver, domain);

          case 50:
            traffic.referralRank = _context3.sent;
            _context3.next = 61;
            break;

          case 53:
            _context3.prev = 53;
            _context3.t3 = _context3['catch'](47);

            traffic.success = false;
            console.error(_context3.t3);
            _context3.next = 59;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

          case 59:

            console.log(traffic);
            return _context3.abrupt('return', traffic);

          case 61:
            _context3.prev = 61;
            _context3.next = 64;
            return getSocialRanks(driver, domain);

          case 64:
            traffic.socialRank = _context3.sent;
            _context3.next = 75;
            break;

          case 67:
            _context3.prev = 67;
            _context3.t4 = _context3['catch'](61);

            traffic.success = false;
            console.error(_context3.t4);
            _context3.next = 73;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

          case 73:

            console.log(traffic);
            return _context3.abrupt('return', traffic);

          case 75:
            _context3.prev = 75;
            _context3.next = 78;
            return getAdRanks(driver, domain);

          case 78:
            traffic.adRank = _context3.sent;
            _context3.next = 89;
            break;

          case 81:
            _context3.prev = 81;
            _context3.t5 = _context3['catch'](75);

            traffic.success = false;
            console.error(_context3.t5);
            _context3.next = 87;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

          case 87:

            console.log(traffic);
            return _context3.abrupt('return', traffic);

          case 89:
            _context3.next = 99;
            break;

          case 91:
            _context3.prev = 91;
            _context3.t6 = _context3['catch'](1);

            traffic.success = false;
            console.error(_context3.t6);
            _context3.next = 97;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

          case 97:

            console.log(traffic);
            return _context3.abrupt('return', traffic);

          case 99:

            calculateTrafficNumbers(traffic);
            traffic.successDate = new Date();

            _context3.next = 103;
            return driver.get('https://pro.similarweb.com/#/website/worldwide-overview/' + domain + '/*/999/' + timeInterval + '?webSource=Total');

          case 103:

            console.log(traffic);
            return _context3.abrupt('return', traffic);

          case 105:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 91], [5, 11], [19, 25], [33, 39], [47, 53], [61, 67], [75, 81]]);
  }));

  return function getTraffic(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Get domain's total visit
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {string} the total visit string
 */


var getTotalVisit = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(driver, domain) {
    var visitElement, text, i;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('Getting total visit...');

            _context4.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/audience-overview/' + domain + '/*/999/' + timeInterval + '/?webSource=Total');

          case 3:
            visitElement = driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.big-text.u-blueMediumMedium')), waitTime);
            _context4.next = 6;
            return visitElement.getText();

          case 6:
            text = _context4.sent;
            i = 0;

          case 8:
            if (!(i < 5)) {
              _context4.next = 19;
              break;
            }

            _context4.next = 11;
            return visitElement.getText();

          case 11:
            text = _context4.sent;

            if (!(text !== '')) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt('return', text);

          case 14:
            _context4.next = 16;
            return (0, _utility.sleep)(4000);

          case 16:
            i++;
            _context4.next = 8;
            break;

          case 19:
            _context4.next = 21;
            return visitElement.getText();

          case 21:
            text = _context4.sent;

            if (!(text === '')) {
              _context4.next = 24;
              break;
            }

            throw new Error('domain not found');

          case 24:
            return _context4.abrupt('return', text);

          case 25:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getTotalVisit(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Get domain's visit source and sources' percentage
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {object} domain's visit source and sources' percentage
 */


var getMarketingMix = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(driver, domain) {
    var chartElement, buttonElements, text, marketingMix, channelTrafficElement, containerElement, percentageElements, i, numberElements, _i;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('Getting marketing mix...');

            _context5.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/traffic-overview/' + domain + '/*/999/' + timeInterval + '?category=no-category');

          case 3:
            _context5.next = 5;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.swWidget-frame.swWidget-frame--noBottomPadding')), waitTime);

          case 5:
            chartElement = _context5.sent;
            _context5.next = 8;
            return chartElement.findElements(_seleniumWebdriver.By.css('button.sc-qrIAp'));

          case 8:
            buttonElements = _context5.sent;
            text = void 0;
            marketingMix = {
              channelTraffic: '',
              percentages: [],
              numbers: []
            };

            // get channel total traffic

            _context5.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.u-blueMediumMedium.big-number')));

          case 13:
            channelTrafficElement = _context5.sent;
            _context5.next = 16;
            return channelTrafficElement.getText();

          case 16:
            marketingMix.channelTraffic = _context5.sent;
            _context5.next = 19;
            return buttonElements[0].click();

          case 19:
            _context5.next = 21;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.highcharts-data-labels')), waitTime);

          case 21:
            containerElement = _context5.sent;
            _context5.next = 24;
            return containerElement.findElements(_seleniumWebdriver.By.css('span'));

          case 24:
            percentageElements = _context5.sent;

          case 25:
            if (!true) {
              _context5.next = 33;
              break;
            }

            _context5.next = 28;
            return percentageElements[0].getText();

          case 28:
            text = _context5.sent;

            if (!(text !== '')) {
              _context5.next = 31;
              break;
            }

            return _context5.abrupt('break', 33);

          case 31:
            _context5.next = 25;
            break;

          case 33:
            i = 0;

          case 34:
            if (!(i < percentageElements.length)) {
              _context5.next = 43;
              break;
            }

            _context5.next = 37;
            return percentageElements[i].getText();

          case 37:
            text = _context5.sent;

            if (text === '0') text += '%';
            marketingMix.percentages.push(text);

          case 40:
            i++;
            _context5.next = 34;
            break;

          case 43:
            _context5.next = 45;
            return buttonElements[1].click();

          case 45:
            _context5.next = 47;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.highcharts-data-labels')), waitTime);

          case 47:
            containerElement = _context5.sent;
            _context5.next = 50;
            return containerElement.findElements(_seleniumWebdriver.By.css('span'));

          case 50:
            numberElements = _context5.sent;

          case 51:
            if (!true) {
              _context5.next = 59;
              break;
            }

            _context5.next = 54;
            return numberElements[0].getText();

          case 54:
            text = _context5.sent;

            if (!(text !== '')) {
              _context5.next = 57;
              break;
            }

            return _context5.abrupt('break', 59);

          case 57:
            _context5.next = 51;
            break;

          case 59:
            _i = 0;

          case 60:
            if (!(_i < percentageElements.length)) {
              _context5.next = 68;
              break;
            }

            _context5.next = 63;
            return numberElements[_i].getText();

          case 63:
            text = _context5.sent;

            marketingMix.numbers.push(text);

          case 65:
            _i++;
            _context5.next = 60;
            break;

          case 68:
            return _context5.abrupt('return', marketingMix);

          case 69:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getMarketingMix(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Get the geography ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */


var getGeographyRanks = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(driver, domain) {
    var ranks, tableElement, countryElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('Getting geography rank...');

            _context6.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/audience-geography/' + domain + '/*/999/' + timeInterval + '');

          case 3:
            ranks = [];
            tableElement = void 0;
            countryElements = void 0;
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
            return tableElement.findElements(_seleniumWebdriver.By.css('div.country-text'));

          case 15:
            countryElements = _context6.sent;
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

            // let ranksNum = (countryElements.length > 10)? 10 : countryElements.length;
            ranksNum = countryElements.length;
            i = 0;

          case 27:
            if (!(i < ranksNum)) {
              _context6.next = 39;
              break;
            }

            rank = {};
            _context6.next = 31;
            return countryElements[i].getText();

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

  return function getGeographyRanks(_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Get the referral ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */


var getReferralRanks = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(driver, domain) {
    var ranks, tableElement, siteElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log('Getting referral rank...');

            _context7.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/traffic-referrals/' + domain + '/*/999/' + timeInterval + '?webSource=Desktop');

          case 3:
            ranks = [];
            tableElement = void 0;
            siteElements = void 0;
            percentageElements = void 0;
            _context7.prev = 7;
            _context7.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.swReactTable-wrapper')), waitTime);

          case 10:
            tableElement = _context7.sent;
            _context7.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementIsVisible(tableElement));

          case 13:
            _context7.next = 15;
            return tableElement.findElements(_seleniumWebdriver.By.css('a.cell-clickable'));

          case 15:
            siteElements = _context7.sent;
            _context7.next = 18;
            return tableElement.findElements(_seleniumWebdriver.By.css('span.min-value'));

          case 18:
            percentageElements = _context7.sent;
            _context7.next = 25;
            break;

          case 21:
            _context7.prev = 21;
            _context7.t0 = _context7['catch'](7);

            console.error(_context7.t0);
            return _context7.abrupt('return', ranks);

          case 25:

            // let ranksNum = (siteElements.length > 10)? 10 : siteElements.length;
            ranksNum = siteElements.length;
            i = 0;

          case 27:
            if (!(i < ranksNum)) {
              _context7.next = 39;
              break;
            }

            rank = {};
            _context7.next = 31;
            return siteElements[i].getText();

          case 31:
            rank.name = _context7.sent;
            _context7.next = 34;
            return percentageElements[i].getText();

          case 34:
            rank.percentage = _context7.sent;


            ranks.push(rank);

          case 36:
            i++;
            _context7.next = 27;
            break;

          case 39:
            return _context7.abrupt('return', ranks);

          case 40:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this, [[7, 21]]);
  }));

  return function getReferralRanks(_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Get the referral ranks (top 10)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */


var getSocialRanks = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(driver, domain) {
    var ranks, element, siteElements, percentageElements, ranksNum, i, rank;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log('Getting social rank...');

            _context8.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/traffic-social/' + domain + '/*/999/' + timeInterval);

          case 3:
            ranks = [];
            element = void 0;
            siteElements = void 0;
            percentageElements = void 0;
            _context8.prev = 7;
            _context8.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('span.swTable-content.text-select')), waitTime);

          case 10:
            element = _context8.sent;
            _context8.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementIsVisible(element));

          case 13:
            _context8.next = 15;
            return driver.findElements(_seleniumWebdriver.By.css('span.swTable-content.text-select'));

          case 15:
            siteElements = _context8.sent;
            _context8.next = 18;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('span.min-value')), waitTime);

          case 18:
            element = _context8.sent;
            _context8.next = 21;
            return driver.wait(_seleniumWebdriver.until.elementIsVisible(element));

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

            // let ranksNum = (siteElements.length > 10)? 10 : siteElements.length;
            ranksNum = siteElements.length;
            i = 0;

          case 32:
            if (!(i < ranksNum)) {
              _context8.next = 44;
              break;
            }

            rank = {};
            _context8.next = 36;
            return siteElements[i].getText();

          case 36:
            rank.name = _context8.sent;
            _context8.next = 39;
            return percentageElements[i].getText();

          case 39:
            rank.percentage = _context8.sent;


            ranks.push(rank);

          case 41:
            i++;
            _context8.next = 32;
            break;

          case 44:
            return _context8.abrupt('return', ranks);

          case 45:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this, [[7, 26]]);
  }));

  return function getSocialRanks(_x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Get the ad ranks (top 5)
 * @param {object} driver Selenium web driver.
 * @param {string} domain domain name
 * @return {array} An array containing ranks name and percentage
 */


var getAdRanks = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(driver, domain) {
    var ranks, element, siteElements, percentageElements, i, rank;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log('Getting ad rank...');

            _context9.next = 3;
            return driver.get('https://pro.similarweb.com/#/website/traffic-display/' + domain + '/*/999/' + timeInterval + '?selectedTab=overview&webSource=Desktop');

          case 3:
            ranks = [];
            element = void 0;
            siteElements = void 0;
            percentageElements = void 0;
            _context9.prev = 7;
            _context9.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('a.cell-clickable')), 5000);

          case 10:
            element = _context9.sent;
            _context9.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementIsEnabled(element));

          case 13:
            _context9.next = 15;
            return driver.findElements(_seleniumWebdriver.By.css('a.cell-clickable'));

          case 15:
            siteElements = _context9.sent;
            _context9.next = 18;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('span.min-value')), waitTime);

          case 18:
            element = _context9.sent;
            _context9.next = 21;
            return driver.wait(_seleniumWebdriver.until.elementIsEnabled(element));

          case 21:
            _context9.next = 23;
            return driver.findElements(_seleniumWebdriver.By.css('span.min-value'));

          case 23:
            percentageElements = _context9.sent;
            _context9.next = 30;
            break;

          case 26:
            _context9.prev = 26;
            _context9.t0 = _context9['catch'](7);

            console.error(_context9.t0);
            return _context9.abrupt('return', ranks);

          case 30:
            i = 0;

          case 31:
            if (!(i < siteElements.length)) {
              _context9.next = 43;
              break;
            }

            rank = {};
            _context9.next = 35;
            return siteElements[i].getText();

          case 35:
            rank.name = _context9.sent;
            _context9.next = 38;
            return percentageElements[i].getText();

          case 38:
            rank.percentage = _context9.sent;


            ranks.push(rank);

          case 40:
            i++;
            _context9.next = 31;
            break;

          case 43:
            return _context9.abrupt('return', ranks);

          case 44:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this, [[7, 26]]);
  }));

  return function getAdRanks(_x19, _x20) {
    return _ref9.apply(this, arguments);
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
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(driver, domain) {
    var searchElement, url;
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
            _context10.next = 16;
            return driver.getCurrentUrl();

          case 16:
            url = _context10.sent;
            return _context10.abrupt('return', url.split('/')[6]);

          case 18:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function searchDomain(_x21, _x22) {
    return _ref10.apply(this, arguments);
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
 * Check if all item in list finish getting traffic data
 * @param {array} list An array storing object
 * @return {bool} whether all item finish getting traffic data
 */


exports.calculateTrafficNumbers = calculateTrafficNumbers;
exports.checkAllTrafficSuccess = checkAllTrafficSuccess;

var _seleniumWebdriver = require('selenium-webdriver');

var _similarweb = require('../../similarweb.json');

var _similarweb2 = _interopRequireDefault(_similarweb);

var _fsPromise = require('./fsPromise');

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var waitTime = 20000;
var timeInterval = '1m';function calculateTrafficNumbers(traffic) {
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
}function checkAllTrafficSuccess(list) {
  for (var i = 0; i < list.length; i++) {
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
  var number = getNum(numberString);
  for (var i = 0; i < rank.length; i++) {
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
  if (percentageString.includes('<') || percentageString.includes('>')) {
    percentageString = percentageString.slice(2);
  }
  percentageString = percentageString.slice(0, percentageString.length - 1);
  return Number(percentageString) / 100;
}