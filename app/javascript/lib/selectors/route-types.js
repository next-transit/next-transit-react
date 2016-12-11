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
