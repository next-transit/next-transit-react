import types from 'lib/action-types';
import createReducer from './create-reducer';

function routeRequested(state, action) {
  state.route_loading[action.slug] = true;

  return { ...state };
}

function routeFailed(state, action) {
  const routesLoading = { ...state.routes_loading };
  const routesErrors = { ...state.routes_errors };

  routesLoading[action.route_type_id] = false;
  routesErrors[action.route_type_id] = action.error;

  return {
    ...state,
    routes_loading: routesLoading,
    routes_errors: routesErrors
  };
}

function routeReceived(state, action) {
  state.route_errors[action.route.slug] = undefined;
  state.routes[action.route.slug] = action.route;

  const routesLoading = { ...state.routes_loading };
  routesLoading[action.route_type_id] = false;

  return {
    ...state,
    routes_loading: routesLoading
  };
}

/*
 * ROUTES, by ROUTE TYPE
 */
function routesRequested(state, action) {
  const routesLoading = { ...state.routes_loading };
  const routesErrors = { ...state.routes_errors };

  routesLoading[action.route_type_id] = true;
  routesErrors[action.route_type_id] = undefined;

  return {
    ...state,
    routes_loading: routesLoading,
    routes_errors: routesErrors
  };
}

function routesReceived(state, action) {
  const routesLoading = { ...state.routes_loading };
  const routeTypeRoutes = { ...state.route_type_routes };

  routesLoading[action.route_type_id] = false;
  routeTypeRoutes[action.route_type_id] = action.routes;

  return {
    ...state,
    routes_loading: routesLoading,
    route_type_routes: routeTypeRoutes
  };
}

function routesFailed(state, action) {
  const routesLoading = { ...state.routes_loading };
  const routesErrors = { ...state.routes_errors };

  routesLoading[action.route_type_id] = false;
  routesErrors[action.route_type_id] = action.error;

  return {
    ...state,
    routes_loading: routesLoading,
    routes_errors: routesErrors
  };
}

export default createReducer({
  route_type_routes: {},
  routes_loading: {},
  routes_errors: {}
}, {
  [types.routes.ROUTE_REQUESTED]: routeRequested,
  [types.routes.ROUTE_RECEIVED]: routeReceived,
  [types.routes.ROUTE_FAILED]: routeFailed,

  [types.routes.ROUTES_REQUESTED]: routesRequested,
  [types.routes.ROUTES_RECEIVED]: routesReceived,
  [types.routes.ROUTES_FAILED]: routesFailed
});
