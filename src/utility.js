const million = 1000000;

/**
 * Tranform icodrops money format to millions
 * @param {string} string Icodrops money format string
 *                             for example:$3,274,277
 * @return {string} Number of millions.
 */
export function getMillion(string) {
  // erase '$' and ','
  string = string.replace('$', '');
  string = string.split(',').join('');

  let money = Number(string);
  money = money / million;
  return money.toFixed(2);
}

/**
 * Get domain name from given url
 * @param {string} url
 * @return {string} Domain name.
 */
export function getDomainName(url) {
  return url.split('/')[2];
}

/**
 * Calculate date based on how many days left.
 * @param {number} daysLeft How many days left.
 * @return {date} Calculated date.
 */
export function getDateByDayLeft(daysLeft) {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysLeft);
  return getFormatDate(currentDate);
}

/**
 * Transform date that has string month (ex: Jan) to js Date
 * @param {number} year Input year.
 * @param {string} monthString Input month (in string format).
 * @param {number} date Input date.
 * @return {date} js Date of given input.
 */
export function getDateFromStrMonth(year, monthString, date) {
  let month;
  if (monthString === 'JANUARY') month = 1;
  else if (monthString === 'FEBRUARY') month = 2;
  else if (monthString === 'MARCH') month = 3;
  else if (monthString === 'APRIL') month = 4;
  else if (monthString === 'MAY') month = 5;
  else if (monthString === 'JUNE') month = 6;
  else if (monthString === 'JULY') month = 7;
  else if (monthString === 'AUGUST') month = 8;
  else if (monthString === 'SEPTEMBER') month = 9;
  else if (monthString === 'OCTOBER') month = 10;
  else if (monthString === 'NOVEMBER') month = 11;
  else if (monthString === 'DECEMBER') month = 12;

  return getFormatDate(new Date(year, month-1, date));
}

/**
 * Transform js date object into YYYY/MM/DD format.
 * @param {date} date Input date.
 * @return {string} YYYY/MM/DD format of input date.
 */
function getFormatDate(date) {
  const year = date.getYear() + 1900;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, (month>9 ? '' : '0') + month, (day>9 ? '' : '0') + day].join('/');
}

/**
 * Check if date1 is within date2 and current time (later than date2)
 * @param {string|date} date1 string or date object that can construct date object
 * @param {string|date} date2 string or date object that can construct date object
 * @return {bool} wheter date1 is within date2 and current time
 */
export function withinDate(date1, date2) {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return date1 >= date2;
}

/**
 * Transform js date object into YYYY/MM/DD format.
 * @param {num} time the ms that you want to sleep
 * @return {Promise}
 */
export async function sleep(time) {
  return new Promise((resolve) => {
    console.log('Im gonna sleep for ' + time + 'ms.');
    setTimeout(() => {
      resolve();
    }, time);
  });
}
