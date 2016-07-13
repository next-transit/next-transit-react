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
  let title = action.changes.title || state.title;

  if (action.changes.title && action.settings && action.settings.app_title) {
    action.changes.title = `${title} - ${action.settings.app_title}`;
  }

  return {
    ...state,
    ...action.changes
  };
}

export default createReducer({
  title: '',
  back: null
}, {
  [types.settings.SETTINGS_RECEIVED]: settingsReceived,
  [types.page.PAGE_STATE_RECEIVED]: pageStateReceived
});
