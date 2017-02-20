import types from 'lib/action-types';
import createReducer from './create-reducer';

function settingsReceived(state, action) {
  return {
    ...state,
    settings: {
      ...action.settings
    }
  };
}

export default createReducer({
  settings: null
}, {
  [types.settings.SETTINGS_RECEIVED]: settingsReceived
});
