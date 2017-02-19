import { map as types } from 'lib/action-types';
import createReducer from './create-reducer';

function userLocationRequested(state, action) {
  return {
    ...state,
    userLocationLoading: true,
    userLocationError: null
  };
}

function userLocationReceived(state, action) {
  return {
    ...state,
    userLocationLoading: false,
    userLocation: action.userLocation
  }
}

function userLocationRequestFailed(state, action) {
  return {
    ...state,
    userLocationLoading: false,
    userLocationError: action.error
  };
}

export default createReducer({
  userLocation: null,
  userLocationLoading: false,
  userLocationError: null
}, {
  [types.USER_LOCATION_REQUESTED]: userLocationRequested,
  [types.USER_LOCATION_RECEIVED]: userLocationReceived,
  [types.USER_LOCATION_REQUEST_FAILED]: userLocationRequestFailed
});
