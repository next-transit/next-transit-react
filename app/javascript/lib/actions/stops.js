import { stops as types } from 'lib/action-types';
import { getRouteDirectionStops } from 'lib/apis/simplified-stops';

/*
 * STOPS
 */
export function routeDirectionStopsFailed(route_id, direction_id, error) {
  return {
    type: types.ROUTE_DIRECTION_STOPS_FAILED,
    key: `${route_id}-${direction_id}`,
    error
  };
}

export function routeDirectionStopsReceived(route_id, direction_id, stops) {
  return {
    type: types.ROUTE_DIRECTION_STOPS_RECEIVED,
    key: `${route_id}-${direction_id}`,
    stops
  };
}

export function routeDirectionStopsRequested(route_id, direction_id) {
  return (dispatch, getState) => {
    dispatch({ 
      type: types.ROUTE_DIRECTION_STOPS_REQUESTED,
      key: `${route_id}-${direction_id}`
    });

    getRouteDirectionStops(route_id, direction_id, (error, response, body) => {
      if (error) {
        dispatch(routeDirectionStopsFailed(route_id, direction_id, error));
      } else {
        dispatch(routeDirectionStopsReceived(route_id, direction_id, body.data));
      }
    });
  };
}
