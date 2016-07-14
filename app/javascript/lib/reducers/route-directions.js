import { route_directions as types } from 'lib/action-types';
import createReducer from './create-reducer';

function routeDirectionsRequested(state, action) {
  state.loading[action.route_id] = true;

  return state;
}

function routeDirectionsReceived(state, action) {
  state.directions[action.route_id] = action.directions;
  state.loading[action.route_id] = false;
  state.errors[action.route_id] = undefined;

  return state;
}

function routeDirectionsFailed(state, action) {
  state.loading[action.route_id] = false;
  state.errors[action.route_id] = action.error;

  return state;
}

export default createReducer({
  directions: {},
  loading: {},
  errors: {}
}, {
  [types.ROUTE_DIRECTIONS_REQUESTED]: routeDirectionsRequested,
  [types.ROUTE_DIRECTIONS_RECEIVED]: routeDirectionsReceived,
  [types.ROUTE_DIRECTIONS_FAILED]: routeDirectionsFailed
});
