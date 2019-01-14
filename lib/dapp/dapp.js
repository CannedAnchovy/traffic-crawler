'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Crawl dapp.
 * @param {string} source exchanges source website
 * @return {string} the name of the file stored all the data
 */
var crawlDapp = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var fileName, dappList, data, screen, driver, getData, csv;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileName = 'data/dapp(2018-Dec)';
            dappList = void 0;


            console.log('I am dapp crawler. Hi~');

            // check if dappList file already exist
            // if not, initialize it
            // if exist, read it from file
            _context.prev = 3;

            console.log('Checking if ' + fileName + ' exist...');
            _context.next = 7;
            return (0, _fsPromise.access)(fileName, _fs2.default.constants.F_OK);

          case 7:

            console.log(fileName + ' exist.');
            console.log('Read ' + fileName + ' into the crawler...');
            _context.next = 11;
            return (0, _fsPromise.readFile)(fileName, 'utf-8');

          case 11:
            data = _context.sent;

            dappList = JSON.parse(data);

            console.log('Read ' + fileName + ' success!');
            _context.next = 23;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](3);

            console.log(fileName + ' doesn\'t exist.');

            dappList = (0, _crawlList.initializeCrawlList)(source);
            _context.next = 22;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(dappList, null, 2));

          case 22:
            console.log(fileName + ' created.');

          case 23:
            screen = {
              width: 2560,
              height: 1600
            };

            // make chrome headless
            // let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();

            _context.next = 26;
            return new _seleniumWebdriver.Builder().forBrowser('chrome').build();

          case 26:
            driver = _context.sent;

            if (dappList.crawlerStatus.getList) {
              _context.next = 47;
              break;
            }

            console.log('Crawler haven\'t crawled dapp list.');
            _context.prev = 29;

            console.log('Crawling dapp list...');
            _context.next = 33;
            return crawlDappList(driver, source);

          case 33:
            dappList.data = _context.sent;

            dappList.crawlerStatus.getList = true;
            _context.next = 37;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(dappList, null, 2));

          case 37:
            console.log('Finish crawling dapp list.');
            _context.next = 47;
            break;

          case 40:
            _context.prev = 40;
            _context.t1 = _context['catch'](29);

            console.log('Error occurred when crawling dapp list.');
            console.error(_context.t1);
            _context.next = 46;
            return driver.close();

          case 46:
            process.exit(1);

          case 47:
            if (dappList.crawlerStatus.getTraffic) {
              _context.next = 65;
              break;
            }

            console.log('Crawler haven\'t finish crawling traffic.');
            _context.prev = 49;

            console.log('Crawling dapp traffic...');

            getData = function getData(dappList) {
              return dappList.data;
            };

            _context.next = 54;
            return (0, _similarweb.crawlListTraffic)(driver, dappList, getData, fileName);

          case 54:
            if ((0, _similarweb.checkAllTrafficSuccess)(dappList.data)) {
              dappList.crawlerStatus.getTraffic = true;
            }
            _context.next = 57;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(dappList, null, 2));

          case 57:
            console.log('Finish crawling dapp traffic. (some data might be incomplete).');
            _context.next = 65;
            break;

          case 60:
            _context.prev = 60;
            _context.t2 = _context['catch'](49);

            console.log('Error occurred when crawling traffic.');
            console.error(_context.t2);
            // await driver.close();
            process.exit(2);

          case 65:
            _context.next = 67;
            return driver.close();

          case 67:
            if (!(dappList.crawlerStatus.getList && dappList.crawlerStatus.getTraffic)) {
              _context.next = 83;
              break;
            }

            _context.prev = 68;

            console.log('Finish getting all data, output csv...');
            csv = (0, _csv.dappListToCsvString)(dappList);
            _context.next = 73;
            return (0, _fsPromise.writeFile)(fileName + '.csv', csv);

          case 73:
            console.log('Finish outputing csv.');
            _context.next = 81;
            break;

          case 76:
            _context.prev = 76;
            _context.t3 = _context['catch'](68);

            console.log('Error occurred when writing csv.');
            console.error(_context.t3);
            process.exit(3);

          case 81:
            _context.next = 86;
            break;

          case 83:
            console.log('Some job are still not done. But im going to rest now.');
            console.log('Restart me to finish those job.');
            process.exit(4);

          case 86:

            console.log('Finish all jobs. I can rest now. :)');
            console.log('Bye~');
            return _context.abrupt('return', fileName);

          case 89:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 16], [29, 40], [49, 60], [68, 76]]);
  }));

  return function crawlDapp(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Crawl dapp list.
 * @param {object} driver Selenium web driver.
 * @param {object} source source website to get exchange list
 * @return {array} An array containing exchange list and their basic information.
 */


var crawlDappList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver, source) {
    var list;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            list = void 0;

            if (!(source === 'dappradar.com/rankings')) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return crawlDappListFromDappradar(driver);

          case 4:
            list = _context2.sent;
            _context2.next = 8;
            break;

          case 7:
            throw new Error('I don\'t know how to crawl dapp from ' + source + '.');

          case 8:
            return _context2.abrupt('return', list);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function crawlDappList(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Crawl exchanges from cmc.
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing exchange lists and their information.
 */


var crawlDappListFromDappradar = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver) {
    var list, i, rowElements, j, dapp, colElements, aElement, spanElement, divElement, text, spanElements, nextPageButtonElement, _i, item, _divElement, _aElement, url;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('Crawling exchange from dapp radar...');

            list = [];
            _context3.next = 4;
            return driver.get('https://dappradar.com/rankings');

          case 4:

            console.log('Total ' + rankNum + ' dapps to be crawled.');
            _context3.next = 7;
            return (0, _utility.sleep)(3000);

          case 7:
            i = 0;

          case 8:
            if (!(i < rankNum / 50)) {
              _context3.next = 101;
              break;
            }

            _context3.next = 11;
            return driver.findElements(_seleniumWebdriver.By.css('div.flex-body.flex-row'));

          case 11:
            rowElements = _context3.sent;
            j = 1;

          case 13:
            if (!(j < 51)) {
              _context3.next = 91;
              break;
            }

            dapp = {};
            _context3.next = 17;
            return rowElements[j].findElements(_seleniumWebdriver.By.css('div.column-flex'));

          case 17:
            colElements = _context3.sent;
            _context3.next = 20;
            return colElements[1].findElement(_seleniumWebdriver.By.css('a'));

          case 20:
            aElement = _context3.sent;
            _context3.next = 23;
            return aElement.getAttribute('title');

          case 23:
            dapp.name = _context3.sent;


            console.log('Crawling ' + dapp.name + '\'s data...');

            // get rank
            _context3.next = 27;
            return colElements[0].getText();

          case 27:
            dapp.rank = _context3.sent;
            _context3.next = 30;
            return aElement.getAttribute('href');

          case 30:
            dapp.radarUrl = _context3.sent;
            _context3.next = 33;
            return colElements[2].findElement(_seleniumWebdriver.By.css('span'));

          case 33:
            spanElement = _context3.sent;
            _context3.next = 36;
            return spanElement.getText();

          case 36:
            dapp.category = _context3.sent;
            _context3.next = 39;
            return colElements[3].findElement(_seleniumWebdriver.By.css('div'));

          case 39:
            divElement = _context3.sent;
            _context3.next = 42;
            return divElement.getText();

          case 42:
            text = _context3.sent;

            dapp.chain = text.trim();

            // get balance
            _context3.next = 46;
            return colElements[4].findElements(_seleniumWebdriver.By.css('span'));

          case 46:
            spanElements = _context3.sent;
            _context3.next = 49;
            return spanElements[1].getText();

          case 49:
            dapp.balance = _context3.sent;
            _context3.next = 52;
            return colElements[5].findElement(_seleniumWebdriver.By.css('span'));

          case 52:
            spanElement = _context3.sent;
            _context3.next = 55;
            return spanElement.getText();

          case 55:
            dapp.user24h = _context3.sent;
            _context3.next = 58;
            return colElements[6].findElement(_seleniumWebdriver.By.css('div'));

          case 58:
            divElement = _context3.sent;
            _context3.next = 61;
            return divElement.findElement(_seleniumWebdriver.By.css('div'));

          case 61:
            divElement = _context3.sent;
            _context3.next = 64;
            return divElement.getText();

          case 64:
            dapp.volume24h = _context3.sent;
            _context3.next = 67;
            return colElements[7].findElement(_seleniumWebdriver.By.css('div'));

          case 67:
            divElement = _context3.sent;
            _context3.next = 70;
            return divElement.findElement(_seleniumWebdriver.By.css('div'));

          case 70:
            divElement = _context3.sent;
            _context3.next = 73;
            return divElement.getText();

          case 73:
            dapp.volume7d = _context3.sent;
            _context3.next = 76;
            return colElements[8].findElement(_seleniumWebdriver.By.css('span'));

          case 76:
            spanElement = _context3.sent;
            _context3.next = 79;
            return spanElement.getText();

          case 79:
            dapp.tx24h = _context3.sent;
            _context3.next = 82;
            return colElements[9].findElement(_seleniumWebdriver.By.css('span'));

          case 82:
            spanElement = _context3.sent;
            _context3.next = 85;
            return spanElement.getText();

          case 85:
            dapp.tx7d = _context3.sent;


            console.log(dapp);
            list.push(dapp);

          case 88:
            j++;
            _context3.next = 13;
            break;

          case 91:
            _context3.next = 93;
            return driver.findElement(_seleniumWebdriver.By.css('a#next'));

          case 93:
            nextPageButtonElement = _context3.sent;
            _context3.next = 96;
            return nextPageButtonElement.click();

          case 96:
            _context3.next = 98;
            return (0, _utility.sleep)(3000);

          case 98:
            i++;
            _context3.next = 8;
            break;

          case 101:
            _i = 0;

          case 102:
            if (!(_i < list.length)) {
              _context3.next = 123;
              break;
            }

            console.log('Crawling ' + list[_i].name + ' url...');
            item = list[_i];

            // get exchange url and trading volume on their own cmc page

            _context3.next = 107;
            return driver.get(item.radarUrl);

          case 107:
            _context3.next = 109;
            return (0, _utility.sleep)(3000);

          case 109:
            _context3.next = 111;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.dapp-links')));

          case 111:
            _divElement = _context3.sent;
            _context3.next = 114;
            return _divElement.findElement(_seleniumWebdriver.By.css('a'));

          case 114:
            _aElement = _context3.sent;
            _context3.next = 117;
            return _aElement.getAttribute('href');

          case 117:
            url = _context3.sent;


            item.url = url;

            /* await driver.get(url);
            await sleep(3000);
             item.url = await driver.getCurrentUrl();*/

            console.log(item);

          case 120:
            _i++;
            _context3.next = 102;
            break;

          case 123:
            return _context3.abrupt('return', list);

          case 124:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function crawlDappListFromDappradar(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _seleniumWebdriver = require('selenium-webdriver');

var _chrome = require('selenium-webdriver/chrome');

var _chrome2 = _interopRequireDefault(_chrome);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsPromise = require('../fsPromise');

var _crawlList = require('../crawlList');

var _similarweb = require('../similarweb');

var _csv = require('../csv');

var _utility = require('../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var rankNum = 100;exports.default = crawlDapp;