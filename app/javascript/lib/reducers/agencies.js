import { agencies as types } from 'lib/action-types';
import createReducer from './create-reducer';

function agenciesReceived(state, action) {
  return {
    ...state,
    agencies: action.agencies
  };
}

function agencyReceived(state, action) {
  return {
    ...state,
    agency: action.agency
  };
}

export default createReducer({
  agencies: [],
  agency: null
}, {
  [types.AGENCIES_RECEIVED]: agenciesReceived,
  [types.AGENCY_RECEIVED]: agencyReceived
});
