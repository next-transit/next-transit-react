import types from 'lib/action-types';
import { getTrips } from 'lib/apis/trips';

/*
 * TRIPS
 */
function tripsFailed(error) {
  return {
    type: types.trips.TRIPS_FAILED,
    error
  };
}

function tripsReceived(trips, offset) {
  return {
    type: types.trips.TRIPS_RECEIVED,
    trips,
    offset
  };
}

export function tripsRequested(routeId, directionId, fromStopId, toStopId, offset) {
  return (dispatch, getState) => {
    dispatch({ type:types.trips.TRIPS_REQUESTED });

    getTrips(routeId, directionId, fromStopId, toStopId, offset, (error, response, body) => {
      if (error) {
        dispatch(tripsFailed(error));
      } else {
        dispatch(tripsReceived(body.data, offset));
      }
    });
  };
}