import { createSelector } from 'reselect';

const getPageRouteType = state => state.page.routeType;
const getPageRouteId = state => state.page.routeId;
const getRouteTypeRoutes = state => state.routes.route_type_routes;
const getRoutesLoading = state => state.routes.routes_loading;
const getRoutesRequestErrors = state => state.routes.routes_errors;

export const getPageRoutes = createSelector(
  getRouteTypeRoutes,
  getPageRouteType,
  (routeTypeRoutes, pageRouteType) => {
    if (pageRouteType) {
      return routeTypeRoutes[pageRouteType];
    }
  }
);

export const getPageRoutesLoading = createSelector(
  getRoutesLoading,
  getPageRouteType,
  (routeTypeLoading, pageRouteType) => {
    if (pageRouteType) {
      return !!routeTypeLoading[pageRouteType];
    }

    return false;
  }
);

export const getPageRoutesRequestError = createSelector(
  getRoutesRequestErrors,
  getPageRouteType,
  (routesRequestErrors, pageRouteType) => {
    if (pageRouteType) {
      return routesRequestErrors[pageRouteType];
    }

    return null;
  }
);

export const getPageRoute = createSelector(
  getPageRouteId,
  getPageRoutes,
  (pageRouteId, routeTypeRoutes) => {
    if (routeTypeRoutes) {
      return routeTypeRoutes.find(route => route.slug === pageRouteId);
    }
  }
);
