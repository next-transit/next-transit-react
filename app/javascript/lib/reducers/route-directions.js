import types from 'lib/action-types';
import createReducer from './create-reducer';

function routeDirectionsRequested(state, action) {
  const loading = {
    ...state.loading,
    [action.routeId]: true
  };

  const errors = {
    ...state.loading,
    [action.routeId]: null
  };

  return {
    ...state,
    loading,
    errors
  };
}

function routeDirectionsReceived(state, action) {
  // Need to construct a new object via spread to defeat selector memoization
  const routeDirections = {
    ...state.routeDirections,
    [action.routeId]: action.directions
  };
  
  const loading = {
    ...state.loading,
    [action.routeId]: false
  };

  return {
    ...state,
    routeDirections,
    loading
  };
}

function routeDirectionsFailed(state, action) {
  const loading = {
    ...state.loading,
    [action.routeId]: false
  };

  const errors = {
    ...state.loading,
    [action.routeId]: action.error
  };

  return {
    ...state,
    loading,
    error
  };
}

export default createReducer({
  routeDirections: {},
  loading: {},
  errors: {}
}, {
  [types.route_directions.ROUTE_DIRECTIONS_REQUESTED]: routeDirectionsRequested,
  [types.route_directions.ROUTE_DIRECTIONS_RECEIVED]: routeDirectionsReceived,
  [types.route_directions.ROUTE_DIRECTIONS_FAILED]: routeDirectionsFailed
});
