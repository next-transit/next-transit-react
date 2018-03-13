import types from 'lib/action-types';

import {
  addRecentTrip,
  getRecentTrips, 
  getSavedTrips,
  saveRecentTrip,
  deleteSavedTrip,
  clearRecentTrips
} from 'lib/apis/recent-trips';

function recentTripsReceived(recent_trips) {
  return {
    recent_trips,
    type: types.recent_trips.RECENT_TRIPS_RECEIVED
  };
}

function savedTripsReceived(saved_trips) {
  return {
    saved_trips,
    type: types.recent_trips.SAVED_TRIPS_RECEIVED
  };
}

function savedTripReceived(saved_trip) {
  return {
    saved_trip,
    type: types.recent_trips.SAVED_TRIP_RECEIVED
  };
}

export function newRecentTripRequested(recentTrip) {
  return (dispatch, getState) => {
    dispatch({ type:types.recent_trips.NEW_RECENT_TRIP_REQUESTED });

    addRecentTrip(recentTrip, (recentTrips) => {
      dispatch({ type:types.recent_trips.NEW_RECENT_TRIP_RECEIVED, recentTrip });
      dispatch(recentTripsReceived(recentTrips));
    });
  };
}

export function recentTripsRequested() {
  return (dispatch, getState) => {
    dispatch({ type:types.recent_trips.RECENT_TRIPS_REQUESTED });

    getRecentTrips((recent_trips) => {
      dispatch(recentTripsReceived(recent_trips));
    });
  };
}

export function savedTripsRequested() {
  return (dispatch, getState) => {
    dispatch({ type:types.recent_trips.SAVED_TRIPS_REQUESTED });

    getSavedTrips((savedTrips) => {
      dispatch(savedTripsReceived(savedTrips));
    });
  };
}

export function recentTripSaveRequested(recent_trip) {
  return (dispatch, getState) => {
    dispatch({ type:types.recent_trips.RECENT_TRIP_SAVE_REQUESTED });

    saveRecentTrip(recent_trip, (recentTrips, savedTrips) => {
      dispatch(recentTripsReceived(recentTrips));
      dispatch(savedTripsReceived(savedTrips));
    });
  };
}

export function savedTripDeleteRequested(key) {
  return (dispatch, getState) => {
    dispatch({ type:types.recent_trips.SAVED_TRIP_DELETE_REQUESTED });

    deleteSavedTrip(key, (recentTrips, savedTrips) => {
      dispatch(recentTripsReceived(recentTrips));
      dispatch(savedTripsReceived(savedTrips));
    });
  };
}

export function clearRecentTripsRequested() {
  return (dispatch, getState) => {
    dispatch({ type:types.recent_trips.CLEAR_RECENT_TRIPS_REQUESTED });

    clearRecentTrips((recentTrips) => {
      dispatch(recentTripsReceived(recentTrips));
    });
  };
}
