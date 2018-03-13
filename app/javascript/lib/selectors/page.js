import { createSelector } from 'reselect';

import { getPageRouteType } from 'lib/selectors/route-types';
import { getPageRoute } from 'lib/selectors/routes';
import { getPageRouteDirection } from 'lib/selectors/directions';

const ROUTE_TITLES = {
  '/about': 'About',
  '/options': 'Options'
};

export const getPageTitle = createSelector(
  state => state.settings.settings,
  (state, location) => location,
  getPageRouteType,
  getPageRoute,
  getPageRouteDirection,
  (settings, location, pageRouteType, pageRoute, pageDirection) => {
    if (settings) {
      let title = settings.app_title;
      const routeTitle = ROUTE_TITLES[location.pathname];

      if (pageRouteType) {
        title = `${pageRouteType.label} - ${settings.app_title}`;

        if (pageRoute) {
          title = `${pageRoute.route_short_name} - ${settings.app_title}`;

          if (pageDirection) {
            title = `${pageRoute.route_short_name} - ${pageDirection.direction_name} - ${settings.app_title}`;
          }
        }
      }

      if (routeTitle) {
        title = `${routeTitle} - ${settings.app_title}`;
      }

      return title;
    }
  }
);

export const getBackPath = createSelector(
  state => state.page,
  (page) => {
    // /type                              -> /
    // /type/route                        -> /type
    // /type/route/direction              -> /type/route
    // /type/route/direction/from         -> /type/route/direction
    // /type/route/direction/from/choose  -> /type/route/direction/from
    // /type/route/direction/from/to      -> /type/route/direction/choose

    let backPath = '';
    const pathParts = ['routeType', 'routeId', 'directionId', 'fromStopId', 'toStopId'];

    pathParts.forEach((part, i) => {
      if (i && page[part]) {
        const previousPart = pathParts[i - 1];
        backPath += `/${page[previousPart]}`;
      }
    });

    return backPath || '/';
  }
);

export const page_from_stop_selector = createSelector(
  state => state.stops.stops,
  state => state.page.route_id,
  state => state.page.direction_id,
  state => state.page.from_stop_id,
  (stops, route_id, direction_id, from_stop_id) => {
    if (route_id && typeof direction_id === 'number' && from_stop_id) {
      const stops_key = `${route_id}-${direction_id}`;
      const route_direction_stops = stops[stops_key];

      if (route_direction_stops) {
        return route_direction_stops.find((stop) => {
          return stop.stop_id === from_stop_id;
        });
      }
    }
  }
);

export const page_to_stop_selector = createSelector(
  state => state.stops.stops,
  state => state.page.route_id,
  state => state.page.direction_id,
  state => state.page.to_stop_id,
  (stops, route_id, direction_id, to_stop_id) => {
    if (route_id && typeof direction_id === 'number' && to_stop_id) {
      const stops_key = `${route_id}-${direction_id}`;
      const route_direction_stops = stops[stops_key];

      if (route_direction_stops) {
        return route_direction_stops.find((stop) => {
          return stop.stop_id === to_stop_id;
        });
      }
    }
  }
);
