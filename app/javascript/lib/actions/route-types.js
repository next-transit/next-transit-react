import { route_types as types } from 'lib/action-types';
import { getRouteTypes } from 'lib/apis/route-types';

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

export function route_types_requested() {
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
