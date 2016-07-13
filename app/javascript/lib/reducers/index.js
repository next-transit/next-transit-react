import { combineReducers } from 'redux';

import agencies from './agencies';
import recent_trips from './recent-trips';
import route_types from './route-types';
import settings from './settings';

const reducer = combineReducers({
  agencies,
  recent_trips,
  route_types,
  settings
});

export default reducer;
