import { createSelector } from 'reselect';

const route_type_routes_data = state => state.routes.route_type_routes;

const route_type_routes = createSelector(
  route_type_routes_data,
  (route_type_routes) => {
    // return route_type_routes.find((route) => {
    //   return route.
    // });
  }
);