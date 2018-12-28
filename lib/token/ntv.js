'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * crawl token price data from coin gecko
 * @param {*} url coin gecko url
 * @return {array} token price data array
 */
var crawlPriceFromCoinGecko = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, coin) {
    var data, driver, chartElement, labelElement, count, repeatCount, tempData, _tempData, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = [];

            // get webpage

            _context2.next = 3;
            return new _seleniumWebdriver.Builder().forBrowser('safari').build();

          case 3:
            driver = _context2.sent;
            _context2.next = 6;
            return driver.get(url);

          case 6:
            _context2.next = 8;
            return (0, _utility.sleep)(5000);

          case 8:
            _context2.next = 10;
            return driver.findElement(_seleniumWebdriver.By.css('canvas'));

          case 10:
            chartElement = _context2.sent;

            console.log('gi');
            _context2.next = 14;
            return driver.findElement(_seleniumWebdriver.By.css('div.dygraph-legend'));

          case 14:
            labelElement = _context2.sent;

            console.log('hi');
            // move chart to the center of the screen
            _context2.next = 18;
            return driver.executeScript('arguments[0].scrollIntoView()', chartElement);

          case 18:
            count = 0;
            repeatCount = 0;

            // crawl the right part of the chart

            _context2.next = 22;
            return driver.actions().move({ origin: chartElement }).perform();

          case 22:
            if (!true) {
              _context2.next = 46;
              break;
            }

            console.log(++count);

            _context2.next = 26;
            return driver.actions().move({ origin: _input.Origin.POINTER, x: 1, y: 0 }).perform();

          case 26:
            _context2.t0 = console;
            _context2.next = 29;
            return labelElement.getText();

          case 29:
            _context2.t1 = _context2.sent;

            _context2.t0.log.call(_context2.t0, _context2.t1);

            _context2.next = 33;
            return getCoinGeckoTimePointData(driver, chartElement);

          case 33:
            tempData = _context2.sent;

            if (!(data.length !== 0 && isEqual(tempData, data[data.length - 1]))) {
              _context2.next = 41;
              break;
            }

            repeatCount++;

            if (!(repeatCount >= 10)) {
              _context2.next = 39;
              break;
            }

            repeatCount = 0;
            return _context2.abrupt('break', 46);

          case 39:
            _context2.next = 44;
            break;

          case 41:
            data.push(tempData);
            console.log(tempData);
            repeatCount = 0;

          case 44:
            _context2.next = 22;
            break;

          case 46:
            console.log('finish right');

            // crawl the left part of the chart
            _context2.next = 49;
            return driver.actions().move({ origin: chartElement }).perform();

          case 49:
            if (!true) {
              _context2.next = 68;
              break;
            }

            console.log(++count);

            _context2.next = 53;
            return driver.actions().move({ origin: _input.Origin.POINTER, x: -1, y: 0 }).perform();

          case 53:
            _context2.next = 55;
            return getCoinGeckoTimePointData(driver, chartElement);

          case 55:
            _tempData = _context2.sent;

            if (!(data.length !== 0 && isEqual(_tempData, data[data.length - 1]))) {
              _context2.next = 63;
              break;
            }

            repeatCount++;

            if (!(repeatCount >= 10)) {
              _context2.next = 61;
              break;
            }

            repeatCount = 0;
            return _context2.abrupt('break', 68);

          case 61:
            _context2.next = 66;
            break;

          case 63:
            data.push(_tempData);
            console.log(_tempData);
            repeatCount = 0;

          case 66:
            _context2.next = 49;
            break;

          case 68:
            console.log('finish left');

            data.sort(function (a, b) {
              if (a.time < b.time) return -1;else if (a.time > b.time) return 1;else return 0;
            });

            for (i = 0; i < data.length - 1; i++) {
              if (isEqual(data[i], data[i + 1])) {
                data.splice(i, 1);
                i--;
              }
            }

            return _context2.abrupt('return', data);

          case 72:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function crawlPriceFromCoinGecko(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * get a single time point data from coin gecko page
 * @param {object} driver selenium web driver
 * @return {object} time point data
 */


var getCoinGeckoTimePointData = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver) {
    var labelElement, spanElement, text, priceIndex, volIndex;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return driver.findElement(_seleniumWebdriver.By.css('div.highcharts-label'));

          case 2:
            labelElement = _context3.sent;
            _context3.next = 5;
            return labelElement.findElement(_seleniumWebdriver.By.css('span'));

          case 5:
            spanElement = _context3.sent;
            _context3.next = 8;
            return spanElement.getText();

          case 8:
            text = _context3.sent;
            priceIndex = text.indexOf('Price: ');
            volIndex = text.indexOf('Vol: ');
            return _context3.abrupt('return', {
              time: new Date(text.slice(0, priceIndex)),
              price: Number(text.slice(priceIndex + 10, volIndex)),
              volume: Number(text.slice(volIndex + 8).split(',').join(''))
            });

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getCoinGeckoTimePointData(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * determine whether two timePointData is equal
 * @param {object} timePointData1
 * @param {object} timePointData2
 * @return {bool} whether two timePointData is equal
 */


var _seleniumWebdriver = require('selenium-webdriver');

var _input = require('selenium-webdriver/lib/input');

var _fsPromise = require('../fsPromise');

var _utility = require('../utility');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * main function for tokenPrice.js
 *
 */
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, csvData, header;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return crawlPriceFromCoinGecko('https://coinmetrics.io/nvt/#assets=btc');

          case 2:
            data = _context.sent;
            csvData = data.map(timePointDatatoCsvString);
            header = 'Date,Price(USD),Volume(USD)\n';
            _context.next = 7;
            return (0, _fsPromise.writeFile)('data/token/tokenPrice(COB)', JSON.stringify(data, '', 2));

          case 7:
            _context.next = 9;
            return (0, _fsPromise.writeFile)('data/token/tokenPrice(COB).csv', header + csvData.join('\n') + '\n');

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function main() {
    return _ref.apply(this, arguments);
  }

  return main;
}();

function isEqual(timePointData1, timePointData2) {
  return timePointData1.price === timePointData2.price && timePointData1.volume === timePointData2.volume;
}

/**
 * convert timePointData to a csv string
 * @param {object} timePointData
 * @return {string}
 */
function timePointDatatoCsvString(timePointData) {
  var string = '';
  string += '\"' + timePointData.time.toISOString().slice(0, 10) + '\",';
  string += '\"' + timePointData.price.toFixed(6) + '\",';
  string += '\"' + timePointData.volume.toFixed(0) + '\"';
  return string;
}