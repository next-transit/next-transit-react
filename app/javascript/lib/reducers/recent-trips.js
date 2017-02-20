import types from 'lib/action-types';
import createReducer from './create-reducer';

function recentTripsReceived(state, action) {
  return {
    ...state,
    recent_trips: action.recent_trips
  };
}

function savedTripsReceived(state, action) {
  return {
    ...state,
    saved_trips: action.saved_trips
  };
}

export default createReducer({
  recent_trips: [],
  saved_trips: []
}, {
  [types.recent_trips.RECENT_TRIPS_RECEIVED]: recentTripsReceived,
  [types.recent_trips.SAVED_TRIPS_RECEIVED]: savedTripsReceived
});
