/**
 * Initialize a crawlList data structure that stores list data and source and current status
 * @param {string} source source website
 * @return {object} initial crawlList data structure
 */
export function initializeCrawlList(source) {
  console.log('Initializing crawlList...');
  let object = {
    from: source,
    crawlerStatus: {
      getEventList: false,
      getTraffic: false,
    },
    data: [],
  };
  return object;
}
