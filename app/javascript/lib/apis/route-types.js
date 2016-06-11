import { request } from 'lib/http-utils';

export function getRouteTypes(callback) {
  request({
    method: 'GET',
    url: `route_types`
  }, callback);
}
