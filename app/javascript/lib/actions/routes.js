import { routes as types } from 'lib/action-types';
import { getRoute, getRoutes } from 'lib/apis/routes';

function routeReceived(route) {
  return {
    type: types.ROUTE_RECEIVED,
    route
  };
}

function routeFailed(route_id, error) {
  return {
    type: types.ROUTE_FAILED,
    route_id,
    error
  };
}

export function routeRequested(route_id) {
  return (dispatch, getState) => {
    dispatch({
      type:types.ROUTE_REQUESTED,
      route_id
    });

    getRoute(route_id, (error, response, body) => {
      if (error) {
        dispatch(routeFailed(route_id, error));
      } else {
        dispatch(routeReceived(body.data));
      }
    });
  };
}

function routesReceived(route_type_id, routes) {
  return {
    type: types.ROUTES_RECEIVED,
    route_type_id,
    routes
  };
}

function routesFailed(route_type_id, error) {
  return {
    type: types.ROUTES_FAILED,
    route_type_id,
    error
  };
}

export function routesRequested(route_type_id) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ROUTES_REQUESTED,
      route_type_id
    });

    getRoutes(route_type_id, (error, response, body) => {
      if (error) {
        dispatch(routesFailed(route_type_id, error));
      } else {
        dispatch(routesReceived(route_type_id, body.data));
      }
    });
  };
};
