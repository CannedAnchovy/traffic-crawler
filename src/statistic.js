import {readFile, writeFile} from './fsPromise';
import {getRankStatisticListCsvString} from './csv';

/**
 * Main function of statistic.js
 * read data from fileName
 * calculate statistic
 * write the result to a new file
 * return the new fileName
 * @param {string} fileName the file that stores data you want to analyze
 * @param {func} getData function that return data segment in crawlList data structure
 * @return {string} result fileName
 */
async function main(fileName, getData) {
  console.log('Calculating statistic for file ' + fileName +'...');

  let crawlList = JSON.parse(await readFile(fileName, 'utf-8'));
  let list = getData(crawlList);
  fileName = fileName + '-statistic';

  let statisticRankList = [
    getRankStatistic(list, 'geographyRank'),
    getRankStatistic(list, 'referralRank'),
    getRankStatistic(list, 'socialRank'),
    getRankStatistic(list, 'adRank'),
  ];

  /* for (let i=0; i<statisticRankList.length; i++) {
    printRankStatistic(statisticRankList[i]);
  } */

  await writeFile(fileName, JSON.stringify(statisticRankList, '', 2));

  console.log('Writting statistic result into ' + fileName + '...');
  await writeFile(fileName + '.csv', getRankStatisticListCsvString(statisticRankList));

  return fileName;
}

/**
 * Get the specified rank statistic from list
 * @param {array} list An array that stores object that has "traffic" property
 * @param {string} rankName rank name
 * @return {object} rank statistic
 */
function getRankStatistic(list, rankName) {
  // initialize statistic data structure
  let indexMap = {};
  let rankList = [];

  // iterate through whole list to get statistic about rank
  for (let i=0; i<list.length; i++) {
    for (let j=0; j<list[i].traffic[rankName].length; j++) {
      const rankElement = list[i].traffic[rankName][j];
      const listItemName = list[i].name;

      // if this rank element has already been recorded before
      // get index from indexMap
      // then record the number and listItem name
      if (indexMap.hasOwnProperty(rankElement.name)) {
        // console.log('Found element in indexMap.');

        let index = indexMap[rankElement.name];
        rankList[index].total += Number(rankElement.number);
        rankList[index].eventList.push({
          name: listItemName,
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
            name: listItemName,
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

  // sort rankList element's eventList
  for (let i=0; i<rankList.length; i++) {
    rankList[i].eventList.sort((element1, element2) => {
      let num1 = element1.number;
      let num2 = element2.number;

      if (num1 > num2) return -1;
      else if (num1 < num2) return 1;
      else return 0;
    });
  }

  rankList = rankList.slice(0, 200);

  // get rid of event list item that is not top 10
  for (let i=0; i<rankList.length; i++) {
    let num = (rankList[i].eventList.length > 10)? 10 : rankList[i].eventList.length;
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
