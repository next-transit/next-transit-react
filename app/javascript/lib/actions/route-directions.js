import { getRouteDirections } from 'lib/apis/route-directions';
import { route_directions as types } from 'lib/action-types';

export function routeDirectionsFailed(route_id, error) {
  return {
    type: types.ROUTE_DIRECTIONS_FAILED,
    route_id,
    error
  };
}

export function routeDirectionsReceived(route_id, directions) {
  return {
    type: types.ROUTE_DIRECTIONS_RECEIVED,
    route_id, 
    directions
  };
}

export function routeDirectionsRequested(route_id) {
  return (dispatch, getState) => {
    dispatch({ 
      type:types.ROUTE_DIRECTIONS_REQUESTED,
      route_id
    });

    getRouteDirections(route_id, (error, response, body) => {
      if (error) {
        dispatch(routeDirectionsFailed(route_id, error));
      } else {
        dispatch(routeDirectionsReceived(route_id, body.data));
      }
    });
  };
}
