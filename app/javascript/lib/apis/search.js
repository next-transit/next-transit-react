import { requestGet } from 'lib/http-utils';

export function getSearchResults(searchTerm, callback) {
  requestGet(`routes/search/${searchTerm}`, callback);
}
