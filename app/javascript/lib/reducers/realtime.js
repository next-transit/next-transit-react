import types from 'lib/action-types';
import createReducer from './create-reducer';

function locationsRequested(state, action) {
  return {
    ...state,
    isLocationsLoading: true,
    locationsRequestError: null
  };
}

function locationsReceived(state, action) {
  return {
    ...state,
    isLocationsLoading: false,
    locations: action.locations
  };
}

function locationsRequestFailed(state, action) {
  return {
    ...state,
    isLocationsLoading: false,
    locationsRequestError: action.error
  }
}

function locationsCleared(state, action) {
  return {
    ...state,
    locations: null
  };
}

export default createReducer({
  isLocationsLoading: false,
  locations: null,
  locationsRequestError: null
}, {
  [types.realtime.LOCATIONS_REQUESTED]: locationsRequested,
  [types.realtime.LOCATIONS_RECEIVED]: locationsReceived,
  [types.realtime.LOCATIONS_REQUEST_FAILED]: locationsRequestFailed,
  [types.realtime.LOCATIONS_CLEARED]: locationsCleared
});
