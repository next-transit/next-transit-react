import { route_directions as types } from 'lib/action-types';
import createReducer from './create-reducer';

function routeDirectionsReceived(state, action) {
  return {
    ...state,
    route_directions: action.route_directions
  };
}

export default createReducer({
  route_directions: []
}, {
  [types.ROUTE_DIRECTIONS_RECEIVED]: routeDirectionsReceived
});
