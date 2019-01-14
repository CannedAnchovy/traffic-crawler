import dapp from './dapp';
import calculateStatistic from '../statistic.js';

/**
 * main function for exchange
 */
async function main() {
  let fileName = await dapp('dappradar.com/rankings');
  await calculateStatistic(fileName, (dappList) => dappList.data);
}

export default main;
