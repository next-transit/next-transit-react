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
  let stops_loading = state.stops_loading;
  stops_loading[action.key] = false;

  let stops_errors = state.stops_errors;
  stops_errors[action.key] = undefined;

  let stops = state.stops;
  stops[action.key] = action.stops;

  return {
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
  stops: {},
  stops_loading: {},
  stops_errors: {}
}, {
  [types.ROUTE_DIRECTION_STOPS_REQUESTED]: stopsRequested,
  [types.ROUTE_DIRECTION_STOPS_RECEIVED]: stopsReceived,
  [types.ROUTE_DIRECTION_STOPS_FAILED]: stopsFailed
});
