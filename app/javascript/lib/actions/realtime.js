import { getLocations } from 'lib/apis/realtime';
import types from 'lib/action-types';

export function clearLocations() {
  return (dispatch, getState) => {
    dispatch({ type: types.realtime.LOCATIONS_CLEARED });
  };
}

function locationsReceived(locations) {
  return {
    type: types.realtime.LOCATIONS_RECEIVED,
    locations
  };
}

function locationsRequestFailed(error) {
  return {
    type: types.realtime.LOCATIONS_REQUEST_FAILED,
    error
  };
}

export function requestLocations(routeType, routeId) {
  return (dispatch, getState) => {
    dispatch({ type:types.realtime.LOCATIONS_REQUESTED });

    getLocations(routeType, routeId, (error, response, body) => {
      if (error) {
        dispatch(locationsRequestFailed(error));
      } else {
        dispatch(locationsReceived(body.vehicles));
      }
    });
  };
}
