'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeCrawlList = initializeCrawlList;
/**
 * Initialize a crawlList data structure that stores list data and source and current status
 * @param {string} source source website
 * @return {object} initial crawlList data structure
 */
function initializeCrawlList(source) {
  console.log('Initializing crawlList...');
  var object = {
    from: source,
    crawlerStatus: {
      getEventList: false,
      getTraffic: false
    },
    data: []
  };
  return object;
}