import types from 'lib/action-types';
import createReducer from './create-reducer';

function tripsRequested(state, action) {
  return {
    ...state,
    loading: true
  };
}

function tripsReceived(state, action) {
  return {
    ...state,
    loading: false,
    trips: action.trips,
    error: null
  };
}

function tripsFailed(state, action) {
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
  [types.trips.TRIPS_REQUESTED]: tripsRequested,
  [types.trips.TRIPS_RECEIVED]: tripsReceived,
  [types.trips.TRIPS_FAILED]: tripsFailed
});
