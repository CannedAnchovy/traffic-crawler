'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Crawl exchanges.
 * @param {string} source exchanges source website
 * @return {string} the name of the file stored all the data
 */
var crawlExchange = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var fileName, exchangeList, data, screen, driver, getData, csv;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileName = 'data/exchanges(2018-Dec)';
            exchangeList = void 0;


            console.log('I am exchange crawler. Hi~');

            // check if exchangeList file already exist
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

            exchangeList = JSON.parse(data);

            console.log('Read ' + fileName + ' success!');
            _context.next = 23;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](3);

            console.log(fileName + ' doesn\'t exist.');

            exchangeList = (0, _crawlList.initializeCrawlList)(source);
            _context.next = 22;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(exchangeList, null, 2));

          case 22:
            console.log(fileName + ' created.');

          case 23:
            screen = {
              width: 2560,
              height: 1600
            };

            // make chrome headless

            _context.next = 26;
            return new _seleniumWebdriver.Builder().forBrowser('chrome').setChromeOptions(new _chrome2.default.Options().headless().windowSize(screen)).build();

          case 26:
            driver = _context.sent;

            if (exchangeList.crawlerStatus.getList) {
              _context.next = 47;
              break;
            }

            console.log('Crawler haven\'t crawled exchange list.');
            _context.prev = 29;

            console.log('Crawling exchange list...');
            _context.next = 33;
            return crawlExchangeList(driver, source);

          case 33:
            exchangeList.data = _context.sent;

            exchangeList.crawlerStatus.getList = true;
            _context.next = 37;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(exchangeList, null, 2));

          case 37:
            console.log('Finish crawling exchange list.');
            _context.next = 47;
            break;

          case 40:
            _context.prev = 40;
            _context.t1 = _context['catch'](29);

            console.log('Error occurred when crawling exchange list.');
            console.error(_context.t1);
            _context.next = 46;
            return driver.close();

          case 46:
            process.exit(1);

          case 47:
            if (exchangeList.crawlerStatus.getTraffic) {
              _context.next = 65;
              break;
            }

            console.log('Crawler haven\'t finish crawling traffic.');
            _context.prev = 49;

            console.log('Crawling exchange traffic...');

            getData = function getData(exchangeList) {
              return exchangeList.data;
            };

            _context.next = 54;
            return (0, _similarweb.crawlListTraffic)(driver, exchangeList, getData, fileName);

          case 54:
            if ((0, _similarweb.checkAllTrafficSuccess)(exchangeList.data)) {
              exchangeList.crawlerStatus.getTraffic = true;
            }
            _context.next = 57;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(exchangeList, null, 2));

          case 57:
            console.log('Finish crawling exchange traffic. (some data might be incomplete).');
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
            if (!(exchangeList.crawlerStatus.getList && exchangeList.crawlerStatus.getTraffic)) {
              _context.next = 83;
              break;
            }

            _context.prev = 68;

            console.log('Finish getting all data, output csv...');
            csv = (0, _csv.exchangeListToCsvString)(exchangeList);
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

  return function crawlExchange(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Crawl exchange list.
 * @param {object} driver Selenium web driver.
 * @param {object} source source website to get exchange list
 * @return {array} An array containing exchange list and their basic information.
 */


var crawlExchangeList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver, source) {
    var list;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            list = void 0;

            if (!(source === 'coinmarketcap.com')) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return crawlExchangeListFromCMC(driver);

          case 4:
            list = _context2.sent;
            _context2.next = 8;
            break;

          case 7:
            throw new Error('I don\'t know how to crawl exchange from ' + source + '.');

          case 8:
            return _context2.abrupt('return', list);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function crawlExchangeList(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Crawl exchanges from cmc.
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing exchange lists and their information.
 */


var crawlExchangeListFromCMC = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver) {
    var list, trElements, i, exchange, aElement, _i, item, containerElement, urlElement, tradeVolumeElement, data, _i2, _exchange;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('Crawling exchange from cmc...');

            list = [];
            _context3.next = 4;
            return driver.get('https://coinmarketcap.com/exchanges/volume/24-hour/all/');

          case 4:
            _context3.next = 6;
            return driver.findElements(_seleniumWebdriver.By.css('tr[id]'));

          case 6:
            trElements = _context3.sent;

            console.log('Total ' + trElements.length + ' exchanges.');

            i = 0;

          case 9:
            if (!(i < trElements.length)) {
              _context3.next = 26;
              break;
            }

            // get exchange name, rank, cmcUrl on cmc
            exchange = {};
            _context3.next = 13;
            return trElements[i].findElement(_seleniumWebdriver.By.css('a'));

          case 13:
            aElement = _context3.sent;
            _context3.next = 16;
            return aElement.getText();

          case 16:
            exchange.name = _context3.sent;


            console.log('Crawling ' + exchange.name + ' basic info...');
            exchange.rank = i.toString();
            _context3.next = 21;
            return aElement.getAttribute('href');

          case 21:
            exchange.cmcUrl = _context3.sent;


            list.push(exchange);

          case 23:
            i++;
            _context3.next = 9;
            break;

          case 26:
            _i = 0;

          case 27:
            if (!(_i < list.length)) {
              _context3.next = 56;
              break;
            }

            console.log('Crawling ' + list[_i].name + ' url and trading volume...');
            item = list[_i];

            // get exchange url and trading volume on their own cmc page

            _context3.next = 32;
            return driver.get(item.cmcUrl);

          case 32:
            _context3.next = 34;
            return (0, _utility.sleep)(3000);

          case 34:
            _context3.next = 36;
            return driver.findElement(_seleniumWebdriver.By.css('div.col-xs-12'));

          case 36:
            containerElement = _context3.sent;
            _context3.next = 39;
            return containerElement.findElement(_seleniumWebdriver.By.css('a'));

          case 39:
            urlElement = _context3.sent;
            _context3.next = 42;
            return urlElement.getAttribute('href');

          case 42:
            item.url = _context3.sent;
            _context3.next = 45;
            return driver.findElement(_seleniumWebdriver.By.css('div.text-left'));

          case 45:
            containerElement = _context3.sent;
            _context3.next = 48;
            return containerElement.findElement(_seleniumWebdriver.By.css('span'));

          case 48:
            tradeVolumeElement = _context3.sent;
            _context3.next = 51;
            return tradeVolumeElement.getAttribute('data-usd');

          case 51:
            item.tradingVolume24hr = _context3.sent;


            console.log(item);

          case 53:
            _i++;
            _context3.next = 27;
            break;

          case 56:
            _context3.next = 58;
            return (0, _fsPromise.readFile)('src/exchange/exchangeList', 'utf-8');

          case 58:
            data = _context3.sent;

            data = data.split('\n');
            for (_i2 = 0; _i2 < data.length; _i2++) {
              if (data[_i2] !== '') {
                _exchange = {};

                _exchange.name = data[_i2];
                _exchange.rank = '-';
                _exchange.cmcUrl = '-';
                _exchange.url = data[_i2];
                _exchange.tradingVolume24hr = '-';

                list.push(_exchange);
              }
            }

            return _context3.abrupt('return', list);

          case 62:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function crawlExchangeListFromCMC(_x4) {
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

exports.default = crawlExchange;