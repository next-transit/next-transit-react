import { request } from 'lib/http-utils';

export function getRouteShapes(route_id, callback) {
  request(`routes/${route_id}/shapes`, callback);
};
