'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterIcoEvent = filterIcoEvent;

var _utility = require('../utility');

/**
 * Tranform icodrops money format to millions
 * @param {object} icoEvent Data structure that stores ico event info
 * @return {bool} whether the icoEvent passes the filter
 *  */
function filterIcoEvent(icoEvent) {
  if (icoEvent.status === 'active') return true;else if ((0, _utility.withinDate)(icoEvent.endDate, '2018/07/22') && icoEvent.raised !== 'pending' && icoEvent.raised > 10) return true;
  return false;
}