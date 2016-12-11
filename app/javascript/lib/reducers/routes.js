import { routes as types } from 'lib/action-types';
import createReducer from './create-reducer';

function routeRequested(state, action) {
  state.route_loading[action.slug] = true;

  return { ...state };
}

function routeFailed(state, action) {
  state.route_errors[action.slug] = action.error;

  return { ...state };
}

function routeReceived(state, action) {
  state.route_errors[action.route.slug] = undefined;
  state.route_loading[action.route.slug] = false;
  state.routes[action.route.slug] = action.route;

  return { ...state };
}


function routesRequested(state, action) {
  state.routes_loading[action.route_type_id] = true;

  return { ...state };
}

function routesReceived(state, action) {
  state.routes_loading[action.route_type_id] = false;
  state.routes_errors[action.route_type_id] = undefined;
  state.route_type_routes[action.route_type_id] = action.routes;

  return { ...state };
}

function routesFailed(state, action) {
  state.routes_loading[action.route_type_id] = false;
  state.routes_errors[action.route_type_id] = action.error;

  return { ...state };
}

export default createReducer({
  route_type_routes: {},
  routes_loading: {},
  routes_errors: {}
}, {
  [types.ROUTE_REQUESTED]: routeRequested,
  [types.ROUTE_RECEIVED]: routeReceived,
  [types.ROUTE_FAILED]: routeFailed,

  [types.ROUTES_REQUESTED]: routesRequested,
  [types.ROUTES_RECEIVED]: routesReceived,
  [types.ROUTES_FAILED]: routesFailed
});
