import types from 'lib/action-types';
import createReducer from './create-reducer';

function searchRequested(state, action) {
  return {
    ...state,
    isSearchLoading: true,
    searchError: null
  }
}

function searchReceived(state, action) {
  return {
    ...state,
    isSearchLoading: false,
    searchResults: action.results
  };
}

function searchFailed(state, action) {
  return {
    ...state,
    isSearchLoading: false,
    searchError: action.error
  };
}

export default createReducer({
  searchResults: [],
  isSearchLoading: false,
  searchError: null
}, {
  [types.search.SEARCH_REQUESTED]: searchRequested,
  [types.search.SEARCH_RECEIVED]: searchReceived,
  [types.search.SEARCH_FAILED]: searchFailed
});
