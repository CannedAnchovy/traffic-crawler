'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilterIcoEventList = undefined;

/**
 * Crawl ico event.
 * @param {string} source ico event source website
 * @return {string} the name of the file stored all the data
 */
var crawlICO = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var fileName, icoEventList, data, screen, driver, getData, csv;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileName = 'data/icoEvent(' + source + '2)';
            icoEventList = void 0;


            console.log('I am ico crawler. Hi~');

            // check if ico event file already exist
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

            icoEventList = JSON.parse(data);

            console.log('Read ' + fileName + ' success!');
            _context.next = 23;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](3);

            console.log(fileName + ' doesn\'t exist.');

            icoEventList = (0, _crawlList.initializeCrawlList)(source);
            _context.next = 22;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(icoEventList, null, 2));

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

            if (icoEventList.crawlerStatus.getList) {
              _context.next = 47;
              break;
            }

            console.log('Crawler haven\'t crawled event list.');
            _context.prev = 29;

            console.log('Crawling ico event list...');
            _context.next = 33;
            return crawlICOEvent(driver, source);

          case 33:
            icoEventList.data = _context.sent;

            icoEventList.crawlerStatus.getList = true;
            _context.next = 37;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(icoEventList, null, 2));

          case 37:
            console.log('Finish crawling ico event list.');
            _context.next = 47;
            break;

          case 40:
            _context.prev = 40;
            _context.t1 = _context['catch'](29);

            console.log('Error occurred when crawling event list.');
            console.error(_context.t1);
            _context.next = 46;
            return driver.close();

          case 46:
            process.exit(1);

          case 47:
            if (icoEventList.crawlerStatus.getTraffic) {
              _context.next = 67;
              break;
            }

            console.log('Crawler haven\'t finish crawling traffic.');
            _context.prev = 49;

            console.log('Crawling ico event traffic...');

            getData = function getData(icoEventList) {
              return icoEventList.data;
            };

            _context.next = 54;
            return (0, _similarweb.crawlListTraffic)(driver, icoEventList, getData, fileName);

          case 54:
            if ((0, _similarweb.checkAllTrafficSuccess)(icoEventList.data)) {
              icoEventList.crawlerStatus.getTraffic = true;
            }
            _context.next = 57;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(icoEventList, null, 2));

          case 57:
            console.log('Finish crawling ico event traffic. (some data might be incomplete).');
            _context.next = 67;
            break;

          case 60:
            _context.prev = 60;
            _context.t2 = _context['catch'](49);

            console.log('Error occurred when crawling traffic.');
            console.error(_context.t2);
            _context.next = 66;
            return driver.close();

          case 66:
            process.exit(2);

          case 67:
            _context.next = 69;
            return driver.close();

          case 69:
            if (!(icoEventList.crawlerStatus.getList && icoEventList.crawlerStatus.getTraffic)) {
              _context.next = 85;
              break;
            }

            _context.prev = 70;

            console.log('Finish getting all data, output csv...');
            csv = (0, _csv.icoEventListToCsvString)(icoEventList);
            _context.next = 75;
            return (0, _fsPromise.writeFile)(fileName + '.csv', csv);

          case 75:
            console.log('Finish outputing csv.');
            _context.next = 83;
            break;

          case 78:
            _context.prev = 78;
            _context.t3 = _context['catch'](70);

            console.log('Error occurred when writing csv.');
            console.error(_context.t3);
            process.exit(3);

          case 83:
            _context.next = 88;
            break;

          case 85:
            console.log('Some job are still not done. But im going to rest now.');
            console.log('Restart me to finish those job.');
            process.exit(4);

          case 88:

            console.log('Finish all jobs. I can rest now. :)');
            console.log('Bye~');
            return _context.abrupt('return', fileName);

          case 91:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 16], [29, 40], [49, 60], [70, 78]]);
  }));

  return function crawlICO(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Crawl ICO event.
 * @param {object} driver Selenium web driver.
 * @param {object} source source website to get ico event
 * @return {array} An array containing current data status and ICO event list and its information.
 */


var crawlICOEvent = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver, source) {
    var icoEventList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            icoEventList = void 0;

            if (!(source === 'icodrops.com')) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return crawlICOEventFromICODrop(driver);

          case 4:
            icoEventList = _context2.sent;
            _context2.next = 8;
            break;

          case 7:
            throw new Error('I don\'t know how to crawl event from ' + source + '.');

          case 8:
            return _context2.abrupt('return', icoEventList);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function crawlICOEvent(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Crawl ICO event from ICO drops.
 * @param {object} driver Selenium web driver.
 * @return {array} An array containing ICO event list and its information.
 */


var crawlICOEventFromICODrop = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver) {
    var icoEventList, genre, i, parentElement, icoElements, j, icoEvent, mainInfoElement, nameElement, raisedElement, raised, lastMonthString, year, _i, _icoEvent, linkElement, url, dateElement, dateString, dateArray;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            icoEventList = [];
            genre = ['active', 'ended'];
            i = 0;

          case 3:
            if (!(i < genre.length)) {
              _context3.next = 52;
              break;
            }

            console.log('Crawling ' + genre[i] + ' ico event from icodrops.com...');

            // get ico elements
            _context3.next = 7;
            return driver.get('https://icodrops.com/category/' + genre[i] + '-ico/');

          case 7:
            _context3.next = 9;
            return driver.findElement(_seleniumWebdriver.By.css('div.all'));

          case 9:
            parentElement = _context3.sent;
            _context3.next = 12;
            return parentElement.findElements(_seleniumWebdriver.By.css('div.a_ico'));

          case 12:
            icoElements = _context3.sent;


            // for limit test case size
            icoElements = icoElements.slice(0, 10);

            console.log('Total ' + icoElements.length + ' ' + genre[i] + ' ICO event.');

            // get ico event info (name, status, icoUrl, raised)
            j = 0;

          case 16:
            if (!(j < icoElements.length)) {
              _context3.next = 49;
              break;
            }

            icoEvent = {};

            icoEvent.status = genre[i];

            _context3.prev = 19;
            _context3.next = 22;
            return icoElements[j].findElement(_seleniumWebdriver.By.css('div.ico-main-info'));

          case 22:
            mainInfoElement = _context3.sent;
            nameElement = mainInfoElement.findElement(_seleniumWebdriver.By.css('a'));
            _context3.next = 26;
            return nameElement.getText();

          case 26:
            icoEvent.name = _context3.sent;

            console.log('Crawling ' + icoEvent.name + ' name and raised money...');

            // get ico website url (not project website url)
            _context3.next = 30;
            return nameElement.getAttribute('href');

          case 30:
            icoEvent.icoUrl = _context3.sent;
            _context3.next = 33;
            return icoElements[j].findElement(_seleniumWebdriver.By.css('div#new_column_categ_invisted')).findElement(_seleniumWebdriver.By.css('span'));

          case 33:
            raisedElement = _context3.sent;
            _context3.t0 = _utility.getMillion;
            _context3.next = 37;
            return raisedElement.getText();

          case 37:
            _context3.t1 = _context3.sent;
            raised = (0, _context3.t0)(_context3.t1);

            icoEvent.raised = isNaN(raised) ? 'pending' : raised;
            // console.log(icoEvent.raised);
            _context3.next = 45;
            break;

          case 42:
            _context3.prev = 42;
            _context3.t2 = _context3['catch'](19);

            console.error(_context3.t2);

          case 45:
            // store icoEvent object in icoEventList
            icoEventList.push(icoEvent);

          case 46:
            j++;
            _context3.next = 16;
            break;

          case 49:
            i++;
            _context3.next = 3;
            break;

          case 52:

            // get each ico event end date and website url from their icoUrl page
            lastMonthString = '';
            year = 2018;
            _i = 0;

          case 55:
            if (!(_i < icoEventList.length)) {
              _context3.next = 97;
              break;
            }

            _icoEvent = icoEventList[_i];
            _context3.prev = 57;

            console.log('Crawling ' + _icoEvent.name + ' website url and end date...');
            _context3.next = 61;
            return driver.get(_icoEvent.icoUrl);

          case 61:
            _context3.next = 63;
            return driver.findElement(_seleniumWebdriver.By.css('div.ico-right-col')).findElement(_seleniumWebdriver.By.css('a'));

          case 63:
            linkElement = _context3.sent;
            _context3.next = 66;
            return linkElement.getAttribute('href');

          case 66:
            url = _context3.sent;

            _icoEvent.url = url;

            // get ico event end date
            _context3.next = 70;
            return driver.findElement(_seleniumWebdriver.By.css('div.sale-date'));

          case 70:
            dateElement = _context3.sent;
            dateString = void 0;

            // Active ico event has two kinds of date format,
            // one is how many days left (12 days left)
            // the other is string month (15 Aug)
            // this part parse this two kinds of date format into YYYY/MM/DD

            if (!(_icoEvent.status === 'active')) {
              _context3.next = 79;
              break;
            }

            _context3.next = 75;
            return dateElement.findElement(_seleniumWebdriver.By.css('strong')).getText();

          case 75:
            dateString = _context3.sent;

            if (dateString === 'IS ACTIVE') dateString = 'TBA';else {
              dateString = dateString.split(' ')[0];
              dateString = (0, _utility.getDateByDayLeft)(Number(dateString));
            }
            _context3.next = 87;
            break;

          case 79:
            if (!(_icoEvent.status === 'ended')) {
              _context3.next = 87;
              break;
            }

            _context3.next = 82;
            return dateElement.getText();

          case 82:
            dateString = _context3.sent;
            dateArray = dateString.split(' ');

            // check if cross year

            if (lastMonthString === 'JANUARY' && dateArray[1] !== 'JANUARY') year -= 1;

            dateString = (0, _utility.getDateFromStrMonth)(year, dateArray[1], Number(dateArray[0]));
            lastMonthString = dateArray[1];

          case 87:
            _icoEvent.endDate = dateString;
            _icoEvent.traffic = { success: false };
            _context3.next = 94;
            break;

          case 91:
            _context3.prev = 91;
            _context3.t3 = _context3['catch'](57);

            console.error(_context3.t3);

          case 94:
            _i++;
            _context3.next = 55;
            break;

          case 97:
            return _context3.abrupt('return', icoEventList);

          case 98:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[19, 42], [57, 91]]);
  }));

  return function crawlICOEventFromICODrop(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Filter icoEventList from specified file with filterIcoEvent function defined in filter.js
 * @param {fileName} fileName file that stores icoEventList
 * @return {object} the filtered icoEventList
 */


var getFilterIcoEventList = exports.getFilterIcoEventList = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(fileName) {
    var data, icoEventList;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _fsPromise.readFile)(fileName, 'utf-8');

          case 2:
            data = _context4.sent;
            icoEventList = JSON.parse(data);

            // if current file haven't completed crawling yet, terminate the process

            if (!(icoEventList.crawlerStatus.getList && icoEventList.crawlerStatus.getTraffic)) {
              console.log('This file hasn\'t finished crawling. Please crawlICO() this file first.');
              process.exit(1);
            }

            icoEventList.data = icoEventList.data.filter(_filter.filterIcoEvent);
            return _context4.abrupt('return', icoEventList);

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getFilterIcoEventList(_x5) {
    return _ref4.apply(this, arguments);
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

var _utility = require('../utility');

var _filter = require('./filter');

var _csv = require('../csv');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = crawlICO;