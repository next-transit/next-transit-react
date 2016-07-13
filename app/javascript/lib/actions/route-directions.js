import { getRouteDirections } from 'lib/apis/route-directions';
import { route_directions as types } from 'lib/action-types';

export function routeDirectionsFailed(error) {
  return {
    error,
    type: types.ROUTE_DIRECTIONS_FAILED
  };
}

export function routeDirectionsReceived(route_directions) {
  return {
    route_directions,
    type: types.ROUTE_DIRECTIONS_RECEIVED
  };
}

export function routeDirectionsRequested(route_type) {
  return (dispatch, getState) => {
    dispatch({ type:types.ROUTE_DIRECTIONS_REQUESTED });

    getRouteDirections(route_type, (error, response, body) => {
      if (error) {
        dispatch(routeDirectionsFailed(error));
      } else {
        dispatch(routeDirectionsReceived(body.data));
      }
    });
  };
}
