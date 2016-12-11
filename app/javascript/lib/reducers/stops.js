import { stops as types } from 'lib/action-types';
import createReducer from './create-reducer';

function stopsRequested(state, action) {
  let stops_loading = state.stops_loading;
  stops_loading[action.key] = true;

  return {
    ...state,
    stops_loading
  };
}

function stopsReceived(state, action) {
  let {
    stops_by_id,
    stops_loading,
    stops_errors,
    stops
  } = state;

  stops_loading[action.key] = false;
  stops_errors[action.key] = undefined;
  stops[action.key] = action.stops;

  action.stops.forEach((stop) => {
    stops_by_id[stop.stop_id] = stop;
  });

  return {
    stops_by_id,
    stops,
    stops_loading,
    stops_errors
  };
}

function stopsFailed(state, action) {
  let stops_loading = state.stops_loading;
  stops_loading[action.key] = false;

  let stops_errors = state.stops_errors;
  stops_errors[action.key] = action.error;

  return {
    ...state,
    stops_loading,
    stops_errors
  };
}

export default createReducer({
  stops_by_id: {},
  stops: {},
  stops_loading: {},
  stops_errors: {}
}, {
  [types.ROUTE_DIRECTION_STOPS_REQUESTED]: stopsRequested,
  [types.ROUTE_DIRECTION_STOPS_RECEIVED]: stopsReceived,
  [types.ROUTE_DIRECTION_STOPS_FAILED]: stopsFailed
});
