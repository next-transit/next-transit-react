import { getAgencies, getAgency } from 'lib/apis/agencies';
import types from 'lib/action-types';

// AGENCIES
export function agenciesFailed(error) {
  return {
    error,
    type: types.agencies.AGENCIES_FAILED
  };
}

export function agenciesReceived(agencies) {
  return {
    agencies,
    type: types.agencies.AGENCIES_RECEIVED
  };
}

export function agenciesRequested() {
  return (dispatch, getState) => {
    dispatch({ type:types.agencies.AGENCIES_REQUESTED });

    getAgencies((error, response, body) => {
      if (error) {
        dispatch(agenciesFailed(error));
      } else {
        dispatch(agenciesReceived(body.data));
      }
    });
  };
}

// AGENCY
export function agencyFailed(error) {
  return {
    error,
    type: types.agencies.AGENCY_FAILED
  };
}

export function agencyReceived(agency) {
  return {
    agency,
    type: types.agencies.AGENCY_RECEIVED
  };
}

export function agency_request(agency_slug) {
  return (dispatch, getState) => {
    dispatch({ type:types.agencies.AGENCY_REQUESTED });

    getAgency(agency_slug, (error, response, body) => {
      if (error) {
        dispatch(agencyFailed(error));
      } else {
        dispatch(agencyReceived(body.data));
      }
    });
  };
}
