import { route_directions as types } from 'lib/action-types';
import createReducer from './create-reducer';

function routeDirectionsRequested(state, action) {
  let loading = state.loading;
  loading[action.route_id] = true;

  return {
    ...state,
    loading
  };
}

function routeDirectionsReceived(state, action) {
  let route_directions = state.route_directions;
  route_directions[action.route_id] = action.directions;

  let loading = state.loading;
  loading[action.route_id] = false;

  let errors = state.errors;
  errors[action.route_id] = undefined;

  return {
    ...state,
    route_directions,
    loading,
    errors
  };
}

function routeDirectionsFailed(state, action) {
  let loading = state.loading;
  loading[action.route_id] = false;

  let errors = state.errors;
  errors[action.route_id] = action.error;

  return {
    ...state,
    loading,
    error
  };
}

export default createReducer({
  route_directions: {},
  loading: {},
  errors: {}
}, {
  [types.ROUTE_DIRECTIONS_REQUESTED]: routeDirectionsRequested,
  [types.ROUTE_DIRECTIONS_RECEIVED]: routeDirectionsReceived,
  [types.ROUTE_DIRECTIONS_FAILED]: routeDirectionsFailed
});
