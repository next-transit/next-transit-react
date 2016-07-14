import { request } from 'lib/http-utils';

export function getRouteDirections(route_id, callback) {
  request(`routes/${route_id}/directions`, callback);
};
