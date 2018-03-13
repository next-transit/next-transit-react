import { requestGet } from 'lib/http-utils';

export function getLocations(routeType, routeId, callback) {
  requestGet(`route_types/${routeType}/routes/${routeId}/vehicles`, callback);
}
