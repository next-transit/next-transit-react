import { settings as types } from 'lib/action-types';
import { setSettings } from 'lib/http-utils';

const SETTING_NAMES = [
  'agency',
  'api_key',
  'api_url',
  'search_text',
  'app_title'
];

export function settingsRequested(elem) {
  return (dispatch, getState) => {
    dispatch({ type: types.SETTINGS_REQUESTED });

    let settings = {};

    if (elem && elem.getAttribute) {
      SETTING_NAMES.forEach((name) => {
        settings[name] = elem.getAttribute('data-' + name.replace(/_/g, '-'));
      });
    }

    dispatch(settingsReceived(settings));
  };
}

export function settingsReceived(settings) {
  setSettings(settings);

  return {
    settings,
    type: types.SETTINGS_RECEIVED
  };
}
