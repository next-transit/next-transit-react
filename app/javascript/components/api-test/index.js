import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pageStateUpdated } from 'lib/actions/page';
import { routeDirectionsRequested } from 'lib/actions/route-directions';
import { routeTypesRequested } from 'lib/actions/route-types';
import { routeRequested, routesRequested } from 'lib/actions/routes';
import { routeDirectionStopsRequested } from 'lib/actions/stops';
import { tripsRequested } from 'lib/actions/trips';

import {
  getPageRouteType,
  page_from_stop_selector,
  page_to_stop_selector
} from 'lib/selectors/page';
import { getPageRoute } from 'lib/selectors/routes';
import {
  getPageRouteDirections,
  getPageRouteDirectionsLoading,
  getPageRouteDirection
} from 'lib/selectors/directions';

function AgencyView(props) {
  return (<p>{props.data.agency_name}</p>);
}

function PageView(props) {
  const {
    route_type,
    route_id,
    direction_id,
    from_stop_id,
    to_stop_id
  } = props.data;

  const path_segments = [];
  if (route_type) { path_segments.push(route_type); }
  if (route_id) { path_segments.push(route_id); }
  if (typeof direction_id === 'number') { path_segments.push(direction_id); }
  if (from_stop_id) { path_segments.push(from_stop_id); }
  if (to_stop_id) { path_segments.push(to_stop_id); }

  return (<p>{path_segments.join('/')}</p>);
}

function RouteTypeView(props) {
  return (<p>{props.data.label}</p>);
}

function RouteView(props) {
  return (<p>{props.data.route_id} - {props.data.route_long_name}</p>);
}

function DirectionView(props) {
  return (<p>{props.data.direction_name}</p>);
}

function StopView(props) {
  return (<p>{props.data.stop_name}</p>)
}

function CountView(props) {
  return (<p>{props.data.length} {props.title}</p>);
}

class ApiTest extends Component {
  list_types = [
    { title:'Agency', loading_prop:'is_agency_loading', data_prop:'agency', view:AgencyView },
    { title:'Route Types', loading_prop:'route_types_loading', data_prop:'route_types' },
    { title:'Routes', loading_prop:'routes_loading', data_prop:'route_type_routes' },
    { title:'Directions', loading_prop:'route_directions_loading', data_prop:'route_directions' },
    { title:'Stops', loading_prop:'stops_loading', data_prop:'stops' },
    { title:'Trips', loading_prop:'trips_loading', data_prop:'trips' }
  ];

  page_types = [
    { title:'Page', loading:'route_types_loading', data_prop:'page', view:PageView },
    { title:'Page Route Type', 'loading_prop':'route_types_loading', data_prop:'page_route_type', view:RouteTypeView },
    { title:'Page Route', loading_prop:'route_loading', data_prop:'page_route', view:RouteView },
    { title:'Page Direction', loading_prop:'route_directions_loading', data_prop:'page_direction', view:DirectionView },
    { title:'Page From Stop', loading_prop:'stops_loading', data_prop:'page_from_stop', view:StopView },
    { title:'Page To Stop', loading_prop:'stops_loading', data_prop:'page_to_stop', view:StopView }
  ];

