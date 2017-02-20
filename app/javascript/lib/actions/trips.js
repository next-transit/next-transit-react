import types from 'lib/action-types';
import { get_trips } from 'lib/apis/trips';

/*
 * TRIPS
 */
function trips_failed(error) {
  return {
    type: types.trips.TRIPS_FAILED,
    error
  };
}

function trips_received(trips) {
  return {
    type: types.trips.TRIPS_RECEIVED,
    trips
  };
}

export function tripsRequested(route_id, direction_id, from_stop_id, to_stop_id) {
  return (dispatch, getState) => {
    dispatch({ type:types.trips.TRIPS_REQUESTED });

    get_trips(route_id, direction_id, from_stop_id, to_stop_id, (error, response, body) => {
      if (error) {
        dispatch(trips_failed(error));
      } else {
        dispatch(trips_received(body.data));
      }
    });
  };
}