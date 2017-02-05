import { shapes as types } from 'lib/action-types';
import createReducer from './create-reducer';

function routeShapesRequested(state, action) {
  return {
    ...state,
    routeId: action.routeId,
    loading: true,
    error: null
  };
}

function routeShapesReceived(state, action) {
  return {
    ...state,
    routeId: action.routeId,
    loading: false,
    shapes: action.shapes
  };
}

function routeShapesFailed(state, action) {
  return {
    ...state,
    routeId: action.routeId,
    loading: false,
    error: action.error
  };
}

export default createReducer({
  routeId: null,
  shapes: null,
  loading: false,
  error: null
}, {
  [types.ROUTE_SHAPES_REQUESTED]: routeShapesRequested,
  [types.ROUTE_SHAPES_RECEIVED]: routeShapesReceived,
  [types.ROUTE_SHAPES_FAILED]: routeShapesFailed
});
