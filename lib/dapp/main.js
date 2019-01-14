'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * main function for exchange
 */
var main = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var fileName;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _dapp2.default)('dappradar.com/rankings');

          case 2:
            fileName = _context.sent;
            _context.next = 5;
            return (0, _statistic2.default)(fileName, function (dappList) {
              return dappList.data;
            });

          case 5:
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

var _dapp = require('./dapp');

var _dapp2 = _interopRequireDefault(_dapp);

var _statistic = require('../statistic.js');

var _statistic2 = _interopRequireDefault(_statistic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = main;