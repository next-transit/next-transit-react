import { createSelector } from 'reselect';

export const getPageRouteType = createSelector(
  state => state.route_types.route_types,
  state => state.page.routeType,
  (routeTypes, pageRouteType) => {
    if (routeTypes && pageRouteType) {
      return routeTypes.find(route_type => {
        return route_type.slug === pageRouteType;
      });
    }
  }
);

export const getFooterRouteTypes = createSelector(
  state => state.route_types.route_types,
  (routeTypes) => {
    if (routeTypes) {
      return routeTypes
              .filter(routeType => routeType.menu_label)
              .sort((a, b) => a.menu_label > b.menu_label);
    }
  }
);
