'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.icoEventListToCsvString = icoEventListToCsvString;
exports.exchangeListToCsvString = exchangeListToCsvString;
exports.getRankStatisticListCsvString = getRankStatisticListCsvString;
/**
 * transform icoEventList to csv string format
 * @param {object} icoEventList Data structure that stores many icoEvent.
 * @return {string} icoEventList in csv string format
 */
function icoEventListToCsvString(icoEventList) {
  var string = '';
  string = getIcoEventHeaderCsvString();

  for (var i = 0; i < icoEventList.data.length; i++) {
    string += getIcoEventToCsvString(icoEventList.data[i]);
  }

  return string;
}

/**
 * Generate ico event header in csv string format
 * @return {string} ico event header in csv string format
 */
function getIcoEventHeaderCsvString() {
  var header = new Array(28).fill('');
  header[0] = doubleQuote('Project Name');
  header[1] = doubleQuote('Website Link');
  header[2] = doubleQuote('Status');
  header[3] = doubleQuote('ICO Ended Date');
  header[4] = doubleQuote('Raised(m)');
  header[5] = doubleQuote('Total Visit');
  header[6] = doubleQuote('Channel Traffic');

  header[7] = doubleQuote('Direct Traffic');
  header[10] = doubleQuote('Email Traffic');
  header[13] = doubleQuote('Referral Traffic');
  header[16] = doubleQuote('Social Traffic');
  header[19] = doubleQuote('Organic Traffic');
  header[22] = doubleQuote('Paid Search Traffic');
  header[25] = doubleQuote('Ads Traffic');

  return header.join(',') + '\n';
}

/**
 * transform icoEvent to csv string format
 * @param {object} icoEvent Data structure that stores info about ico event.
 * @return {string} icoEvent in csv string format
 */
function getIcoEventToCsvString(icoEvent) {
  var lines = new Array(6).fill(new Array(28).fill('\"\"'));

  // important!!!!
  // js array is default pass by reference
  lines = JSON.parse(JSON.stringify(lines));
  var rankNum = void 0;

  // convert basic info
  lines[0][0] = doubleQuote(icoEvent.name);
  lines[0][1] = doubleQuote(icoEvent.url);
  lines[0][2] = doubleQuote(icoEvent.status);
  lines[0][3] = doubleQuote(icoEvent.endDate);
  lines[0][4] = doubleQuote(icoEvent.raised);
  lines[0][5] = doubleQuote(icoEvent.traffic.totalVisit);
  lines[0][6] = doubleQuote(icoEvent.traffic.marketingMix.channelTraffic);

  // convert marketing mix
  for (var i = 0; i < 7; i++) {
    lines[0][7 + i * 3] = doubleQuote(icoEvent.traffic.marketingMix.percentage[i]);
    lines[0][7 + i * 3 + 2] = doubleQuote(icoEvent.traffic.marketingMix.number[i]);
  }

  // convert geography rank
  rankNum = icoEvent.traffic.geographyRank.length > 5 ? 5 : icoEvent.traffic.geographyRank.length;
  for (var _i = 0; _i < rankNum; _i++) {
    lines[_i + 1][7] = doubleQuote(icoEvent.traffic.geographyRank[_i].name);
    lines[_i + 1][8] = doubleQuote(icoEvent.traffic.geographyRank[_i].percentage);
    lines[_i + 1][9] = doubleQuote(icoEvent.traffic.geographyRank[_i].number);
  }

  // convert referral rank
  rankNum = icoEvent.traffic.referralRank.length > 5 ? 5 : icoEvent.traffic.referralRank.length;
  for (var _i2 = 0; _i2 < rankNum; _i2++) {
    lines[_i2 + 1][13] = doubleQuote(icoEvent.traffic.referralRank[_i2].name);
    lines[_i2 + 1][14] = doubleQuote(icoEvent.traffic.referralRank[_i2].percentage);
    lines[_i2 + 1][15] = doubleQuote(icoEvent.traffic.referralRank[_i2].number);
  }

  // convert social rank
  rankNum = icoEvent.traffic.socialRank.length > 5 ? 5 : icoEvent.traffic.socialRank.length;
  for (var _i3 = 0; _i3 < rankNum; _i3++) {
    lines[_i3 + 1][16] = doubleQuote(icoEvent.traffic.socialRank[_i3].name);
    lines[_i3 + 1][17] = doubleQuote(icoEvent.traffic.socialRank[_i3].percentage);
    lines[_i3 + 1][18] = doubleQuote(icoEvent.traffic.socialRank[_i3].number);
  }

  // convert ad rank
  rankNum = icoEvent.traffic.adRank.length > 5 ? 5 : icoEvent.traffic.adRank.length;
  for (var _i4 = 0; _i4 < rankNum; _i4++) {
    lines[_i4 + 1][25] = doubleQuote(icoEvent.traffic.adRank[_i4].name);
    lines[_i4 + 1][26] = doubleQuote(icoEvent.traffic.adRank[_i4].percentage);
    lines[_i4 + 1][27] = doubleQuote(icoEvent.traffic.adRank[_i4].number);
  }

  return linesToString(lines);
}

