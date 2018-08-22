'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Transform js date object into YYYY/MM/DD format.
 * @param {num} time the ms that you want to sleep
 * @return {Promise}
 */
var sleep = exports.sleep = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(time) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve) {
              console.log('Im gonna sleep for ' + time + 'ms.');
              setTimeout(function () {
                resolve();
              }, time);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function sleep(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getMillion = getMillion;
exports.getDomainName = getDomainName;
exports.getDateByDayLeft = getDateByDayLeft;
exports.getDateFromStrMonth = getDateFromStrMonth;
exports.withinDate = withinDate;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var million = 1000000;

/**
 * Tranform icodrops money format to millions
 * @param {string} string Icodrops money format string
 *                             for example:$3,274,277
 * @return {string} Number of millions.
 */
function getMillion(string) {
  // erase '$' and ','
  string = string.replace('$', '');
  string = string.split(',').join('');

  var money = Number(string);
  money = money / million;
  return money.toFixed(2);
}

/**
 * Get domain name from given url
 * @param {string} url
 * @return {string} Domain name.
 */
function getDomainName(url) {
  return url.split('/')[2];
}

/**
 * Calculate date based on how many days left.
 * @param {number} daysLeft How many days left.
 * @return {date} Calculated date.
 */
function getDateByDayLeft(daysLeft) {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysLeft);
  return getFormatDate(currentDate);
}

/**
 * Transform date that has string month (ex: Jan) to js Date
 * @param {number} year Input year.
 * @param {string} monthString Input month (in string format).
 * @param {number} date Input date.
 * @return {date} js Date of given input.
 */
function getDateFromStrMonth(year, monthString, date) {
  var month = void 0;
  if (monthString === 'JANUARY') month = 1;else if (monthString === 'FEBRUARY') month = 2;else if (monthString === 'MARCH') month = 3;else if (monthString === 'APRIL') month = 4;else if (monthString === 'MAY') month = 5;else if (monthString === 'JUNE') month = 6;else if (monthString === 'JULY') month = 7;else if (monthString === 'AUGUST') month = 8;else if (monthString === 'SEPTEMBER') month = 9;else if (monthString === 'OCTOBER') month = 10;else if (monthString === 'NOVEMBER') month = 11;else if (monthString === 'DECEMBER') month = 12;

  return getFormatDate(new Date(year, month - 1, date));
}

/**
 * Transform js date object into YYYY/MM/DD format.
 * @param {date} date Input date.
 * @return {string} YYYY/MM/DD format of input date.
 */
function getFormatDate(date) {
  var year = date.getYear() + 1900;
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, (month > 9 ? '' : '0') + month, (day > 9 ? '' : '0') + day].join('/');
}

/**
 * Check if date1 is within date2 and current time (later than date2)
 * @param {string|date} date1 string or date object that can construct date object
 * @param {string|date} date2 string or date object that can construct date object
 * @return {bool} wheter date1 is within date2 and current time
 */
function withinDate(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return date1 >= date2;
}