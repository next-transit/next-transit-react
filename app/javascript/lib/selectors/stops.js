import { createSelector } from 'reselect';

const getPageRouteId = state => state.page.routeId;
const getPageDirectionId = state => state.page.directionId;
const getPageFromStopId = state => state.page.fromStopId;

const getStopsKey = createSelector(
  getPageRouteId,
  getPageDirectionId,
  (routeId, directionId) => {
    if (routeId && directionId) {
      return `${routeId}-${directionId}`;
    }
  }
);

export const getPageStops = createSelector(
  getPageFromStopId,
  getStopsKey,
  state => state.stops.stops,
  (fromStopId, stopsKey, stopsByKey) => {
    if (stopsKey) {
      let stops = stopsByKey[stopsKey];

      if (fromStopId && stops) {
        let afterFromStop = false;
        stops = stops.filter((stop) => {
          if (!afterFromStop && stop.stop_id === fromStopId) {
            afterFromStop = true;
            return false;
          }

          return afterFromStop;
        });
      }

      return stops;
    }
  }
);

export const getPageStopsLoading = createSelector(
  getStopsKey,
  state => state.stops.stops_loading,
  (stopsKey, stopsLoading) => {
    if (stopsKey) {
      return stopsLoading[stopsKey];
    }
  }
);

export const getPageStopsError = createSelector(
  getStopsKey,
  state => state.stops.stops_errors,
  (stopsKey, stopsErrors) => {
    if (stopsKey) {
      return stopsErrors[stopsKey];
    }
  }
);

export const getPageFromStop = createSelector(
  state => state.page.fromStopId,
  state => state.stops.stops_by_id,
  (fromStopId, stops) => {
    if (fromStopId && stops) {
      return stops[fromStopId];
    }
  }
);

export const getPageToStop = createSelector(
  state => state.page.toStopId,
  state => state.stops.stops_by_id,
  (toStopId, stops) => {
    if (toStopId && stops) {
      return stops[toStopId];
    }
  }
);
