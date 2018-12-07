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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    var data, driver, buttonElement, chartElement, count, repeatCount, tempData, _tempData, i;

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
            return driver.findElement(_seleniumWebdriver.By.css('a.graph-stats-btn-max.center'));

          case 8:
            buttonElement = _context2.sent;
            _context2.next = 11;
            return buttonElement.click();

          case 11:
            _context2.next = 13;
            return (0, _utility.sleep)(5000);

          case 13:
            _context2.next = 15;
            return driver.findElement(_seleniumWebdriver.By.css('svg.highcharts-root'));

          case 15:
            chartElement = _context2.sent;
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
              _context2.next = 41;
              break;
            }

            console.log(++count);

            _context2.next = 26;
            return driver.actions().move({ origin: _input.Origin.POINTER, x: 1, y: 0 }).perform();

          case 26:
            _context2.next = 28;
            return getCoinGeckoTimePointData(driver, chartElement);

          case 28:
            tempData = _context2.sent;

            if (!(data.length !== 0 && isEqual(tempData, data[data.length - 1]))) {
              _context2.next = 36;
              break;
            }

            repeatCount++;

            if (!(repeatCount >= 10)) {
              _context2.next = 34;
              break;
            }

            repeatCount = 0;
            return _context2.abrupt('break', 41);

          case 34:
            _context2.next = 39;
            break;

          case 36:
            data.push(tempData);
            console.log(tempData);
            repeatCount = 0;

          case 39:
            _context2.next = 22;
            break;

          case 41:
            console.log('finish right');

            // crawl the left part of the chart
            _context2.next = 44;
            return driver.actions().move({ origin: chartElement }).perform();

          case 44:
            if (!true) {
              _context2.next = 63;
              break;
            }

            console.log(++count);

            _context2.next = 48;
            return driver.actions().move({ origin: _input.Origin.POINTER, x: -1, y: 0 }).perform();

          case 48:
            _context2.next = 50;
            return getCoinGeckoTimePointData(driver, chartElement);

          case 50:
            _tempData = _context2.sent;

            if (!(data.length !== 0 && isEqual(_tempData, data[data.length - 1]))) {
              _context2.next = 58;
              break;
            }

            repeatCount++;

            if (!(repeatCount >= 10)) {
              _context2.next = 56;
              break;
            }

            repeatCount = 0;
            return _context2.abrupt('break', 63);

          case 56:
            _context2.next = 61;
            break;

          case 58:
            data.push(_tempData);
            console.log(_tempData);
            repeatCount = 0;

          case 61:
            _context2.next = 44;
            break;

          case 63:
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

          case 67:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function crawlPriceFromCoinGecko(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * sort price distribution
 * @param {object} priceDistribution
 * @return {array}
 */


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

  return function getCoinGeckoTimePointData(_x2) {
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
    var data, csvData, header, priceDistribution, priceDistributionArray, i, timePointData, unit, priceKey, oldLength, newLength, key, _key, latestData, priceString, numberString, _i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return crawlPriceFromCoinGecko('https://www.coingecko.com/zh-tw/%E6%95%B8%E5%AD%97%E8%B2%A8%E5%B9%A3/cobinhood');

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

            // calculate price distribution based on token price data
            priceDistribution = {};

            priceDistribution['0.046449'] = 28909216;
            priceDistribution['0.053624'] = 43321408;
            priceDistribution['0.062149'] = 19124688;
            priceDistribution['0.068546'] = 1594824;

            priceDistributionArray = [];

            priceDistributionArray.push({
              time: new Date('2017-10-30'),
              priceDistribution: JSON.parse(JSON.stringify(priceDistribution))
            });

            console.log(priceDistributionArray);

            i = 0;

          case 18:
            if (!(i < data.length)) {
              _context.next = 47;
              break;
            }

            timePointData = data[i];
            unit = timePointData.volume / timePointData.price;
            priceKey = timePointData.price.toFixed(6);
            oldLength = data.length;
            newLength = data.length;


            if (priceDistribution[priceKey] === undefined) {
              priceDistribution[priceKey] = unit;
            } else {
              priceDistribution[priceKey] += unit;
            }

            _context.t0 = regeneratorRuntime.keys(priceDistribution);

          case 26:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 34;
              break;
            }

            key = _context.t1.value;

            if (!priceDistribution.hasOwnProperty(key)) {
              _context.next = 32;
              break;
            }

            if (!(key === priceKey)) {
              _context.next = 31;
              break;
            }

            return _context.abrupt('continue', 26);

          case 31:
            if (priceDistribution[key] < unit / oldLength) {
              unit -= priceDistribution[key];
              priceDistribution[key] = 0;
              newLength--;
            }

          case 32:
            _context.next = 26;
            break;

          case 34:
            _context.t2 = regeneratorRuntime.keys(priceDistribution);

          case 35:
            if ((_context.t3 = _context.t2()).done) {
              _context.next = 43;
              break;
            }

            _key = _context.t3.value;

            if (!priceDistribution.hasOwnProperty(_key)) {
              _context.next = 41;
              break;
            }

            if (!(_key === priceKey)) {
              _context.next = 40;
              break;
            }

            return _context.abrupt('continue', 35);

          case 40:
            if (priceDistribution[_key] !== 0) {
              priceDistribution[_key] -= unit / newLength;
            }

          case 41:
            _context.next = 35;
            break;

          case 43:

            priceDistributionArray.push({
              time: timePointData.time,
              priceDistribution: JSON.parse(JSON.stringify(priceDistribution))
            });

          case 44:
            i++;
            _context.next = 18;
            break;

          case 47:
            _context.next = 49;
            return (0, _fsPromise.writeFile)('data/token/priceDistribution(COB)', JSON.stringify(priceDistributionArray, '', 2));

          case 49:

            // calculate latest data
            latestData = sortPriceDistribution(priceDistributionArray[priceDistributionArray.length - 1].priceDistribution);
            priceString = '';
            numberString = '';


            for (_i = 0; _i < latestData.length; _i++) {
              priceString += '\"' + latestData[_i].price + '\",';
              numberString += '\"' + latestData[_i].number + '\",';

              if (_i === latestData.length - 1) {
                priceString += '\"' + latestData[_i].price + '\"';
                numberString += '\"' + latestData[_i].number + '\"';
              }
            }

            _context.next = 55;
            return (0, _fsPromise.writeFile)('data/token/priceDistribution(COB).csv', priceString + '\n' + numberString);

          case 55:
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

function sortPriceDistribution(priceDistribution) {
  var priceDistributionArray = [];
  for (var key in priceDistribution) {
    if (priceDistribution.hasOwnProperty(key)) {
      priceDistributionArray.push({
        price: Number(key),
        number: priceDistribution[key]
      });
    }
  }

  priceDistributionArray.sort(function (a, b) {
    if (a.price < b.price) return -1;else if (a.price > b.price) return 1;else return 0;
  });

  return priceDistributionArray;
}function isEqual(timePointData1, timePointData2) {
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