import { request } from 'lib/http-utils';

export function getRouteShapes(route_id, callback) {
  request(`routes/${route_id}/shapes`, callback);
};

export function getBoundingBoxShapes(bounds, callback) {
  const bbox = [bounds.w, bounds.s, bounds.e, bounds.n].join(',');
  
  request({
    url: 'shapes',
    params: {
      bbox
    }
  }, callback);
};
