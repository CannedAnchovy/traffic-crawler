import {withinDate} from '../utility';

/**
 * Tranform icodrops money format to millions
 * @param {object} icoEvent Data structure that stores ico event info
 * @return {bool} whether the icoEvent passes the filter
 *  */
export function filterIcoEvent(icoEvent) {
  let thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  if (icoEvent.status === 'active') return true;
  else if (withinDate(icoEvent.endDate, thirtyDaysAgo) &&
    icoEvent.raised !== 'pending' && icoEvent.raised > 10) return true;
  return false;
}
