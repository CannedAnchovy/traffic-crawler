'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seleniumWebdriver = require('selenium-webdriver');

var _fsPromise = require('../fsPromise');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var tokenNum = 30;

/**
 * Crawl the top 30 token's Total Supply, Holders, Transfers from Etherscan
 */

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, driver, tableElement, trElements, i, tokenElement, hexElement, linkElement, nameElement, _i, tbodyElement, totalSupplyElement, tdElement, priceElement, tdElements, holderElement, transferElement, _i2, j;

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
            return driver.get('https://etherscan.io/tokens-nft');

          case 6:
            _context.next = 8;
            return driver.findElement(_seleniumWebdriver.By.css('table.table.table-bordered.table-striped'));

          case 8:
            tableElement = _context.sent;
            _context.next = 11;
            return tableElement.findElements(_seleniumWebdriver.By.css('tr'));

          case 11:
            trElements = _context.sent;


            trElements = trElements.slice(1, tokenNum + 1);
            i = 0;

          case 14:
            if (!(i < trElements.length)) {
              _context.next = 42;
              break;
            }

            _context.next = 17;
            return trElements[i].findElements(_seleniumWebdriver.By.css('td'));

          case 17:
            tokenElement = _context.sent[2];
            _context.next = 20;
            return tokenElement.findElement(_seleniumWebdriver.By.css('span'));

          case 20:
            hexElement = _context.sent;
            _context.next = 23;
            return tokenElement.findElement(_seleniumWebdriver.By.css('a'));

          case 23:
            linkElement = _context.sent;
            _context.next = 26;
            return tokenElement.findElement(_seleniumWebdriver.By.css('font'));

          case 26:
            nameElement = _context.sent;
            _context.t0 = data;
            _context.next = 30;
            return hexElement.getText();

          case 30:
            _context.t1 = _context.sent;
            _context.next = 33;
            return nameElement.getText();

          case 33:
            _context.t2 = _context.sent;
            _context.next = 36;
            return linkElement.getAttribute('href');

          case 36:
            _context.t3 = _context.sent;
            _context.t4 = [_context.t1, _context.t2, _context.t3];

            _context.t0.push.call(_context.t0, _context.t4);

          case 39:
            i++;
            _context.next = 14;
            break;

          case 42:
            _i = 0;

          case 43:
            if (!(_i < data.length)) {
              _context.next = 94;
              break;
            }

            console.log(data[_i]);
            _context.next = 47;
            return driver.get(data[_i][2]);

          case 47:
            _context.next = 49;
            return driver.findElement(_seleniumWebdriver.By.css('tbody'));

          case 49:
            tbodyElement = _context.sent;
            _context.next = 52;
            return tbodyElement.findElement(_seleniumWebdriver.By.css('tr'));

          case 52:
            totalSupplyElement = _context.sent;
            _context.next = 55;
            return totalSupplyElement.findElement(_seleniumWebdriver.By.css('td.tditem'));

          case 55:
            tdElement = _context.sent;
            _context.t5 = data[_i];
            _context.next = 59;
            return tdElement.getText();

          case 59:
            _context.t6 = _context.sent;

            _context.t5.push.call(_context.t5, _context.t6);

            _context.next = 63;
            return tbodyElement.findElement(_seleniumWebdriver.By.css('tr#ContentPlaceHolder1_tr_valuepertoken'));

          case 63:
            priceElement = _context.sent;
            _context.next = 66;
            return priceElement.findElements(_seleniumWebdriver.By.css('td'));

          case 66:
            tdElements = _context.sent;
            _context.t7 = data[_i];
            _context.next = 70;
            return tdElements[1].getText();

          case 70:
            _context.t8 = _context.sent;

            _context.t7.push.call(_context.t7, _context.t8);

            _context.next = 74;
            return tbodyElement.findElement(_seleniumWebdriver.By.css('tr#ContentPlaceHolder1_tr_tokenHolders'));

          case 74:
            holderElement = _context.sent;
            _context.next = 77;
            return holderElement.findElements(_seleniumWebdriver.By.css('td'));

          case 77:
            tdElements = _context.sent;
            _context.t9 = data[_i];
            _context.next = 81;
            return tdElements[1].getText();

          case 81:
            _context.t10 = _context.sent;

            _context.t9.push.call(_context.t9, _context.t10);

            _context.next = 85;
            return tbodyElement.findElement(_seleniumWebdriver.By.css('span#totaltxns'));

          case 85:
            transferElement = _context.sent;
            _context.t11 = data[_i];
            _context.next = 89;
            return transferElement.getText();

          case 89:
            _context.t12 = _context.sent;

            _context.t11.push.call(_context.t11, _context.t12);

          case 91:
            _i++;
            _context.next = 43;
            break;

          case 94:
            _context.next = 96;
            return (0, _fsPromise.writeFile)('data/tokenTracker', JSON.stringify(data, '', 2));

          case 96:

            for (_i2 = 0; _i2 < data.length; _i2++) {
              for (j = 0; j < data[_i2].length; j++) {
                data[_i2][j] = '\"' + data[_i2][j] + '\"';
              }

              data[_i2] = data[_i2].join(',');
            }

            _context.next = 99;
            return (0, _fsPromise.writeFile)('data/tokenTracker.csv', data.join('\n'));

          case 99:
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