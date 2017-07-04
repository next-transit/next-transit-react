import { getSearchResults } from 'lib/apis/search';
import types from 'lib/action-types';

function searchFailed(error) {
  return {
    error,
    type: types.search.SEARCH_FAILED
  };
}

function searchReceived(results) {
  return {
    results,
    type: types.search.SEARCH_RECEIVED
  };
}

export function searchRequested(searchTerm) {
  return (dispatch, getState) => {
    dispatch({ type:types.search.SEARCH_REQUESTED });

    searchTerm = window.encodeURIComponent(searchTerm);

    getSearchResults(searchTerm, (error, response, body) => {
      if (error) {
        dispatch(searchFailed(error));
      } else {
        dispatch(searchReceived(body.data));
      }
    });
  };
}