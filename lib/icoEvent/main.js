'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Main function for routine.js
 * define job routine in this function
 */
var main = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var fileName;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (process.argv.length < 5) {
              console.log('Usage: node lib/icoEvent/index.js deadline timeInterval fileName');
              console.log('ex: node lib/icoEvent/index.js 2018-07-01 1m 2018-Dec');
              process.exit(1);
            }
            _context.next = 3;
            return (0, _icoEvent2.default)('icodrops.com', process.argv[2], process.argv[3], process.argv[4]);

          case 3:
            fileName = _context.sent;
            _context.next = 6;
            return (0, _statistic2.default)(fileName, function (icoEventList) {
              return icoEventList.data;
            });

          case 6:
            fileName = _context.sent;

          case 7:
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

var _icoEvent = require('./icoEvent.js');

var _icoEvent2 = _interopRequireDefault(_icoEvent);

var _statistic = require('../statistic.js');

var _statistic2 = _interopRequireDefault(_statistic);

var _filter = require('./filter.js');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = main;