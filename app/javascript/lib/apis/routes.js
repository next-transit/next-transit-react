import { request } from 'lib/http-utils';

export function getRoute(route_id, callback) {
  request(`routes/${route_id}`, callback);
};

export function getRoutes(route_type, callback) {
  request(`route_types/${route_type}/routes`, callback);
};
