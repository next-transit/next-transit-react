function actionsObject(action_names) {
  let obj = {};

  action_names.forEach((name) => {
    obj[name] = name.toLowerCase();
  });

  return obj;
}


export default {
  agencies: actionsObject([
    'AGENCIES_REQUESTED',
    'AGENCIES_RECEIVED',
    'AGENCIES_FAILED',
    
    'AGENCY_REQUESTED',
    'AGENCY_RECEIVED',
    'AGENCY_FAILED'
  ]),

  map: actionsObject([
    'USER_LOCATION_REQUESTED',
    'USER_LOCATION_RECEIVED',
    'USER_LOCATION_REQUEST_FAILED'
  ]),

  page: actionsObject([
    'PAGE_STATE_RECEIVED'
  ]),

  realtime: actionsObject([
    'LOCATIONS_REQUESTED',
    'LOCATIONS_RECEIVED',
    'LOCATIONS_REQUEST_FAILED',
    'LOCATIONS_CLEARED'
  ]),

  recent_trips: actionsObject([
    'CLEAR_RECENT_TRIPS_REQUESTED',
    'NEW_RECENT_TRIP_REQUESTED',
    'NEW_RECENT_TRIP_RECEIVED',
    'RECENT_TRIPS_REQUESTED',
    'RECENT_TRIPS_RECEIVED',
    'RECENT_TRIP_SAVE_REQUESTED',
    'SAVED_TRIPS_REQUESTED',
    'SAVED_TRIPS_RECEIVED',
    'SAVED_TRIP_RECEIVED',
    'SAVED_TRIP_DELETE_REQUESTED'
  ]),

  routes: actionsObject([
    'ROUTE_REQUESTED',
    'ROUTE_RECEIVED',
    'ROUTE_FAILED',

    'ROUTES_REQUESTED',
    'ROUTES_RECEIVED',
    'ROUTES_FAILED'
  ]),

  route_directions: actionsObject([
    'ROUTE_DIRECTIONS_REQUESTED',
    'ROUTE_DIRECTIONS_RECEIVED',
    'ROUTE_DIRECTIONS_FAILED'
  ]),

  route_types: actionsObject([
    'ROUTE_TYPES_REQUESTED',
    'ROUTE_TYPES_RECEIVED',
    'ROUTE_TYPES_FAILED'
  ]),

  search: actionsObject([
    'SEARCH_REQUESTED',
    'SEARCH_RECEIVED',
    'SEARCH_FAILED'
  ]),

  settings: actionsObject([
    'SETTINGS_REQUESTED',
    'SETTINGS_RECEIVED'
  ]),

  shapes: actionsObject([
    'ROUTE_SHAPES_REQUESTED',
    'ROUTE_SHAPES_RECEIVED',
    'ROUTE_SHAPES_FAILED',

    'BOUNDING_BOX_SHAPES_REQUESTED',
    'BOUNDING_BOX_SHAPES_RECEIVED',
    'BOUNDING_BOX_SHAPES_FAILED'
  ]),

  stops: actionsObject([
    'ROUTE_DIRECTION_STOPS_REQUESTED',
    'ROUTE_DIRECTION_STOPS_RECEIVED',
    'ROUTE_DIRECTION_STOPS_FAILED'
  ]),

  trips: actionsObject([
    'TRIPS_REQUESTED',
    'TRIPS_RECEIVED',
    'TRIPS_FAILED'
  ])
};
