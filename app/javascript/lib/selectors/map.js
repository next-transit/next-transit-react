import { createSelector } from 'reselect';

import { getPageRoute } from './routes';

const getShapes = state => state.shapes.shapes;
const getRealtimeLocations = state => state.realtime.locations;

function getRouteColor(route) {
  let color = route.route_color || route.color;

  if (color && !color.startsWith('#')) {
    color = `#${color}`;
  }

  return color;
}

export const getShapeRouteInfos = createSelector(
  getPageRoute,
  getShapes,
  getRealtimeLocations,
  (route, shapes, vehicles) => {
    let routeInfos = null;

    if (shapes instanceof Array) {
      routeInfos = shapes.map((routeInfo) => {
        const slug = routeInfo.slug || routeInfo.route_id;
        return {
          slug: routeInfo.slug || routeInfo.route_id,
          label: routeInfo.route_short_name || routeInfo.route_long_name,
          path: `/${routeInfo.route_type_slug}/${slug}`,
          color: getRouteColor(routeInfo),
          paths: routeInfo.paths,
          stops: routeInfo.stops
        };
      });
    } else if (shapes && route) {
      routeInfos = [{
        slug: route.slug || route.route_id,
        label: route.route_short_name || route.route_long_name,
        path: `/${route.route_type_slug}/${route.slug}`,
        color: getRouteColor(route),
        paths: shapes.paths,
        stops: shapes.stops,
        vehicles
      }];
    }

    return routeInfos;
  }
);

export const getVehicles = createSelector(
  getRealtimeLocations,
  vehicles => vehicles
);

export const getVehicleById = createSelector(
  (state, vehicleId) => vehicleId,
  getRealtimeLocations,
  (vehicleId, vehicles) => {
    if (vehicles) {
      return vehicles.find(location => location.vehicle_id === vehicleId);
    }

    return null;
  }
);
