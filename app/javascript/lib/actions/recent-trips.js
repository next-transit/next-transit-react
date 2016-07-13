import { 
  getRecentTrips, 
  getSavedTrips,
  saveRecentTrip,
  deleteSavedTrip
} from 'lib/apis/recent-trips';
import { recent_trips as types } from 'lib/action-types';

function recentTripsReceived(recent_trips) {
  return {
    recent_trips,
    type: types.RECENT_TRIPS_RECEIVED
  };
}

function savedTripsReceived(saved_trips) {
  return {
    saved_trips,
    type: types.SAVED_TRIPS_RECEIVED
  };
}

function savedTripReceived(saved_trip) {
  return {
    saved_trip,
    type: types.SAVED_TRIP_RECEIVED
  };
}

export function recentTripsRequested() {
  return (dispatch, getState) => {
    dispatch({ type:types.RECENT_TRIPS_REQUESTED });

    getRecentTrips((recent_trips) => {
      dispatch(recentTripsReceived(recent_trips));
    });
  };
}

export function savedTripsRequested() {
  return (dispatch, getState) => {
    dispatch({ type:types.SAVED_TRIPS_REQUESTED });

    getSavedTrips((saved_trips) => {
      dispatch(savedTripsReceived(saved_trips));
    });
  };
}

export function recentTripSaveRequested(recent_trip) {
  return (dispatch, getState) => {
    dispatch({ type:types.RECENT_TRIP_SAVE_REQUESTED });

    saveRecentTrip(recent_trip, (saved_trips, recent_trips) => {
      dispatch(savedTripsReceived(saved_trips));
      console.log('new recent_trips', recent_trips)
      dispatch(recentTripsReceived(recent_trips));
    });
  };
}

export function savedTripDeleteRequested(key) {
  return (dispatch, getState) => {
    dispatch({ type:types.SAVED_TRIP_DELETE_REQUESTED });

    deleteSavedTrip(key, (saved_trips) => {
      dispatch(savedTripsReceived(saved_trips));
    });
  };
}
