import types from 'lib/action-types';
import { getRouteShapes, getBoundingBoxShapes } from 'lib/apis/shapes';

function routeShapesReceived(routeId, shapes) {
  return {
    type: types.shapes.ROUTE_SHAPES_RECEIVED,
    routeId,
    shapes
  };
}

function routeShapesFailed(routeId, error) {
  return {
    type: types.shapes.ROUTE_SHAPES_FAILED,
    routeId,
    error
  };
}

export function routeShapesRequested(routeId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.shapes.ROUTE_SHAPES_REQUESTED,
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

function boundingBoxShapesReceived(shapes) {
  return {
    type: types.shapes.BOUNDING_BOX_SHAPES_RECEIVED,
    shapes
  };
}

function boundingBoxShapesFailed(error) {
  return {
    type: types.shapes.BOUNDING_BOX_SHAPES_FAILED,
    error
  };
}

export function boundingBoxShapesRequested(bounds) {
  return (dispatch, getState) => {
    dispatch({
      type: types.shapes.BOUNDING_BOX_SHAPES_REQUESTED
    });

    getBoundingBoxShapes(bounds, (error, response, body) => {
      if (error) {
        dispatch(boundingBoxShapesFailed(error));
      } else {
        dispatch(boundingBoxShapesReceived(body.data));
      }
    });
  };
};