/**
 * transform exchangeList to csv string format
 * @param {object} exchangeList Data structure that stores many exchanges info
 * @return {string} exchangeList in csv string format
 */
function exchangeListToCsvString(exchangeList) {
  var string = '';
  string = getExchangeHeaderCsvString();

  for (var i = 0; i < exchangeList.data.length; i++) {
    string += getExchangeToCsvString(exchangeList.data[i]);
  }

  return string;
}

/**
 * Generate exchange header in csv string format
 * @return {string} exchange header in csv string format
 */
function getExchangeHeaderCsvString() {
  var header = new Array(28).fill('');
  header[0] = doubleQuote('Exchange Name');
  header[1] = doubleQuote('Rank');
  header[2] = doubleQuote('Website');
  header[3] = doubleQuote('CMC Website');
  header[4] = doubleQuote('Trading Volume 24hr(m)');
  header[5] = doubleQuote('Total Visit');
  header[6] = doubleQuote('Channel Traffic');

  header[7] = doubleQuote('Direct Traffic');
  header[10] = doubleQuote('Email Traffic');
  header[13] = doubleQuote('Referral Traffic');
  header[16] = doubleQuote('Social Traffic');
  header[19] = doubleQuote('Organic Traffic');
  header[22] = doubleQuote('Paid Search Traffic');
  header[25] = doubleQuote('Ads Traffic');

  return header.join(',') + '\n';
}

/**
 * transform exchange to csv string format
 * @param {object} exchange Data structure that stores info about exchange.
 * @return {string} exchangein csv string format
 */
function getExchangeToCsvString(exchange) {
  var lines = new Array(6).fill(new Array(28).fill('\"\"'));

  // important!!!!
  // js array is default pass by reference
  lines = JSON.parse(JSON.stringify(lines));
  var rankNum = void 0;

  // convert basic info
  lines[0][0] = doubleQuote(exchange.name);
  lines[0][1] = doubleQuote(Number(exchange.rank) + 1);
  lines[0][2] = doubleQuote(exchange.url);
  lines[0][3] = doubleQuote(exchange.cmcUrl);
  lines[0][4] = doubleQuote((exchange.tradingVolume24hr / 1000000).toFixed(2));
  lines[0][5] = doubleQuote(exchange.traffic.totalVisit);
  lines[0][6] = doubleQuote(exchange.traffic.marketingMix.channelTraffic);

  // console.log(1);

  // convert marketing mix

  if (Object.keys(exchange.traffic.marketingMix).length !== 0) {
    for (var i = 0; i < 7; i++) {
      lines[0][7 + i * 3] = doubleQuote(exchange.traffic.marketingMix.percentages[i]);
      lines[0][7 + i * 3 + 2] = doubleQuote(exchange.traffic.marketingMix.numbers[i]);
    }
  }

  // console.log(2);

  // convert geography rank
  rankNum = exchange.traffic.geographyRank.length > 5 ? 5 : exchange.traffic.geographyRank.length;
  for (var _i5 = 0; _i5 < rankNum; _i5++) {
    lines[_i5 + 1][7] = doubleQuote(exchange.traffic.geographyRank[_i5].name);
    lines[_i5 + 1][8] = doubleQuote(exchange.traffic.geographyRank[_i5].percentage);
    lines[_i5 + 1][9] = doubleQuote(exchange.traffic.geographyRank[_i5].number);
  }

  // console.log(3);

  // convert referral rank
  rankNum = exchange.traffic.referralRank.length > 5 ? 5 : exchange.traffic.referralRank.length;
  for (var _i6 = 0; _i6 < rankNum; _i6++) {
    lines[_i6 + 1][13] = doubleQuote(exchange.traffic.referralRank[_i6].name);
    lines[_i6 + 1][14] = doubleQuote(exchange.traffic.referralRank[_i6].percentage);
    lines[_i6 + 1][15] = doubleQuote(exchange.traffic.referralRank[_i6].number);
  }

  // console.log(4);

  // convert social rank
  rankNum = exchange.traffic.socialRank.length > 5 ? 5 : exchange.traffic.socialRank.length;
  for (var _i7 = 0; _i7 < rankNum; _i7++) {
    lines[_i7 + 1][16] = doubleQuote(exchange.traffic.socialRank[_i7].name);
    lines[_i7 + 1][17] = doubleQuote(exchange.traffic.socialRank[_i7].percentage);
    lines[_i7 + 1][18] = doubleQuote(exchange.traffic.socialRank[_i7].number);
  }

  // console.log(5);

  // convert ad rank
  rankNum = exchange.traffic.adRank.length > 5 ? 5 : exchange.traffic.adRank.length;
  for (var _i8 = 0; _i8 < rankNum; _i8++) {
    lines[_i8 + 1][25] = doubleQuote(exchange.traffic.adRank[_i8].name);
    lines[_i8 + 1][26] = doubleQuote(exchange.traffic.adRank[_i8].percentage);
    lines[_i8 + 1][27] = doubleQuote(exchange.traffic.adRank[_i8].number);
  }

  // console.log(6);

  return linesToString(lines);
}

