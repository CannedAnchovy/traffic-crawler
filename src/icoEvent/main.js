import crawlICO from './icoEvent.js';
import calculateStatistic from '../statistic.js';
import filterICOEventList from './filter.js';

/**
 * Main function for routine.js
 * define job routine in this function
 */
async function main() {
  if (process.argv.length < 5) {
    console.log('Usage: node lib/icoEvent/index.js deadline timeInterval fileName');
    console.log('ex: node lib/icoEvent/index.js 2018-07-01 1m 2018-Dec');
    process.exit(1);
  }
  let fileName = await crawlICO('icodrops.com', process.argv[2], process.argv[3], process.argv[4]);
  // fileName = await filterICOEventList(fileName);
  fileName = await calculateStatistic(fileName, (icoEventList) => icoEventList.data);

  /*
  await calculateStatistic('data/icoEvent(2018-Aug)', (icoEventList) => icoEventList.data);
  await calculateStatistic('data/icoEvent(2018-Sep)', (icoEventList) => icoEventList.data);
  await calculateStatistic('data/icoEvent(2018-Oct)', (icoEventList) => icoEventList.data);
  await calculateStatistic('data/icoEvent(2018-Nov)', (icoEventList) => icoEventList.data);
  */

}

export default main;
