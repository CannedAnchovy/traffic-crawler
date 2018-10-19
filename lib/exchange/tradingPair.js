'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seleniumWebdriver = require('selenium-webdriver');

var _chrome = require('selenium-webdriver/chrome');

var _chrome2 = _interopRequireDefault(_chrome);

var _fsPromise = require('../fsPromise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Crawl top 5 trading pairs of all exchanges
 */
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var string, screen, driver, trElements, exchangeElements, currentIndex, i, id, data, aElement, name, _i, tradingPairElement, tdElements, tradingPairNameElement, tradingPairName;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            string = '';
            screen = {
              width: 2560,
              height: 1600
            };

            // make chrome headless
            // let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();

            _context.next = 4;
            return new _seleniumWebdriver.Builder().forBrowser('chrome').build();

          case 4:
            driver = _context.sent;
            _context.next = 7;
            return driver.get('https://coinmarketcap.com/exchanges/volume/24-hour/');

          case 7:
            _context.next = 9;
            return driver.findElements(_seleniumWebdriver.By.css('tr'));

          case 9:
            trElements = _context.sent;
            _context.next = 12;
            return driver.findElements(_seleniumWebdriver.By.css('tr[id]'));

          case 12:
            exchangeElements = _context.sent;
            currentIndex = 0;


            console.log('Total ' + exchangeElements.length + ' exchanges.');

            i = 0;

          case 16:
            if (!(i < exchangeElements.length)) {
              _context.next = 67;
              break;
            }

          case 17:
            if (!true) {
              _context.next = 26;
              break;
            }

            _context.next = 20;
            return trElements[currentIndex].getAttribute('id');

          case 20:
            id = _context.sent;

            if (!(id !== '')) {
              _context.next = 23;
              break;
            }

            return _context.abrupt('break', 26);

          case 23:

            currentIndex += 1;
            _context.next = 17;
            break;

          case 26:

            // get exchange name on cmc
            data = [];
            _context.next = 29;
            return trElements[currentIndex].findElement(_seleniumWebdriver.By.css('a'));

          case 29:
            aElement = _context.sent;
            _context.next = 32;
            return aElement.getText();

          case 32:
            name = _context.sent;

            data.push(name);

            console.log('Crawling ' + name + ' trading pairs...');

            // skip the table header row
            currentIndex += 2;

            // extract trading pair information
            _i = 0;

          case 37:
            if (!(_i < 10)) {
              _context.next = 62;
              break;
            }

            tradingPairElement = trElements[currentIndex + _i];
            _context.next = 41;
            return tradingPairElement.findElements(_seleniumWebdriver.By.css('td'));

          case 41:
            tdElements = _context.sent;

            if (!(tdElements.length !== 6)) {
              _context.next = 44;
              break;
            }

            return _context.abrupt('break', 62);

          case 44:
            _context.next = 46;
            return tdElements[2].findElement(_seleniumWebdriver.By.css('a'));

          case 46:
            tradingPairNameElement = _context.sent;
            _context.next = 49;
            return tradingPairNameElement.getText();

          case 49:
            tradingPairName = _context.sent;

            console.log(tradingPairName);
            data.push(tradingPairName);

            // get trading pair volume
            _context.t0 = data;
            _context.next = 55;
            return tdElements[3].getText();

          case 55:
            _context.t1 = _context.sent;
            _context.t2 = '\"' + _context.t1;
            _context.t3 = _context.t2 + '\"';

            _context.t0.push.call(_context.t0, _context.t3);

          case 59:
            _i++;
            _context.next = 37;
            break;

          case 62:

            string += data.join(',');
            string += '\n';

          case 64:
            i++;
            _context.next = 16;
            break;

          case 67:
            _context.next = 69;
            return (0, _fsPromise.writeFile)('data/tradingPairs.csv', string);

          case 69:
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