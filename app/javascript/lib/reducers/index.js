import { combineReducers } from 'redux';

import agencies from './agencies';
import route_types from './route-types';

const reducer = combineReducers({
  agencies,
  route_types
});

export default reducer;
