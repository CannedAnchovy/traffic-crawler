'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Main function of statistic.js
 * read data from fileName
 * calculate statistic
 * write the result to a new file
 * return the new fileName
 * @param {string} fileName the file that stores data you want to analyze
 * @param {func} getData function that return data segment in crawlList data structure
 * @return {string} result fileName
 */
var main = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileName, getData) {
    var crawlList, list, statisticRankList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Calculating statistic for file ' + fileName + '...');

            _context.t0 = JSON;
            _context.next = 4;
            return (0, _fsPromise.readFile)(fileName, 'utf-8');

          case 4:
            _context.t1 = _context.sent;
            crawlList = _context.t0.parse.call(_context.t0, _context.t1);
            list = getData(crawlList);

            fileName = fileName + '-statistic';

            statisticRankList = [getRankStatistic(list, 'geographyRank'), getRankStatistic(list, 'referralRank'), getRankStatistic(list, 'socialRank'), getRankStatistic(list, 'adRank')];

            /* for (let i=0; i<statisticRankList.length; i++) {
              printRankStatistic(statisticRankList[i]);
            } */

            _context.next = 11;
            return (0, _fsPromise.writeFile)(fileName, JSON.stringify(statisticRankList, '', 2));

          case 11:

            console.log('Writting statistic result into ' + fileName + '...');
            _context.next = 14;
            return (0, _fsPromise.writeFile)(fileName + '.csv', (0, _csv.getRankStatisticListCsvString)(statisticRankList));

          case 14:
            return _context.abrupt('return', fileName);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function main(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get the specified rank statistic from list
 * @param {array} list An array that stores object that has "traffic" property
 * @param {string} rankName rank name
 * @return {object} rank statistic
 */


var _fsPromise = require('./fsPromise');

var _csv = require('./csv');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var rankNum = 20;function getRankStatistic(list, rankName) {
  // initialize statistic data structure
  var indexMap = {};
  var rankList = [];

  // iterate through whole list to get statistic about rank
  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < list[i].traffic[rankName].length; j++) {
      var rankElement = list[i].traffic[rankName][j];
      var listItemName = list[i].name;

      // if this rank element has already been recorded before
      // get index from indexMap
      // then record the number and listItem name
      if (indexMap.hasOwnProperty(rankElement.name)) {
        // console.log('Found element in indexMap.');

        var index = indexMap[rankElement.name];
        rankList[index].total += Number(rankElement.number);
        rankList[index].eventList.push({
          name: listItemName,
          number: Number(rankElement.number)
        });
        // if rank element hasn't been recorded before
        // register it in indexMap
        // initialize it in rankList
      } else {
        // console.log('Didn\'t find element in indexMap.');
        indexMap[rankElement.name] = rankList.length;
        rankList.push({
          name: rankElement.name,
          total: Number(rankElement.number),
          eventList: [{
            name: listItemName,
            number: Number(rankElement.number)
          }]
        });
      }
    }
  }

  // after recording all statistic, sort the result
  // sort rankList first
  rankList.sort(function (element1, element2) {
    var total1 = element1.total;
    var total2 = element2.total;

    if (total1 > total2) return -1;else if (total1 < total2) return 1;else return 0;
  });

  // sort rankList element's eventList
  for (var _i = 0; _i < rankList.length; _i++) {
    rankList[_i].eventList.sort(function (element1, element2) {
      var num1 = element1.number;
      var num2 = element2.number;

      if (num1 > num2) return -1;else if (num1 < num2) return 1;else return 0;
    });
  }

  rankList = rankList.slice(0, rankNum);

  // get rid of event list item that is not top 10
  for (var _i2 = 0; _i2 < rankList.length; _i2++) {
    var num = rankList[_i2].eventList.length > 10 ? 10 : rankList[_i2].eventList.length;
    rankList[_i2].eventList = rankList[_i2].eventList.slice(0, num);
  }

  // convert all number back to string
  for (var _i3 = 0; _i3 < rankList.length; _i3++) {
    rankList[_i3].total = rankList[_i3].total.toFixed(2);

    for (var _j = 0; _j < rankList[_i3].eventList.length; _j++) {
      rankList[_i3].eventList[_j].number = rankList[_i3].eventList[_j].number.toFixed(2);
    }
  }

  return {
    name: rankName,
    data: rankList
  };
}

/**
 * Get the specified rank statistic
 * @param {object} rankStatistic An data structure that stores rank statistic
 */
function printRankStatistic(rankStatistic) {
  console.log(rankStatistic);
  for (var i = 0; i < rankStatistic.data.length; i++) {
    console.log(rankStatistic.data[i].name);
    console.log(rankStatistic.data[i].total);
    for (var j = 0; j < rankStatistic.data[i].eventList.length; j++) {
      console.log(rankStatistic.data[i].eventList[j]);
    }
  }
}

exports.default = main;