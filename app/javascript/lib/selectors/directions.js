import { createSelector } from 'reselect';

const getPageRouteId = state => state.page.routeId;
const getPageDirectionId = state => state.page.directionId;
const getDirections = state => state.route_directions.routeDirections;
const getDirectionsLoading = state => state.route_directions.loading;
const getDirectionsErrors = state => state.route_directions.errors;

export const getPageRouteDirections = createSelector(
  getPageRouteId,
  getDirections,
  (pageRouteId, routeDirections) => {
    return routeDirections[pageRouteId];
  }
);

export const getPageRouteDirectionsLoading = createSelector(
  getPageRouteId,
  getDirectionsLoading,
  (pageRouteId, directionsLoading) => {
    return !!directionsLoading[pageRouteId];
  }
);

export const getPageRouteDirectionsError = createSelector(
  getPageRouteId,
  getDirectionsErrors,
  (pageRouteId, directionsErrors) => {
    return directionsErrors[pageRouteId];
  }
);

export const getPageRouteDirection = createSelector(
  getPageRouteId,
  getPageDirectionId,
  getDirections,
  (pageRouteId, pageDirectionId, routeDirections) => {
    const directions = routeDirections[pageRouteId];

    if (directions) {
      return directions[pageDirectionId];
    }
  }
);