  componentWillReceiveProps(nextProps) {
    // Fetch Route Types
    if (!nextProps.route_types && !nextProps.route_types_loading) {
      this.props.dispatch(routeTypesRequested());
    }

    // Set page-level route type based on 0-th route_type in the collection
    if (!nextProps.page_route_type && nextProps.route_types) {
      this.props.dispatch(pageStateUpdated({
        routeType: nextProps.route_types[0].slug
      }));
    }

    // Fetch Routes for Route Type
    if (nextProps.page_route_type
      && !nextProps.route_type_routes
      && !nextProps.routes_loading
    ) {
      this.props.dispatch(routesRequested(nextProps.page_route_type.slug));
    }

    // Set page-level route based on 0-th route_id in the route_type_routes collection
    if (!nextProps.page_route && nextProps.route_type_routes) {
      this.props.dispatch(pageStateUpdated({
        routeId: nextProps.route_type_routes[0].route_id
      }));
    }

    // Fetch Directions for Route
    if (nextProps.page_route
      && !nextProps.route_directions
      && !nextProps.route_directions_loading
    ) {
      this.props.dispatch(routeDirectionsRequested(nextProps.page_route.route_id));
    }

    // Set page-level direction based on 0-th direction_id in the routes collection
    if (!nextProps.page_direction && nextProps.route_directions) {
      this.props.dispatch(pageStateUpdated({
        directionId: nextProps.route_directions[0].direction_id
      }));
    }

    // Fetch Stops for Route Direction
    if (nextProps.page_route
      && nextProps.page_direction
      && !nextProps.stops_loading
      && !nextProps.stops
    ) {
      this.props.dispatch(routeDirectionStopsRequested(nextProps.page_route.route_id, nextProps.page_direction.direction_id));
    }

    // Set page-level from stop based on 0-th stop_id in the stops collection
    if (!nextProps.page_from_stop && nextProps.stops) {
      this.props.dispatch(pageStateUpdated({
        fromStopId: nextProps.stops[0].stop_id
      }));
    }
    // Set page-level to stop based on 1-th stop_id in the stops collection
    if (!nextProps.page_to_stop && nextProps.stops) {
      this.props.dispatch(pageStateUpdated({
        toStopId: nextProps.stops[1].stop_id
      }));
    }

    if (nextProps.page_route
      && nextProps.page_direction
      && nextProps.page_from_stop
      && !nextProps.trips_loading
      && !nextProps.trips
    ) {
      this.props.dispatch(tripsRequested(
        nextProps.page_route.route_id,
        nextProps.page_direction.direction_id,
        nextProps.page_from_stop.stop_id
      ));
    }
  }

  getTypes(types) {
    return types.map(type => {
      const View = type.view || CountView;

      return (
        <li className="simple-nav-item api-test-item" key={type.title}>
          <h4>{type.title}</h4>
          {this.props[type.loading_prop] &&
            <p>Loading...</p>
          }
          {this.props[type.data_prop] &&
            <View data={this.props[type.data_prop]} title={type.title} />
          }
        </li>
      );
    });
  }

  render() {
    return (
      <div className="api-test">
        <div className="row">
          <div className="col-1-2">
            <ul className="simple-nav">
              {this.getTypes(this.list_types)}
            </ul>
          </div>

          <div className="col-1-2">
            <ul className="simple-nav">
              {this.getTypes(this.page_types)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  const {
    routeType: page_route_type,
    routeId: page_route_id
  } = state.page;

  const pageRoute = getPageRoute(state);
  const pageDirection = getPageRouteDirection(state);

  let stops_key = '';
  if (pageRoute && pageDirection) {
    stops_key = `${pageRoute.route_id}-${pageDirection.direction_id}`;
  }

  return {
    // Agency
    is_agency_loading: state.agencies.is_agency_loading,
    agency: state.agencies.agency,

    // Directions
    route_directions_loading: getPageRouteDirectionsLoading(state),
    route_directions: getPageRouteDirections(state),

    // Routes
    routes_loading: state.routes.routes_loading[page_route_type],
    route_type_routes: state.routes.route_type_routes[page_route_type],

    // Route Types
    route_types_loading: state.route_types.route_types_loading,
    route_types: state.route_types.route_types,

    // Stops,
    stops_loading: state.stops.stops_loading[stops_key],
    stops: state.stops.stops[stops_key],

    trips_loading: state.trips.loading,
    trips: state.trips.trips,

    page: state.page,
    page_route_type: getPageRouteType(state),
    page_route: pageRoute,
    page_direction: pageDirection,
    page_from_stop: page_from_stop_selector(state),
    page_to_stop: page_to_stop_selector(state)
  };
})(ApiTest);
