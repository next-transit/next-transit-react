import { createSelector } from 'reselect';

const searchResults = state => state.search.searchResults;
const searchTerm = (state, props) => props.searchTerm;

export const getExactMatch = createSelector(
  searchResults,
  searchTerm,
  (results, term) => {
    if (results) {
      return results.find((result) => {
        return result.slug === term.toLowerCase();
      });
    }
  }
);
