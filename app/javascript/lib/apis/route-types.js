import { request } from 'lib/http-utils';

export function getRouteTypes(callback) {
  request('route_types', callback);
};

export function getRoutes(route_type, callback) {
  request(`route_types/${route_type}/routes`, callback);
};
