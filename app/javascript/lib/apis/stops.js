import { request } from 'lib/http-utils';

export function getRouteDirectionStops(route_id, direction_id, callback) {
  request(`routes/${route_id}/directions/${direction_id}/stops`, callback);
};
