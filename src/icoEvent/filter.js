import {withinDate} from '../utility';

/**
 * Tranform icodrops money format to millions
 * @param {object} icoEvent Data structure that stores ico event info
 * @return {bool} whether the icoEvent passes the filter
 *  */
export function filterIcoEvent(icoEvent) {
  if (icoEvent.status === 'active') return true;
  else if (withinDate(icoEvent.endDate, '2018/07/20') && (icoEvent.raised !== 'pending' && icoEvent.raised > 10)) return true;
  return false;
}
