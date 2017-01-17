import { getRouteDirections } from 'lib/apis/route-directions';
import { route_directions as types } from 'lib/action-types';

export function routeDirectionsFailed(routeId, error) {
  return {
    type: types.ROUTE_DIRECTIONS_FAILED,
    routeId,
    error
  };
}

export function routeDirectionsReceived(routeId, directions) {
  return {
    type: types.ROUTE_DIRECTIONS_RECEIVED,
    routeId, 
    directions
  };
}

export function routeDirectionsRequested(routeId) {
  return (dispatch, getState) => {
    dispatch({ 
      type:types.ROUTE_DIRECTIONS_REQUESTED,
      routeId
    });

    getRouteDirections(routeId, (error, response, body) => {
      if (error) {
        dispatch(routeDirectionsFailed(routeId, error));
      } else {
        dispatch(routeDirectionsReceived(routeId, body.data));
      }
    });
  };
}
