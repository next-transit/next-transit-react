import { combineReducers } from 'redux';

import agencies from './agencies';
import page from './page';
import recent_trips from './recent-trips';
import routes from './routes';
import route_directions from './route-directions';
import route_types from './route-types';
import settings from './settings';

const reducer = combineReducers({
  agencies,
  page,
  recent_trips,
  routes,
  route_directions,
  route_types,
  settings
});

export default reducer;
