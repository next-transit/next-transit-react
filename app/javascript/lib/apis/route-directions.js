import { request } from 'lib/http-utils';

export function getRouteDirections(route_type, callback) {
  request({
    method: 'GET',
    url: `directions/${route_type}`
  }, callback);
}
