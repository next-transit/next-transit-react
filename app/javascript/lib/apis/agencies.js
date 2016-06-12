import { requestGet } from 'lib/http-utils';

export function getAgencies(callback) {
  requestGet('agencies', callback);
}

export function getAgency(slug, callback) {
  requestGet(`agencies/${slug}`, callback);
}
