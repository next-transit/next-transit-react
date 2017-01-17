import { route_types as types } from 'lib/action-types';
import createReducer from './create-reducer';

function routeTypesRequested(state, action) {
  return {
    ...state,
    route_types_loading: true
  };
}

function route_types_failed(state, action) {
  return {
    ...state,
    route_types_loading: false,
    route_types_error: action.error
  }
}

function route_types_received(state, action) {
  action.route_types.forEach((route_type) => {
    action.route_types[route_type.slug] = route_type;
  });

  return {
    ...state,
    route_types_loading: false,
    route_types_error: null,
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
  route_types: null,
  route_types_loading: false,
  route_types_error: null,
  routes: []
}, {
  [types.ROUTE_TYPES_REQUESTED]: routeTypesRequested,
  [types.ROUTE_TYPES_RECEIVED]: route_types_received,
  [types.ROUTES_RECEIVED]: routes_received
});
