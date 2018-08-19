'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Main function for crawling ICO event information.
 */
var main = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var driver, icoEventList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _seleniumWebdriver.Builder().forBrowser('chrome').build();

          case 2:
            driver = _context.sent;

            // let data = await crawlICOEvent(driver);
            // await writeFile('data/icoEvent(icodrops)', JSON.stringify(data));
            // let rawData = await readFile('data/icoEvent(icodrops)', 'utf8');
            // let icoEventList = JSON.parse(rawData);
            icoEventList = { data: "" };
            _context.next = 6;
            return crawlICOEventTraffic(driver, icoEventList.data);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Crawl ICO event.
 * @param {object} driver Selenium web driver.
 * @return {object} An object containing current data status and ICO event list and its information.
 */
var crawlICOEvent = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver) {
    var icoEventList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return crawlICOEventFromICODrop(driver);

          case 2:
            icoEventList = _context2.sent;
            return _context2.abrupt('return', {
              from: 'icodrops',
              getEventList: true,
              getTraffic: false,
              data: icoEventList
            });

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function crawlICOEvent(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Crawl ICO event from ICO drops.
 * @param {object} driver Selenium web driver.
 * @return {object} An object containing ICO event list and its information.
 */


var crawlICOEventFromICODrop = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver) {
    var icoEventList, genre, i, parentElement, icoElements, j, icoEvent, mainInfoElement, nameElement, raisedElement, raised, _i, _icoEvent, year, lastMonthString, linkElement, url, dateElement, dateString, dateArray;

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

            console.log('Crawling ' + genre[i] + ' ico event from icodrops...');

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
            _i = 0;

          case 52:
            if (!(_i < icoEventList.length)) {
              _context3.next = 95;
              break;
            }

            _icoEvent = icoEventList[_i];
            year = 2018;
            lastMonthString = '';
            _context3.prev = 56;

            console.log('Crawling ' + _icoEvent.name + ' website url and end date...');
            _context3.next = 60;
            return driver.get(_icoEvent.icoUrl);

          case 60:
            _context3.next = 62;
            return driver.findElement(_seleniumWebdriver.By.css('div.ico-right-col')).findElement(_seleniumWebdriver.By.css('a'));

          case 62:
            linkElement = _context3.sent;
            _context3.next = 65;
            return linkElement.getAttribute('href');

          case 65:
            url = _context3.sent;

            _icoEvent.url = url;

            // get ico event end date
            _context3.next = 69;
            return driver.findElement(_seleniumWebdriver.By.css('div.sale-date'));

          case 69:
            dateElement = _context3.sent;
            dateString = void 0;

            // Active ico event has two kinds of date format,
            // one is how many days left (12 days left)
            // the other is string month (15 Aug)
            // this part parse this two kinds of date format into YYYY/MM/DD

            if (!(_icoEvent.status === 'active')) {
              _context3.next = 78;
              break;
            }

            _context3.next = 74;
            return dateElement.findElement(_seleniumWebdriver.By.css('strong')).getText();

          case 74:
            dateString = _context3.sent;

            if (dateString === 'IS ACTIVE') dateString = 'TBA';else {
              dateString = dateString.split(' ')[0];
              dateString = (0, _utility.getDateByDayLeft)(Number(dateString));
            }
            _context3.next = 86;
            break;

          case 78:
            if (!(_icoEvent.status === 'ended')) {
              _context3.next = 86;
              break;
            }

            _context3.next = 81;
            return dateElement.getText();

          case 81:
            dateString = _context3.sent;
            dateArray = dateString.split(' ');

            // check if cross year

            if (lastMonthString === 'Jan' && dateArray[1] === 'Dec') year -= 1;

            dateString = (0, _utility.getDateFromStrMonth)(year, dateArray[1], Number(dateArray[0]));
            lastMonthString = dateArray[1];

          case 86:
            _icoEvent.endDate = dateString;
            _context3.next = 92;
            break;

          case 89:
            _context3.prev = 89;
            _context3.t3 = _context3['catch'](56);

            console.error(_context3.t3);

          case 92:
            _i++;
            _context3.next = 52;
            break;

          case 95:
            return _context3.abrupt('return', icoEventList);

          case 96:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[18, 41], [56, 89]]);
  }));

  return function crawlICOEventFromICODrop(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Crawl ICO event traffic from similarweb and modify icoEventList directly.
 * @param {object} driver Selenium web driver.
 * @param {array} icoEventList An array containing ICO event information.
 */


var crawlICOEventTraffic = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(driver, icoEventList) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _similarweb.signInSimilarWeb)(driver);

          case 2:
            _context4.next = 4;
            return (0, _similarweb.setTimeInterval)(driver, 'Last 6 Months');

          case 4:
            _context4.t0 = console;
            _context4.next = 7;
            return (0, _similarweb.getVisitSource)(driver);

          case 7:
            _context4.t1 = _context4.sent;

            _context4.t0.log.call(_context4.t0, _context4.t1);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function crawlICOEventTraffic(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var _seleniumWebdriver = require('selenium-webdriver');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _similarweb = require('../similarweb');

var _utility = require('../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var readFile = _util2.default.promisify(_fs2.default.readFile);
var writeFile = _util2.default.promisify(_fs2.default.writeFile);
// await driver.close();
;exports.default = main;