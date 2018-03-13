import { request } from 'lib/http-utils';

export function getTrips(routeId, directionId, fromStopId, toStopId, offset, callback) {
  let stops = fromStopId;
  const params = {};

  if (toStopId) {
    stops += `...${toStopId}`;
  }

  if (offset) {
    params.offset = offset;
  }

  request({
    url: `routes/${routeId}/directions/${directionId}/stops/${stops}/trips`,
    params: params
  }, callback);
};
