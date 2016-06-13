import { settings as types } from 'lib/action-types';
import createReducer from './create-reducer';

function settingsReceived(state, action) {
  return {
    ...state,
    settings: action.settings
  };
}

export default createReducer({
  settings: null
}, {
  [types.SETTINGS_RECEIVED]: settingsReceived
});
