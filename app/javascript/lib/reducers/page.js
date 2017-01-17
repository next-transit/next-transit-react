import types from 'lib/action-types';
import createReducer from './create-reducer';

function settingsReceived(state, action) {
  // Set page title on initial settings receive
  return {
    ...state,
    title: action.settings.app_title
  };
}

function pageStateReceived(state, action) {
  // Default to a "true" footer unless it's explicitly set to "false"
  action.changes.footer = action.changes.footer !== false;

  return {
    ...state,
    ...action.changes
  };
}

export default createReducer({
  title: '',
  backPath: '/',
  back: null,
  footer: true,

  // current params
  routeType: null,
  routeId: null,
  directionId: null,
  fromStopId: null,
  toStopId: null,
  chooseStop: null
}, {
  [types.settings.SETTINGS_RECEIVED]: settingsReceived,
  [types.page.PAGE_STATE_RECEIVED]: pageStateReceived
});