/**
 * transform rankStatisticList to csv string format
 * @param {array} rankStatisticList An array containing rankStatistic
 * @return {string} rankStatisticList in csv string format
 */
function getRankStatisticListCsvString(rankStatisticList) {
  var lines = new Array(13).fill([]);

  // important!!!!
  // js array is default pass by reference
  lines = JSON.parse(JSON.stringify(lines));

  for (var i = 0; i < rankStatisticList.length; i++) {
    var rankLines = getRankStatisticLines(rankStatisticList[i]);

    for (var j = 0; j < 13; j++) {
      lines[j] = lines[j].concat(rankLines[j]);
    }
  }

  return linesToString(lines);
}

/**
 * transform rankStatistic to csv string format
 * @param {object} rankStatistic Data structure that stores rank statistic
 * @return {array} lines that store csv cell text
 */
function getRankStatisticLines(rankStatistic) {
  var lines = new Array(13).fill(new Array(rankStatistic.data.length * 2 + 2).fill('\"\"'));

  // important!!!!
  // js array is default pass by reference
  lines = JSON.parse(JSON.stringify(lines));

  lines[0][1] = rankStatistic.name;

  var rank = rankStatistic.data;
  for (var i = 0; i < rank.length; i++) {
    var colIndex = 1 + i * 2;
    lines[1][colIndex] = doubleQuote('#' + (i + 1));
    lines[2][colIndex] = doubleQuote(rank[i].name);
    lines[2][colIndex + 1] = doubleQuote(rank[i].total);

    for (var j = 0; j < rank[i].eventList.length; j++) {
      lines[3 + j][colIndex] = doubleQuote(rank[i].eventList[j].name);
      lines[3 + j][colIndex + 1] = doubleQuote(rank[i].eventList[j].number);
    }
  }

  return lines;
}

/**
 * transform lines to string
 * @param {array} lines two dimensional array that stores csv cell text
 * @return {string} lines' csv format string
 */
function linesToString(lines) {
  var string = '';
  for (var i = 0; i < lines.length; i++) {
    string += lines[i].join(',');
    string += '\n';
  }

  return string;
}

/**
 * wrap string in ""
 * @param {string} string string
 * @return {string} input string wrapped in ""
 */
function doubleQuote(string) {
  return '\"' + string + '\"';
}

/**
 * print lines (for debuging)
 * @param {array} lines array of array of string
 */
function printLines(lines) {
  for (var i = 0; i < lines.length; i++) {
    console.log(lines[i].join(','));
  }
}