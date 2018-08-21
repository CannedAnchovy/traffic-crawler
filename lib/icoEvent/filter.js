'use strict';

/**
 * Tranform icodrops money format to millions
 * @param {string} string Icodrops money format string
 * @return {string} Number of millions.
 */
function filterIcoEvent(icoEvent) {
  if (icoEvent.status === 'active') return true;
}