import { request } from 'lib/http-utils';

export function getTrips(route_id, direction_id, from_stop_id, to_stop_id, callback) {
  let stops = from_stop_id;

  if (to_stop_id) {
    stops += `...${to_stop_id}`;
  }

  request(`routes/${route_id}/directions/${direction_id}/stops/${stops}/trips`, callback);
};
