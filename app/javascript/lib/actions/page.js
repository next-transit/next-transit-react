import types from 'lib/action-types';

export function pageStateUpdated(changes) {
  return (dispatch, getState) => {
    dispatch({
      type: types.page.PAGE_STATE_RECEIVED,
      settings: getState().settings.settings,
      changes
    });
  };
};
