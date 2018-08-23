import {readFile, writeFile} from '../fsPromise';
import {withinDate} from '../utility';
import {icoEventListToCsvString} from './csv';

/**
 * Main function of filter.js
 * filter icoEventList.data based on filter funtion
 * write the result to a new file
 * return the new fileName
 * @param {string} fileName file that stores icoEventList
 * @return {string} result fileName
 */
async function main(fileName) {
  console.log('Creating filtered icoEventList based on filter function defined in filter.js...');

  let icoEventList = JSON.parse(await readFile(fileName, 'utf-8'));
  icoEventList.data = icoEventList.data.filter(filterIcoEvent);

  fileName += '-filtered';

  console.log('Writting filtered icoEventList to ' + fileName + '...');
  await writeFile(fileName, JSON.stringify(icoEventList));
  await writeFile(fileName + '.csv', icoEventListToCsvString(icoEventList));
  return fileName;
}

/**
 * Tranform icodrops money format to millions
 * @param {object} icoEvent Data structure that stores ico event info
 * @return {bool} whether the icoEvent passes the filter
 */
function filterIcoEvent(icoEvent) {
  if (icoEvent.status === 'active') return true;
  else if (withinDate(icoEvent.endDate, '2018/07/20') && (icoEvent.raised !== 'pending' && icoEvent.raised > 10)) return true;
  return false;
}

export default main;
