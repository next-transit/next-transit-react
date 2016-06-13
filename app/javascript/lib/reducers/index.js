import { combineReducers } from 'redux';

import agencies from './agencies';
import route_types from './route-types';
import settings from './settings';

const reducer = combineReducers({
  agencies,
  route_types,
  settings
});

export default reducer;
