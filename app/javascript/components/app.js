import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { settingsRequested } from 'lib/actions/settings';
import { agencyRequested } from 'lib/actions/agencies';
import { page_route_type_updated } from 'lib/actions/page';
import { routeTypesRequested } from 'lib/actions/route-types';
import { routeRequested, routesRequested } from 'lib/actions/routes';
import { routeDirectionsRequested } from 'lib/actions/route-directions';
import { routeDirectionStopsRequested } from 'lib/actions/stops';
import { tripsRequested } from 'lib/actions/trips';

import Header from 'components/layout/header';
import Footer from 'components/layout/footer';

export default class Application extends Component {
  state = {
    show_map: null
  };

  componentWillMount() {
    this.props.dispatch(settingsRequested(document.getElementById('next-transit-env')));

    let { routeType, routeId, directionId, fromStopId, toStopId } = this.props.params;

    if (routeType) {
      this.props.dispatch(routeTypesRequested());
      this.props.dispatch(routesRequested(routeType));
    }

    if (routeId) {
      this.props.dispatch(routeRequested(routeId));
      this.props.dispatch(routeDirectionsRequested(routeId));
    }

    if (routeId && directionId) {
      this.props.dispatch(routeDirectionStopsRequested(routeId, directionId));
    }

    if (routeId && directionId && fromStopId) {
      this.props.dispatch(tripsRequested(routeId, directionId, fromStopId, toStopId));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings && !nextProps.agency && !nextProps.is_agency_loading) {
      this.props.dispatch(agencyRequested(nextProps.settings.agency));
    }

    let { routeType, routeId, directionId, fromStopId } = this.props.params;
    let nextRouteType = nextProps.params.routeType;
    let nextRouteId = nextProps.params.routeId;
    let nextDirectionId = nextProps.params.directionId;

    if (routeType !== nextRouteType) {
      this.props.dispatch(page_route_type_updated(nextRouteType));
    }

    if (nextRouteType
      && nextRouteType !== routeType
      && !nextProps.route_type
      && !nextProps.route_types_loading
      && !nextProps.route_types_error) 
    {
      this.props.dispatch(routeTypesRequested());
      this.props.dispatch(routesRequested(nextRouteType));
    }

    // If a route is present in the path, 
    // and we don't already have it, 
    // and it changed, fetch it
    if (nextRouteId 
      && nextRouteId !== routeId
      && !nextProps.route
      && !nextProps.route_loading
      && !nextProps.route_error) 
    {
      this.props.dispatch(routeRequested(nextRouteId));
      this.props.dispatch(routeDirectionsRequested(nextRouteId));
    }

    // If a route and direction is present
    // and we don't already have stops, get them
    if (nextDirectionId
      && nextDirectionId !== directionId
      && !nextProps.stops
      && !nextProps.stops_loading
      && !nextProps.stops_error)
    {
      this.props.dispatch(routeDirectionStopsRequested(nextRouteId, nextDirectionId));
    }
  }

  render() {
    let content_classes = classnames('content', {
      'hidden': !!this.state.show_map
    });

    return(
      <div className="container">
        {this.props.settings &&
          <Header title={this.props.page.title} back_path={this.props.page.back} />
        }
        <div className={content_classes}>
          <div className="content-panel">
            {this.props.children}
          </div>
        </div>
        <Footer active={this.props.page.footer} />
        {this.state.show_map &&
          <div className="map active">
            <div id="map-inner" className="dark map-inner"></div>
          </div>
        }
      </div>
    );
  }
}

export default connect((state, params) => {
  let { routeType, routeId, directionId } = params.params;
  let stops_key = `${routeId}-${directionId}`;

  let route_type;
  if (state.route_types.route_types) {
    route_type = state.route_types.route_types.find(type => {
      return type.route_type_id === routeType;
    });
  }

  return {
    agency: state.agencies.agency,
    is_agency_loading: state.agencies.is_agency_loading,

    page: state.page,
    settings: state.settings.settings,

    route_type: route_type,
    route_types_loading: state.route_types.route_types_loading,
    route_types_error: state.route_types.route_types_error,

    // route: state.routes.routes[routeId],
    // route_error: state.routes.route_errors[routeId],
    // route_loading: state.routes.route_loading[routeId],

    stops: state.stops.stops[stops_key],
    stops_loading: state.stops.stops_loading[stops_key],
    stops_error: state.stops.stops_errors[stops_key]
  };
})(Application);
