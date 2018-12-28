'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilterIcoEventList = undefined;

/**
 * Crawl ico event.
 * @param {string} source ico event source website
 * @param {string} deadlineDate
 * @param {string} timeInterval
 * @param {string} fileName
 * @return {string} the name of the file stored all the data
 */
var crawlICO = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, deadlineDate, timeInterval, fileName) {
    var icoEventList, data, screen, driver, getData, csv;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            deadline = new Date(deadlineDate);
            fileName = 'data/icoEvent(' + fileName + ')';
            icoEventList = void 0;


            console.log('I am ico crawler. Hi~');

            // check if ico event file already exist
            // if not, initialize it
            // if exist, read it from file
            _context.prev = 4;

            console.log('Checking if ' + fileName + ' exist...');
            _context.next = 8;
            return (0, _fsPromise.access)(fileName, _fs2.default.constants.F_OK);

          case 8:

            console.log(fileName + ' exist.');
            console.log('Read ' + fileName + ' into the crawler...');
            _context.next = 12;
            return (0, _fsPromise.readFile)(fileName, 'utf-8');

          case 12:
            data = _context.sent;

            icoEventList = JSON.parse(data);

            console.log('Read ' + fileName + ' success!');
            _context.next = 24;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](4);

            console.log(fileName + ' doesn\'t exist.');

            icoEventList = (0, _crawlList.initializeCrawlList)(source);
            _context.next = 23;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(icoEventList, null, 2));

          case 23:
            console.log(fileName + ' created.');

          case 24:
            screen = {
              width: 2560,
              height: 1600
            };

            // make chrome headless

            _context.next = 27;
            return new _seleniumWebdriver.Builder().forBrowser('chrome').setChromeOptions(new _chrome2.default.Options().headless().windowSize(screen)).build();

          case 27:
            driver = _context.sent;

            if (icoEventList.crawlerStatus.getList) {
              _context.next = 48;
              break;
            }

            console.log('Crawler haven\'t crawled event list.');
            _context.prev = 30;

            console.log('Crawling ico event list...');
            _context.next = 34;
            return crawlICOEvent(driver, source);

          case 34:
            icoEventList.data = _context.sent;

            icoEventList.crawlerStatus.getList = true;
            _context.next = 38;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(icoEventList, null, 2));

          case 38:
            console.log('Finish crawling ico event list.');
            _context.next = 48;
            break;

          case 41:
            _context.prev = 41;
            _context.t1 = _context['catch'](30);

            console.log('Error occurred when crawling event list.');
            console.error(_context.t1);
            _context.next = 47;
            return driver.close();

          case 47:
            process.exit(1);

          case 48:
            if (icoEventList.crawlerStatus.getTraffic) {
              _context.next = 68;
              break;
            }

            console.log('Crawler haven\'t finish crawling traffic.');
            _context.prev = 50;

            console.log('Crawling ico event traffic...');

            getData = function getData(icoEventList) {
              return icoEventList.data;
            };

            _context.next = 55;
            return (0, _similarweb.crawlListTraffic)(driver, icoEventList, getData, fileName, timeInterval);

          case 55:
            if ((0, _similarweb.checkAllTrafficSuccess)(icoEventList.data)) {
              icoEventList.crawlerStatus.getTraffic = true;
            }
            _context.next = 58;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(icoEventList, null, 2));

          case 58:
            console.log('Finish crawling ico event traffic. (some data might be incomplete).');
            _context.next = 68;
            break;

          case 61:
            _context.prev = 61;
            _context.t2 = _context['catch'](50);

            console.log('Error occurred when crawling traffic.');
            console.error(_context.t2);
            _context.next = 67;
            return driver.close();

          case 67:
            process.exit(2);

          case 68:
            _context.next = 70;
            return driver.close();

          case 70:
            if (!(icoEventList.crawlerStatus.getList && icoEventList.crawlerStatus.getTraffic)) {
              _context.next = 86;
              break;
            }

            _context.prev = 71;

            console.log('Finish getting all data, output csv...');
            csv = (0, _csv.icoEventListToCsvString)(icoEventList);
            _context.next = 76;
            return (0, _fsPromise.writeFile)(fileName + '.csv', csv);

          case 76:
            console.log('Finish outputing csv.');
            _context.next = 84;
            break;

          case 79:
            _context.prev = 79;
            _context.t3 = _context['catch'](71);

            console.log('Error occurred when writing csv.');
            console.error(_context.t3);
            process.exit(3);

          case 84:
            _context.next = 89;
            break;

          case 86:
            console.log('Some job are still not done. But im going to rest now.');
            console.log('Restart me to finish those job.');
            process.exit(4);

          case 89:

            console.log('Finish all jobs. I can rest now. :)');
            console.log('Bye~');
            return _context.abrupt('return', fileName);

          case 92:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 17], [30, 41], [50, 61], [71, 79]]);
  }));

  return function crawlICO(_x, _x2, _x3, _x4) {
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

  return function crawlICOEvent(_x5, _x6) {
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
    var icoEventList, genre, i, parentElement, icoElements, j, icoEvent, mainInfoElement, nameElement, raisedElement, raised, lastMonthString, year, cropNum, _i, _icoEvent, linkElement, url, dateElement, dateString, dateArray, icoDate;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            icoEventList = [];
            genre = ['active', 'ended'];
            i = 0;

          case 3:
            if (!(i < genre.length)) {
              _context3.next = 51;
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
            // icoElements = icoElements.slice(0, 10);

            console.log('Total ' + icoElements.length + ' ' + genre[i] + ' ICO event.');

            // get ico event info (name, status, icoUrl, raised)
            j = 0;

          case 15:
            if (!(j < icoElements.length)) {
              _context3.next = 48;
              break;
            }

            icoEvent = {};

            icoEvent.status = genre[i];

            _context3.prev = 18;
            _context3.next = 21;
            return icoElements[j].findElement(_seleniumWebdriver.By.css('div.ico-main-info'));

          case 21:
            mainInfoElement = _context3.sent;
            nameElement = mainInfoElement.findElement(_seleniumWebdriver.By.css('a'));
            _context3.next = 25;
            return nameElement.getText();

          case 25:
            icoEvent.name = _context3.sent;

            console.log('Crawling ' + icoEvent.name + ' name and raised money...');

            // get ico website url (not project website url)
            _context3.next = 29;
            return nameElement.getAttribute('href');

          case 29:
            icoEvent.icoUrl = _context3.sent;
            _context3.next = 32;
            return icoElements[j].findElement(_seleniumWebdriver.By.css('div#new_column_categ_invisted')).findElement(_seleniumWebdriver.By.css('span'));

          case 32:
            raisedElement = _context3.sent;
            _context3.t0 = _utility.getMillion;
            _context3.next = 36;
            return raisedElement.getText();

          case 36:
            _context3.t1 = _context3.sent;
            raised = (0, _context3.t0)(_context3.t1);

            icoEvent.raised = isNaN(raised) ? 'pending' : raised;
            // console.log(icoEvent.raised);
            _context3.next = 44;
            break;

          case 41:
            _context3.prev = 41;
            _context3.t2 = _context3['catch'](18);

            console.error(_context3.t2);

          case 44:
            // store icoEvent object in icoEventList
            icoEventList.push(icoEvent);

          case 45:
            j++;
            _context3.next = 15;
            break;

          case 48:
            i++;
            _context3.next = 3;
            break;

          case 51:

            // get each ico event end date and website url from their icoUrl page
            lastMonthString = '';
            year = 2018;
            cropNum = void 0;
            _i = 0;

          case 55:
            if (!(_i < icoEventList.length)) {
              _context3.next = 101;
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

            icoDate = new Date(dateString);

            if (!(icoDate < deadline)) {
              _context3.next = 93;
              break;
            }

            cropNum = _i;
            return _context3.abrupt('break', 101);

          case 93:
            _context3.next = 98;
            break;

          case 95:
            _context3.prev = 95;
            _context3.t3 = _context3['catch'](57);

            console.error(_context3.t3);

          case 98:
            _i++;
            _context3.next = 55;
            break;

          case 101:
            icoEventList = icoEventList.slice(0, cropNum - 1);
            return _context3.abrupt('return', icoEventList);

          case 103:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[18, 41], [57, 95]]);
  }));

  return function crawlICOEventFromICODrop(_x7) {
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

  return function getFilterIcoEventList(_x8) {
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

var deadline = void 0;exports.default = crawlICO;