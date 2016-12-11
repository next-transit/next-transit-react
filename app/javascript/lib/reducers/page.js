import types from 'lib/action-types';
import createReducer from './create-reducer';

function settings_received(state, action) {
  // Set page title on initial settings receive
  return {
    ...state,
    title: action.settings.app_title
  };
}

function page_state_received(state, action) {
  let title = action.changes.title || state.title;

  if (action.changes.title && action.settings && action.settings.app_title) {
    action.changes.title = `${title} - ${action.settings.app_title}`;
  }

  // Default to a "true" footer unless it's explicitly set to "false"
  action.changes.footer = action.changes.footer !== false;

  return {
    ...state,
    ...action.changes
  };
}

function page_route_type_received(state, action) {
  return {
    ...state,
    route_type: action.route_type
  };
}

function page_route_received(state, action) {
  return {
    ...state,
    route_id: action.route_id
  };
}

function page_direction_received(state, action) {
  return {
    ...state,
    direction_id: action.direction_id
  };
}

function page_from_stop_received(state, action) {
  return {
    ...state,
    from_stop_id: action.from_stop_id
  };
}

function page_to_stop_received(state, action) {
  return {
    ...state,
    to_stop_id: action.to_stop_id
  };
}

export default createReducer({
  title: '',
  back: null,
  footer: true,

  // current params
  route_type: null,
  route_id: null,
  direction_id: null,
  from_stop_id: null,
  from_to_id: null
}, {
  [types.settings.SETTINGS_RECEIVED]: settings_received,
  [types.page.PAGE_STATE_RECEIVED]: page_state_received,

  [types.page.PAGE_ROUTE_TYPE_RECEIVED]: page_route_type_received,
  [types.page.PAGE_ROUTE_RECEIVED]: page_route_received,
  [types.page.PAGE_DIRECTION_RECEIVED]: page_direction_received,
  [types.page.PAGE_FROM_STOP_RECEIVED]: page_from_stop_received,
  [types.page.PAGE_TO_STOP_RECEIVED]: page_to_stop_received
});
