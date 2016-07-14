import { request } from 'lib/http-utils';

export function getRouteTypes(callback) {
  request('route_types', callback);
};
