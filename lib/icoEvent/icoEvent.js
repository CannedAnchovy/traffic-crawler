'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Crawl ico event.
 * @param {string} source ico event source website
 * @return {number} process execute status
 */
var crawlICO = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var fileName, icoEventList, data, driver, csv;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /* let data = await readFile('data/icoEvent(icodrops.com)', 'utf-8');
            let icoEventList = JSON.parse(data);
            icoEventList = transform(icoEventList);
            await writeFile('data/icoEvent(icodrops.com)', JSON.stringify(icoEventList)); */

            fileName = 'data/icoEvent(' + source + ')';
            icoEventList = void 0;


            console.log('I am ico crawler. Hi~');

            // check if ico event file already exist
            // if not, initialize it
            // if exist, read it from file
            _context.prev = 3;

            console.log('Checking if ' + fileName + ' exist...');
            _context.next = 7;
            return access(fileName, _fs2.default.constants.F_OK);

          case 7:

            console.log(fileName + ' exist.');
            console.log('Read ' + fileName + ' into the crawler...');
            _context.next = 11;
            return readFile(fileName, 'utf-8');

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

            icoEventList = initializeIcoEventList(source);
            _context.next = 22;
            return writeFile(fileName, JSON.stringify(icoEventList));

          case 22:
            console.log(fileName + ' created.');

          case 23:
            _context.next = 25;
            return new _seleniumWebdriver.Builder().forBrowser('chrome').build();

          case 25:
            driver = _context.sent;

            if (icoEventList.crawlerStatus.getEventList) {
              _context.next = 44;
              break;
            }

            console.log('Crawler haven\'t crawled event list.');
            _context.prev = 28;

            console.log('Crawling ico event list...');
            _context.next = 32;
            return crawlICOEvent(driver, source);

          case 32:
            icoEventList.data = _context.sent;

            icoEventList.crawlerStatus.getEventList = true;
            _context.next = 36;
            return writeFile(fileName, JSON.stringify(icoEventList));

          case 36:
            console.log('Finish crawling ico event list.');
            _context.next = 44;
            break;

          case 39:
            _context.prev = 39;
            _context.t1 = _context['catch'](28);

            console.log('Error occurred when crawling event list.');
            console.error(_context.t1);
            return _context.abrupt('return', 1);

          case 44:
            if (icoEventList.crawlerStatus.getTraffic) {
              _context.next = 61;
              break;
            }

            console.log('Crawler haven\'t finish crawling traffic.');
            _context.prev = 46;

            console.log('Crawling ico event traffic...');
            _context.next = 50;
            return crawlICOEventTraffic(driver, icoEventList, fileName);

          case 50:
            if (checkAllTrafficSuccess(icoEventList)) {
              icoEventList.crawlerStatus.getTraffic = true;
            }
            _context.next = 53;
            return writeFile(fileName, JSON.stringify(icoEventList));

          case 53:
            console.log('Finish crawling ico event traffic. (some data might be incomplete).');
            _context.next = 61;
            break;

          case 56:
            _context.prev = 56;
            _context.t2 = _context['catch'](46);

            console.log('Error occurred when crawling event list.');
            console.error(_context.t2);
            return _context.abrupt('return', 2);

          case 61:
            if (!(icoEventList.crawlerStatus.getEventList && icoEventList.crawlerStatus.getTraffic)) {
              _context.next = 77;
              break;
            }

            _context.prev = 62;

            console.log('Finish getting all data, output csv...');
            csv = (0, _csv2.default)(icoEventList);
            _context.next = 67;
            return writeFile(fileName + '.csv', csv);

          case 67:
            console.log('Finish outputing csv.');
            _context.next = 75;
            break;

          case 70:
            _context.prev = 70;
            _context.t3 = _context['catch'](62);

            console.log('Error occurred when writing csv.');
            console.error(_context.t3);
            return _context.abrupt('return', 3);

          case 75:
            _context.next = 80;
            break;

          case 77:
            console.log('Some job are still not done. But im going to rest now.');
            console.log('Restart me to finish those job.');
            return _context.abrupt('return', 4);

          case 80:

            console.log('Finish all jobs. I can rest now. :)');
            console.log('Bye~');
            return _context.abrupt('return', 0);

          case 83:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 16], [28, 39], [46, 56], [62, 70]]);
  }));

  return function crawlICO(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Initialize a ico Event file that store ico event data and crawler's basic info and current status
 * @param {string} source ico event source website
 * @return {object} initial icoEventList data structure
 */


/**
 * Crawl ICO event.
 * @param {object} driver Selenium web driver.
 * @param {object} source source website to get ico event
 * @return {object} An object containing current data status and ICO event list and its information.
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
              _context2.next = 5;
              break;
            }

            _context2.next = 4;
            return crawlICOEventFromICODrop(driver);

          case 4:
            icoEventList = _context2.sent;

          case 5:
            return _context2.abrupt('return', icoEventList);

          case 6:
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
 * @return {object} An object containing ICO event list and its information.
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
            _i = 0;

          case 54:
            if (!(_i < icoEventList.length)) {
              _context3.next = 96;
              break;
            }

            _icoEvent = icoEventList[_i];
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

            if (lastMonthString === 'JANUARY' && dateArray[1] !== 'JANUARY') year -= 1;

            dateString = (0, _utility.getDateFromStrMonth)(year, dateArray[1], Number(dateArray[0]));
            lastMonthString = dateArray[1];

          case 86:
            _icoEvent.endDate = dateString;
            _icoEvent.traffic = { success: false };
            _context3.next = 93;
            break;

          case 90:
            _context3.prev = 90;
            _context3.t3 = _context3['catch'](56);

            console.error(_context3.t3);

          case 93:
            _i++;
            _context3.next = 54;
            break;

          case 96:
            return _context3.abrupt('return', icoEventList);

          case 97:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[18, 41], [56, 90]]);
  }));

  return function crawlICOEventFromICODrop(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Crawl ICO event traffic from similarweb and modify icoEventList directly.
 * @param {object} driver Selenium web driver.
 * @param {object} icoEventList An object containing ICO event information.
 * @param {string} fileName output fileName
 */


var crawlICOEventTraffic = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(driver, icoEventList, fileName) {
    var icoEvent, i;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log('Crawl traffic from similar web...');

            icoEvent = void 0;
            _context4.next = 4;
            return (0, _similarweb.signInSimilarWeb)(driver);

          case 4:
            i = 0;

          case 5:
            if (!(i < icoEventList.data.length)) {
              _context4.next = 19;
              break;
            }

            console.log(i);

            if (!(icoEventList.data[i].hasOwnProperty('traffic') && icoEventList.data[i].traffic.success)) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt('continue', 16);

          case 9:
            icoEvent = icoEventList.data[i];

            console.log('Crawl ' + icoEvent.name + ' traffic...');
            _context4.next = 13;
            return (0, _similarweb.getTraffic)(driver, (0, _utility.getDomainName)(icoEvent.url));

          case 13:
            icoEvent.traffic = _context4.sent;
            _context4.next = 16;
            return writeFile(fileName, JSON.stringify(icoEventList));

          case 16:
            i++;
            _context4.next = 5;
            break;

          case 19:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function crawlICOEventTraffic(_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Check if all ico event finish getting traffic data
 * @param {object} icoEventList An object containing ICO event information.
 * @return {bool} whether all ico event finish getting traffic data
 */


var _seleniumWebdriver = require('selenium-webdriver');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _similarweb = require('../similarweb');

var _utility = require('../utility');

var _csv = require('./csv');

var _csv2 = _interopRequireDefault(_csv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var readFile = _util2.default.promisify(_fs2.default.readFile);
var writeFile = _util2.default.promisify(_fs2.default.writeFile);
var access = _util2.default.promisify(_fs2.default.access);function initializeIcoEventList(source) {
  console.log('Initializing icoEventList...');
  var object = {
    from: source,
    crawlerStatus: {
      getEventList: false,
      getTraffic: false
    },
    data: []
  };
  return object;
}function checkAllTrafficSuccess(icoEventList) {
  for (var i = 0; i < icoEventList.data.length; i++) {
    if (!icoEventList.data[i].hasOwnProperty('traffic') || !icoEventList.data[i].traffic.success) {
      return false;
    }
  }
  return true;
}

exports.default = crawlICO;