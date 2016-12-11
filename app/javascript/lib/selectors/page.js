import { createSelector } from 'reselect';

export const page_route_type_selector = createSelector(
  state => state.route_types.route_types,
  state => state.page.route_type,
  (route_types, page_route_type) => {
    if (route_types && page_route_type) {
      return route_types.find(route_type => {
        return route_type.slug === page_route_type;
      });
    }
  }
);

export const page_route_selector = createSelector(
  state => state.routes.route_type_routes,
  state => state.page.route_type,
  state => state.page.route_id,
  (route_type_routes, route_type, route_id) => {
    if (route_type_routes && route_type && route_id) {
      const routes = route_type_routes[route_type];

      if (routes) {
        return routes.find(route => {
          return route.route_id = route_id;
        });
      }
    }
  }
);

export const page_direction_selector = createSelector(
  state => state.route_directions.route_directions,
  state => state.page.route_id,
  state => state.page.direction_id,
  (route_directions, route_id, direction_id) => {
    if (route_directions && route_id && typeof direction_id === 'number') {
      const directions = route_directions[route_id];

      if (directions) {
        return directions.find(direction => {
          return direction.direction_id === direction_id;
        });
      }
    }
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
