'use strict';

/**
 * Sign in to similarweb with username and password in config
 * @param {object} driver Selenium web driver.
 */
var signInSimilarWeb = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver) {
    var userNameElement;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Logging in to SimilarWeb...');

            _context.next = 3;
            return driver.get('https://account.similarweb.com/login');

          case 3:
            _context.next = 5;
            return driver.findElement(_seleniumWebdriver.By.css('input#UserName--1'));

          case 5:
            userNameElement = _context.sent;

            userNameElement.sendKeys(_similarweb2.default.username);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function signInSimilarWeb(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _seleniumWebdriver = require('selenium-webdriver');

var _similarweb = require('../similarweb.json');

var _similarweb2 = _interopRequireDefault(_similarweb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }