import {readFile, writeFile} from '../fsPromise';
import {filterIcoEvent} from './filter.js';
import {icoEventListToCsvString, getRankStatisticListCsvString} from './csv.js';

/**
 * Main function of statistic.js
 * @return {number} Execute status
 */
async function main() {
  console.log('hi');

  let fileName = 'data/icoEvent(icodrops.com)2-filtered';
  let icoEventList = JSON.parse(await readFile(fileName, 'utf-8'));

  let statisticRankList = [
    getRankStatistic(icoEventList, 'geographyRank'),
    getRankStatistic(icoEventList, 'referralRank'),
    getRankStatistic(icoEventList, 'socialRank'),
    getRankStatistic(icoEventList, 'adRank'),
  ];

  for (let i=0; i<statisticRankList.length; i++) {
    printRankStatistic(statisticRankList[i]);
  }

  await writeFile(fileName + '(rank statistic).csv', getRankStatisticListCsvString(statisticRankList));
  // await writeFile(fileName + '-filtered', JSON.stringify(icoEventList));
  // await writeFile(fileName + '-filtered.csv', toCsv(icoEventList));

  return 0;
}

/**
 * Get the specified rank statistic
 * @param {object} icoEventList An data structure that stores ico event information
 * @param {string} rankName rank name
 * @return {object} rank statistic
 */
function getRankStatistic(icoEventList, rankName) {
  // initialize statistic data structure
  let indexMap = {};
  let rankList = [];

  // iterate through whole icoEventList to get statistic about rank
  for (let i=0; i<icoEventList.data.length; i++) {
    for (let j=0; j<icoEventList.data[i].traffic[rankName].length; j++) {
      const rankElement = icoEventList.data[i].traffic[rankName][j];
      const icoEventName = icoEventList.data[i].name;

      // if this rank element has already been recorded before
      // get index from indexMap
      // then record the number and ico event name
      if (indexMap.hasOwnProperty(rankElement.name)) {
        // console.log('Found element in indexMap.');

        let index = indexMap[rankElement.name];
        rankList[index].total += Number(rankElement.number);
        rankList[index].eventList.push({
          name: icoEventName,
          number: Number(rankElement.number),
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
            name: icoEventName,
            number: Number(rankElement.number),
          }],
        });
      }
    }
  }

  // after recording all statistic, sort the result
  // sort rankList first
  rankList.sort((element1, element2) => {
    const total1 = element1.total;
    const total2 = element2.total;

    if (total1 > total2) return -1;
    else if (total1 < total2) return 1;
    else return 0;
  });

  // sort top 10 rankList element's eventList
  let num = (rankList.length > 10)? 10 : rankList.length;
  for (let i=0; i<num; i++) {
    rankList[i].eventList.sort((element1, element2) => {
      let num1 = element1.number;
      let num2 = element2.number;

      if (num1 > num2) return -1;
      else if (num1 < num2) return 1;
      else return 0;
    });
  }

  // get rid of rank that is not top 10
  rankList = rankList.slice(0, num);
  for (let i=0; i<rankList.length; i++) {
    num = (rankList[i].eventList.length > 10)? 10 : rankList[i].eventList.length;
    rankList[i].eventList = rankList[i].eventList.slice(0, num);
  }

  // convert all number back to string
  for (let i=0; i<rankList.length; i++) {
    rankList[i].total = rankList[i].total.toFixed(2);

    for (let j=0; j<rankList[i].eventList.length; j++) {
      rankList[i].eventList[j].number = rankList[i].eventList[j].number.toFixed(2);
    }
  }

  return {
    name: rankName,
    data: rankList,
  };
}

/**
 * Get the specified rank statistic
 * @param {object} rankStatistic An data structure that stores rank statistic
 */
function printRankStatistic(rankStatistic) {
  console.log(rankStatistic);
  for (let i=0; i<rankStatistic.data.length; i++) {
    console.log(rankStatistic.data[i].name);
    console.log(rankStatistic.data[i].total);
    for (let j=0; j<rankStatistic.data[i].eventList.length; j++) {
      console.log(rankStatistic.data[i].eventList[j]);
    }
  }
}

export default main;
