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
    is_agency_loading: false,
    agency: action.agency
  };
}

function agencyRequested(state, action) {
  return {
    ...state,
    is_agency_loading: true
  }
}

export default createReducer({
  agencies: [],
  agency: null,
  is_agency_loading: false
}, {
  [types.AGENCIES_RECEIVED]: agenciesReceived,
  [types.AGENCY_REQUESTED]: agencyRequested,
  [types.AGENCY_RECEIVED]: agencyReceived
});
