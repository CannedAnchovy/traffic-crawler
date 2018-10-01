import crawlExchange from './exchange';
import calculateStatistic from '../statistic.js';

/**
 * main function for exchange
 */
async function main() {
  let fileName = await crawlExchange('coinmarketcap.com');
  await calculateStatistic(fileName, (exchanceList) => exchanceList.data);
}

export default main;
