import types from 'lib/action-types';
import { getLocation } from 'lib/apis/map';

function userLocationReceived(position) {
  return {
    type: types.map.USER_LOCATION_RECEIVED,
    userLocation: [
      position.coords.longitude,
      position.coords.latitude
    ]
  };
}

function userLocationRequestFailed(error) {
  return {
    type: types.map.USER_LOCATION_REQUEST_FAILED,
    error
  };
}

export function userLocationRequested() {
  return (dispatch, getState) => {
    dispatch({ type:types.map.USER_LOCATION_REQUESTED });

    getLocation((error, position) => {
      if (error) {
        dispatch(userLocationRequestFailed(error));
      } else {
        dispatch(userLocationReceived(position));
      }
    });
  };
}
