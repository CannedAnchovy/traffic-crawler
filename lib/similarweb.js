'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTimeInterval = exports.getVisitSource = exports.getTotalVisit = exports.signInSimilarWeb = undefined;

/**
 * Sign in to similarweb with username and password in config
 * @param {object} driver Selenium web driver.
 */
var signInSimilarWeb = exports.signInSimilarWeb = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver) {
    var usernameElement, passwordElement;
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
            usernameElement = _context.sent;
            _context.next = 8;
            return usernameElement.sendKeys(_similarweb2.default.username);

          case 8:
            _context.next = 10;
            return driver.findElement(_seleniumWebdriver.By.css('input#Password--2'));

          case 10:
            passwordElement = _context.sent;
            _context.next = 13;
            return passwordElement.sendKeys(_similarweb2.default.password, _seleniumWebdriver.Key.ENTER);

          case 13:
            _context.next = 15;
            return driver.wait(_seleniumWebdriver.until.titleIs('SimilarWeb Home'), 100000);

          case 15:

            console.log('Logged in!');

          case 16:
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

/**
 * Get domain's total visit
 * @param {object} driver Selenium web driver.
 * @return {string} the total visit string
 */


var getTotalVisit = exports.getTotalVisit = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(driver) {
    var containerElement, visitElement;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return clickSideNav(driver, 1, 0);

          case 2:
            containerElement = driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.single-metric-visits-with-share')), 10000);
            visitElement = containerElement.findElement(_seleniumWebdriver.By.css('div.big-text.u-blueMediumMedium'));
            _context2.next = 6;
            return visitElement.getText();

          case 6:
            return _context2.abrupt('return', _context2.sent);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getTotalVisit(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Get domain's visit source and sources' percentage
 * @param {object} driver Selenium web driver.
 * @return {object} domain's visit source and sources' percentage
 */


var getVisitSource = exports.getVisitSource = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver) {
    var containerElement, percentageElements, percentageArray, text, i;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return clickSideNav(driver, 2, 0);

          case 2:
            _context3.next = 4;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.highcharts-data-labels')), 10000);

          case 4:
            containerElement = _context3.sent;
            _context3.next = 7;
            return containerElement.findElements(_seleniumWebdriver.By.css('span'));

          case 7:
            percentageElements = _context3.sent;
            percentageArray = [];
            text = void 0;

            // busy waiting until percentage span is loaded

          case 10:
            if (!true) {
              _context3.next = 18;
              break;
            }

            _context3.next = 13;
            return percentageElements[0].getText();

          case 13:
            text = _context3.sent;

            if (!(text !== '')) {
              _context3.next = 16;
              break;
            }

            return _context3.abrupt('break', 18);

          case 16:
            _context3.next = 10;
            break;

          case 18:
            i = 0;

          case 19:
            if (!(i < percentageElements.length)) {
              _context3.next = 28;
              break;
            }

            _context3.t0 = percentageArray;
            _context3.next = 23;
            return percentageElements[i].getText();

          case 23:
            _context3.t1 = _context3.sent;

            _context3.t0.push.call(_context3.t0, _context3.t1);

          case 25:
            i++;
            _context3.next = 19;
            break;

          case 28:
            return _context3.abrupt('return', {
              direct: percentageArray[0],
              referrals: percentageArray[2],
              social: percentageArray[3],
              organic: percentageArray[4],
              ads: percentageArray[6]
            });

          case 29:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getVisitSource(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Set the time interval in similarweb
 * @param {object} driver Selenium web driver.
 * @param {string} timeString The time string (display text) in the dropdown list.
 */


var setTimeInterval = exports.setTimeInterval = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(driver, timeString) {
    var timeIntervalElement, durationContainer, selectTimeElement, dropdownItems, itemIndex;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // get to random domain search result
            console.log('go kfc');
            _context4.next = 3;
            return searchDomain(driver, 'kfc.com');

          case 3:
            _context4.next = 5;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.DropdownButton')));

          case 5:
            timeIntervalElement = _context4.sent;
            _context4.next = 8;
            return timeIntervalElement.click();

          case 8:
            _context4.next = 10;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.DurationSelector-container')), 10000);

          case 10:
            durationContainer = _context4.sent;
            _context4.next = 13;
            return durationContainer.findElement(_seleniumWebdriver.By.css('div.DropdownButton'));

          case 13:
            selectTimeElement = _context4.sent;
            _context4.next = 16;
            return selectTimeElement.click();

          case 16:
            _context4.next = 18;
            return driver.findElements(_seleniumWebdriver.By.css('div.DropdownItem'));

          case 18:
            dropdownItems = _context4.sent;
            _context4.next = 21;
            return getElementIndex(dropdownItems, timeString);

          case 21:
            itemIndex = _context4.sent;
            _context4.next = 24;
            return dropdownItems[itemIndex].click();

          case 24:
            _context4.next = 26;
            return driver.findElement(_seleniumWebdriver.By.css('button.Button.DurationSelector-action-submit')).click();

          case 26:
            _context4.next = 28;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.website-header-title')), 10000);

          case 28:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function setTimeInterval(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Search specified domain in similar web
 * @param {object} driver Selenium web driver.
 * @param {string} domain
 */


var searchDomain = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(driver, domain) {
    var searchElement;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return driver.findElement(_seleniumWebdriver.By.css('input.universalInput-input'));

          case 2:
            searchElement = _context5.sent;
            _context5.next = 5;
            return searchElement.click();

          case 5:
            _context5.next = 7;
            return searchElement.sendKeys(domain);

          case 7:
            _context5.next = 9;
            return (0, _utility.sleep)(1000);

          case 9:
            _context5.next = 11;
            return searchElement.sendKeys(_seleniumWebdriver.Key.ENTER);

          case 11:
            _context5.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.css('div.website-header-title')), 10000);

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function searchDomain(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Click the side nav link according to listText and itemText
 * (cant use getElementIndex because <a></a> cannot getText())
 * @param {object} driver Selenium web driver.
 * @param {number} listIndex the list index
 * @param {number} itemIndex the item index
 */


var clickSideNav = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(driver, listIndex, itemIndex) {
    var listElements, containerElements, itemElements;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return driver.findElements(_seleniumWebdriver.By.css('div.sc-VJcYb.cOSUNP'));

          case 2:
            listElements = _context6.sent;
            _context6.next = 5;
            return driver.findElements(_seleniumWebdriver.By.css('div.SideNavGroupContainer-glSWhQ.cWqtzl'));

          case 5:
            containerElements = _context6.sent;
            _context6.next = 8;
            return containerElements[listIndex].findElements(_seleniumWebdriver.By.css('a.sc-bsbRJL.jceUKY'));

          case 8:
            itemElements = _context6.sent;
            _context6.prev = 9;
            _context6.next = 12;
            return itemElements[itemIndex].click();

          case 12:
            _context6.next = 20;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6['catch'](9);
            _context6.next = 18;
            return listElements[listIndex].click();

          case 18:
            _context6.next = 20;
            return itemElements[itemIndex].click();

          case 20:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[9, 14]]);
  }));

  return function clickSideNav(_x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * return the element index of the specified text
 * @param {array} elements An array of webElement.
 * @param {string} text item text
 * @return {number} The element index of the specified text.
 */


var getElementIndex = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(elements, text) {
    var elementText, i;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            elementText = void 0;
            i = 0;

          case 2:
            if (!(i < elements.length)) {
              _context7.next = 16;
              break;
            }

            _context7.prev = 3;
            _context7.next = 6;
            return elements[i].getText();

          case 6:
            elementText = _context7.sent;

            if (!(elementText === text)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt('return', i);

          case 9:
            _context7.next = 13;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7['catch'](3);

          case 13:
            i++;
            _context7.next = 2;
            break;

          case 16:
            return _context7.abrupt('return', -1);

          case 17:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this, [[3, 11]]);
  }));

  return function getElementIndex(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

var _seleniumWebdriver = require('selenium-webdriver');

var _similarweb = require('../similarweb.json');

var _similarweb2 = _interopRequireDefault(_similarweb);

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }