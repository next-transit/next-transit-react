import { trips as types } from 'lib/action-types';
import { getTrips } from 'lib/apis/trips';

/*
 * TRIPS
 */
export function tripsFailed(error) {
  return {
    type: types.TRIPS_FAILED,
    error
  };
}

export function tripsReceived(trips) {
  return {
    type: types.TRIPS_RECEIVED,
    trips
  };
}

export function tripsRequested(route_id, direction_id, from_stop_id, to_stop_id) {
  return (dispatch, getState) => {
    dispatch({ type:types.TRIPS_REQUESTED });

    getTrips(route_id, direction_id, from_stop_id, to_stop_id, (error, response, body) => {
      if (error) {
        dispatch(tripsFailed(error));
      } else {
        dispatch(tripsReceived(body.data));
      }
    });
  };
}