import { route_types as types } from 'lib/action-types';
import createReducer from './create-reducer';

function routeTypesReceived(state, action) {
  return {
    ...state,
    route_types: action.route_types
  };
}

export default createReducer({
  route_types: []
}, {
  [types.ROUTE_TYPES_RECEIVED]: routeTypesReceived
});
