import { route_types as types } from 'lib/action-types';
import createReducer from './create-reducer';

function route_types_received(state, action) {
  return {
    ...state,
    route_types: action.route_types
  };
}

function routes_received(state, action) {
  return {
    ...state,
    routes: action.routes
  };
}

export default createReducer({
  route_types: [],
  routes: []
}, {
  [types.ROUTE_TYPES_RECEIVED]: route_types_received,
  [types.ROUTES_RECEIVED]: routes_received
});
