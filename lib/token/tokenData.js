'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * get token data from https://www.tokendata.io/ table
 * @param {object} trElement trElement containing token's data
 * @return {array} token data
 */
var getTokenData = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(trElement) {
    var data, string, tempElement, tdElements, nameHasNoHref;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = [];
            string = '';
            tempElement = void 0;
            _context2.next = 5;
            return trElement.findElements(_seleniumWebdriver.By.css('td'));

          case 5:
            tdElements = _context2.sent;
            nameHasNoHref = false;

            // get token name

            _context2.prev = 7;
            _context2.next = 10;
            return tdElements[1].findElement(_seleniumWebdriver.By.css('span'));

          case 10:
            tempElement = _context2.sent;
            _context2.next = 13;
            return tempElement.getText();

          case 13:
            string = _context2.sent;
            _context2.next = 29;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](7);

            console.error('Error occurred when getting token name');

            _context2.prev = 19;
            _context2.next = 22;
            return tdElements[1].getText();

          case 22:
            string = _context2.sent;

            nameHasNoHref = true;
            _context2.next = 29;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t1 = _context2['catch'](19);

            string = '';

          case 29:
            data.push(string);

            console.log('Crawling ' + string + '\'s data...');

            // get token website url
            _context2.prev = 31;

            if (nameHasNoHref) {
              _context2.next = 38;
              break;
            }

            _context2.next = 35;
            return tdElements[1].findElement(_seleniumWebdriver.By.css('a'));

          case 35:
            tempElement = _context2.sent;
            _context2.next = 42;
            break;

          case 38:
            _context2.next = 40;
            return tdElements[0].findElement(_seleniumWebdriver.By.css('a'));

          case 40:
            tempElement = _context2.sent;

            nameHasNoHref = false;

          case 42:
            _context2.next = 44;
            return tempElement.getAttribute('href');

          case 44:
            string = _context2.sent;
            _context2.next = 51;
            break;

          case 47:
            _context2.prev = 47;
            _context2.t2 = _context2['catch'](31);

            console.error('Error occurred when getting token website url');
            string = '';

          case 51:
            data.push(string);

            // get token symbol text
            _context2.prev = 52;
            _context2.next = 55;
            return tdElements[2].findElement(_seleniumWebdriver.By.css('span'));

          case 55:
            tempElement = _context2.sent;
            _context2.next = 58;
            return tempElement.getText();

          case 58:
            string = _context2.sent;
            _context2.next = 65;
            break;

          case 61:
            _context2.prev = 61;
            _context2.t3 = _context2['catch'](52);

            console.error('Error occurred when getting token symbol text');
            string = '';

          case 65:
            data.push(string);

            // get token symbol img url
            _context2.prev = 66;
            _context2.next = 69;
            return tdElements[0].findElement(_seleniumWebdriver.By.css('img'));

          case 69:
            tempElement = _context2.sent;
            _context2.next = 72;
            return tempElement.getAttribute('src');

          case 72:
            string = _context2.sent;
            _context2.next = 79;
            break;

          case 75:
            _context2.prev = 75;
            _context2.t4 = _context2['catch'](66);

            console.error('Error occurred when getting token symbol img url');
            string = '';

          case 79:
            data.push(string);

            // get token status
            _context2.prev = 80;
            _context2.next = 83;
            return tdElements[3].findElement(_seleniumWebdriver.By.css('span'));

          case 83:
            tempElement = _context2.sent;
            _context2.next = 86;
            return tempElement.getText();

          case 86:
            string = _context2.sent;
            _context2.next = 93;
            break;

          case 89:
            _context2.prev = 89;
            _context2.t5 = _context2['catch'](80);

            console.error('Error occurred when getting token status');
            string = '';

          case 93:
            data.push(string);

            // get token raised money
            _context2.prev = 94;
            _context2.next = 97;
            return tdElements[4].getText();

          case 97:
            string = _context2.sent;

            if (!(string === '')) {
              _context2.next = 100;
              break;
            }

            throw new Error('Empty text!');

          case 100:
            _context2.next = 106;
            break;

          case 102:
            _context2.prev = 102;
            _context2.t6 = _context2['catch'](94);

            console.error('Error occurred when getting token raised money');
            string = '';

          case 106:
            data.push(string);

            // get token ico time
            _context2.prev = 107;
            _context2.next = 110;
            return tdElements[5].findElement(_seleniumWebdriver.By.css('span'));

          case 110:
            tempElement = _context2.sent;
            _context2.next = 113;
            return tempElement.getAttribute('data-original-title');

          case 113:
            string = _context2.sent;
            _context2.next = 120;
            break;

          case 116:
            _context2.prev = 116;
            _context2.t7 = _context2['catch'](107);

            console.error('Error occurred when getting token ico time');
            string = '';

          case 120:
            data.push(string);

            // get token sale price
            _context2.prev = 121;
            _context2.next = 124;
            return tdElements[6].getText();

          case 124:
            string = _context2.sent;

            if (!(string === '')) {
              _context2.next = 127;
              break;
            }

            throw new Error('Empty text!');

          case 127:
            _context2.next = 133;
            break;

          case 129:
            _context2.prev = 129;
            _context2.t8 = _context2['catch'](121);

            console.error('Error occurred when getting token sale price');
            string = '';

          case 133:
            data.push(string);

            // get token current price
            _context2.prev = 134;
            _context2.next = 137;
            return tdElements[7].getText();

          case 137:
            string = _context2.sent;

            if (!(string === '')) {
              _context2.next = 140;
              break;
            }

            throw new Error('Empty text!');

          case 140:
            _context2.next = 146;
            break;

          case 142:
            _context2.prev = 142;
            _context2.t9 = _context2['catch'](134);

            console.error('Error occurred when getting token current price');
            string = '';

          case 146:
            data.push(string);

            // get token return
            _context2.prev = 147;
            _context2.next = 150;
            return tdElements[8].getText();

          case 150:
            string = _context2.sent;

            if (!(string === '')) {
              _context2.next = 153;
              break;
            }

            throw new Error('Empty text!');

          case 153:
            _context2.next = 159;
            break;

          case 155:
            _context2.prev = 155;
            _context2.t10 = _context2['catch'](147);

            console.error('Error occurred when getting token return');
            string = '';

          case 159:
            data.push(string);

            // get token whitepaper url
            _context2.prev = 160;
            _context2.next = 163;
            return tdElements[9].findElement(_seleniumWebdriver.By.css('a'));

          case 163:
            tempElement = _context2.sent;
            _context2.next = 166;
            return tempElement.getAttribute('href');

          case 166:
            string = _context2.sent;
            _context2.next = 173;
            break;

          case 169:
            _context2.prev = 169;
            _context2.t11 = _context2['catch'](160);

            console.error('Error occurred when getting token whitepaper url');
            string = '';

          case 173:
            data.push(string);

            return _context2.abrupt('return', data);

          case 175:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[7, 16], [19, 26], [31, 47], [52, 61], [66, 75], [80, 89], [94, 102], [107, 116], [121, 129], [134, 142], [147, 155], [160, 169]]);
  }));

  return function getTokenData(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _seleniumWebdriver = require('selenium-webdriver');

var _fsPromise = require('../fsPromise');

var _utility = require('../utility');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * main function tokenData.js
 * crawl all page's token data
 */
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, driver, i, tbodyElement, trElements, j, nextButtonElement, header, _i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = [];
            _context.next = 3;
            return new _seleniumWebdriver.Builder().forBrowser('chrome').build();

          case 3:
            driver = _context.sent;
            _context.next = 6;
            return driver.get('https://www.tokendata.io/');

          case 6:
            _context.next = 8;
            return (0, _utility.sleep)(10000);

          case 8:
            i = 1;

          case 9:
            if (!(i <= 24)) {
              _context.next = 36;
              break;
            }

            _context.next = 12;
            return driver.findElement(_seleniumWebdriver.By.css('tbody'));

          case 12:
            tbodyElement = _context.sent;
            _context.next = 15;
            return tbodyElement.findElements(_seleniumWebdriver.By.css('tr'));

          case 15:
            trElements = _context.sent;

            console.log(trElements.length);
            j = 1;

          case 18:
            if (!(j < trElements.length)) {
              _context.next = 27;
              break;
            }

            _context.t0 = data;
            _context.next = 22;
            return getTokenData(trElements[j]);

          case 22:
            _context.t1 = _context.sent;

            _context.t0.push.call(_context.t0, _context.t1);

          case 24:
            j++;
            _context.next = 18;
            break;

          case 27:
            if (!(i !== 24)) {
              _context.next = 33;
              break;
            }

            nextButtonElement = driver.findElement(_seleniumWebdriver.By.css('li#sample_1_next'));
            _context.next = 31;
            return nextButtonElement.click();

          case 31:
            _context.next = 33;
            return (0, _utility.sleep)(10000);

          case 33:
            i++;
            _context.next = 9;
            break;

          case 36:
            header = ['name', 'website url', 'symbol text', 'symbol img url', 'status', 'USD raised', 'time', 'sale price', 'current price', 'return', 'whitepaper url'];


            header = header.map(function (string) {
              return '\"' + string + '\"';
            });
            header = header.join(',');
            header += '\n';

            for (_i = 0; _i < data.length; _i++) {
              data[_i] = data[_i].map(function (string) {
                return '\"' + string + '\"';
              });
              data[_i] = data[_i].join(',');
            }
            data = data.join('\n');
            data += '\n';

            console.log('Writing data to csv...');
            _context.next = 46;
            return (0, _fsPromise.writeFile)('data/tokenData.csv', header + data);

          case 46:
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