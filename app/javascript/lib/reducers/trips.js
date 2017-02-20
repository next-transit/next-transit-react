import types from 'lib/action-types';
import createReducer from './create-reducer';

function trips_requested(state, action) {
  return {
    ...state,
    loading: true
  };
}

function trips_received(state, action) {
  return {
    ...state,
    loading: false,
    trips: action.trips,
    error: null
  };
}

function trips_failed(state, action) {
  return {
    ...state,
    loading: false,
    trips: null,
    error: action.error
  };
}

export default createReducer({
  trips: null,
  loading: false,
  error: null
}, {
  [types.trips.TRIPS_REQUESTED]: trips_requested,
  [types.trips.TRIPS_RECEIVED]: trips_received,
  [types.trips.TRIPS_FAILED]: trips_failed
});
