import crawlICO from './icoEvent.js';
import calculateStatistic from '../statistic.js';
import filterICOEventList from './filter.js';

/**
 * Main function for routine.js
 * define job routine in this function
 */
async function main() {
  let fileName = await crawlICO('icodrops.com');
  fileName = await filterICOEventList(fileName);
  fileName = await calculateStatistic(fileName, (icoEventList) => icoEventList.data);
}

export default main;