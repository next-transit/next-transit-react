import { trips as types } from 'lib/action-types';
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
  [types.TRIPS_REQUESTED]: trips_requested,
  [types.TRIPS_RECEIVED]: trips_received,
  [types.TRIPS_FAILED]: trips_failed
});
