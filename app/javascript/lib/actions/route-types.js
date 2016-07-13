import { route_types as types } from 'lib/action-types';
import { 
  getRouteTypes,
  getRoutes
} from 'lib/apis/route-types';

/*
 * ROUTE TYPES
 */
export function routeTypesFailed(error) {
  return {
    error,
    type: types.ROUTE_TYPES_FAILED
  };
}

export function routeTypesReceived(route_types) {
  return {
    route_types,
    type: types.ROUTE_TYPES_RECEIVED
  };
}

export function routeTypesRequested() {
  return (dispatch, getState) => {
    dispatch({ type:types.ROUTE_TYPES_REQUESTED });

    getRouteTypes((error, response, body) => {
      if (error) {
        dispatch(routeTypesFailed(error));
      } else {
        dispatch(routeTypesReceived(body.data));
      }
    });
  };
}


/*
 * ROUTE TYPE ROUTES
 */
export function routesFailed(error) {
  return {
    type: types.ROUTES_FAILED,
    routes: [],
    error
  };
}

export function routesReceived(routes) {
  return {
    type: types.ROUTES_RECEIVED,
    error: null,
    routes
  };
}

export function routesRequested(route_type) {
  return (dispatch, getState) => {
    dispatch({ type:types.ROUTES_REQUESTED });

    getRoutes(route_type, (error, response, body) => {
      if (error) {
        dispatch(routesFailed(error));
      } else {
        dispatch(routesReceived(body.data));
      }
    });
  };
}
