'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Main function of filter.js
 * filter icoEventList.data based on filter funtion
 * write the result to a new file
 * return the new fileName
 * @param {string} fileName file that stores icoEventList
 * @return {string} result fileName
 */
var main = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileName) {
    var icoEventList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Creating filtered icoEventList based on filter function defined in filter.js...');

            _context.t0 = JSON;
            _context.next = 4;
            return (0, _fsPromise.readFile)(fileName, 'utf-8');

          case 4:
            _context.t1 = _context.sent;
            icoEventList = _context.t0.parse.call(_context.t0, _context.t1);

            icoEventList.data = icoEventList.data.filter(filterIcoEvent);
            console.log('Finish filtering.');

            fileName += '-filtered';
            _context.next = 11;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(icoEventList));

          case 11:
            console.log('Filtered result has been written to ' + fileName + '.');

            return _context.abrupt('return', fileName);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Tranform icodrops money format to millions
 * @param {object} icoEvent Data structure that stores ico event info
 * @return {bool} whether the icoEvent passes the filter
 */


var _fsPromise = require('../fsPromise');

var _utility = require('../utility');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function filterIcoEvent(icoEvent) {
  if (icoEvent.status === 'active') return true;else if ((0, _utility.withinDate)(icoEvent.endDate, '2018/07/20') && icoEvent.raised !== 'pending' && icoEvent.raised > 10) return true;
  return false;
}

exports.default = main;