import { page as types } from 'lib/action-types';

export function page_state_updated(changes) {
  return (dispatch, getState) => {
    dispatch({
      type: types.PAGE_STATE_RECEIVED,
      settings: getState().settings.settings,
      changes
    });
  };
};

export function page_route_type_updated(route_type) {
  return (dispatch, getState) => {
    dispatch({
      type: types.PAGE_ROUTE_TYPE_RECEIVED,
      route_type
    });
  };
};

export function page_route_updated(route_id) {
  return (dispatch, getState) => {
    dispatch({
      type: types.PAGE_ROUTE_RECEIVED,
      route_id
    });
  };
};

export function page_direction_updated(direction_id) {
  return (dispatch, getState) => {
    dispatch({
      type: types.PAGE_DIRECTION_RECEIVED,
      direction_id
    });
  };
};

export function page_from_stop_updated(from_stop_id) {
  return (dispatch, getState) => {
    dispatch({
      type: types.PAGE_FROM_STOP_RECEIVED,
      from_stop_id
    });
  };
};

export function page_to_stop_updated(to_stop_id) {
  return (dispatch, getState) => {
    dispatch({
      type: types.PAGE_TO_STOP_RECEIVED,
      to_stop_id
    });
  };
};
