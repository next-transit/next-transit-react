import { shapes as types } from 'lib/action-types';
import { getRouteShapes } from 'lib/apis/shapes';

function routeShapesReceived(routeId, shapes) {
  return {
    type: types.ROUTE_SHAPES_RECEIVED,
    routeId,
    shapes
  };
}

function routeShapesFailed(routeId, error) {
  return {
    type: types.ROUTE_SHAPES_FAILED,
    routeId,
    error
  };
}

export function routeShapesRequested(routeId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ROUTE_SHAPES_REQUESTED,
      routeId
    });

    getRouteShapes(routeId, (error, response, body) => {
      if (error) {
        dispatch(routeShapesFailed(routeId, error));
      } else {
        dispatch(routeShapesReceived(routeId, body.data));
      }
    });
  };
};
