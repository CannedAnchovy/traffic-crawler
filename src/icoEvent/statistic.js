import {readFile, writeFile} from '../fsPromise';
import {filterIcoEvent} from './filter.js';
import toCsv from './csv.js';

/**
 * Main function of statistic.js
 * @return {number} Execute status
 */
async function main() {
  console.log('hi');

  let fileName = 'data/icoEvent(icodrops.com)2';
  let icoEventList = JSON.parse(await readFile(fileName, 'utf-8'));

  icoEventList.data = icoEventList.data.filter(filterIcoEvent);
  console.log(icoEventList.data.length);

  await writeFile(fileName + '-filtered', JSON.stringify(icoEventList));
  await writeFile(fileName + '-filtered.csv', toCsv(icoEventList));

  return 0;
  /* for (let i=0; i<icoEventList.data.length; i++) {
    calculateTrafficNumbers(icoEventList.data[i].traffic);
  }
  await writeFile('data/icoEvent(icodrops.com)2', JSON.stringify(icoEventList)); */
}

export default main;
