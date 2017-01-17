import { stops as types } from 'lib/action-types';
import createReducer from './create-reducer';

function stopsRequested(state, action) {
  const stopsLoading = {
    ...state.stops_loading,
    [action.key]: true
  };
  
  const stopsErrors = {
    ...state.stops_errors,
    [action.key]: null
  };

  return {
    ...state,
    stops_loading: stopsLoading,
    stops_errors: stopsErrors
  };
}

function stopsReceived(state, action) {
  const stops = {
    ...state.stops,
    [action.key]: action.stops
  };

  const stopsLoading = {
    ...state.stops_loading,
    [action.key]: false
  };

  const stopsById = {
    ...state.stops_by_id
  };

  action.stops.forEach((stop) => {
    stopsById[stop.stop_id] = stop;
  });

  return {
    ...state,
    stops_by_id: stopsById,
    stops,
    stops_loading: stopsLoading
  };
}

function stopsFailed(state, action) {
  const stopsLoading = {
    ...state.stops_loading,
    [action.key]: false
  };

  let stops_errors = state.stops_errors;
  stops_errors[action.key] = action.error;

  const stopsErrors = {
    ...state.stops_errors,
    [action.key]: action.error
  };

  return {
    ...state,
    stops_loading: stopsLoading,
    stops_errors: stopsErrors
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
