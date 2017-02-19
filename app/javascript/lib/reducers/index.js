import { combineReducers } from 'redux';

import agencies from './agencies';
import map from './map';
import page from './page';
import recent_trips from './recent-trips';
import routes from './routes';
import route_directions from './route-directions';
import route_types from './route-types';
import settings from './settings';
import shapes from './shapes';
import stops from './stops';
import trips from './trips';

const reducer = combineReducers({
  agencies,
  map,
  page,
  recent_trips,
  routes,
  route_directions,
  route_types,
  settings,
  shapes,
  stops,
  trips
});

export default reducer;
