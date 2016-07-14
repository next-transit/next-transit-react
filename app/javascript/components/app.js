import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { settingsRequested } from 'lib/actions/settings';
import { agencyRequested } from 'lib/actions/agencies';
import { routeTypesRequested } from 'lib/actions/route-types';
import { routeRequested, routesRequested } from 'lib/actions/routes';
import { routeDirectionsRequested } from 'lib/actions/route-directions';

import Header from 'components/layout/header';
import Footer from 'components/layout/footer';

export default class Application extends Component {
  state = {
    show_map: null
  };

  componentWillMount() {
    this.props.dispatch(settingsRequested(document.getElementById('next-transit-env')));

    let { routeType, routeId } = this.props.params;

    if (routeType && !this.props.route_type) {
      this.props.dispatch(routeTypesRequested());
      this.props.dispatch(routesRequested(routeType));
    }

    if (routeId && !this.props.route) {
      this.props.dispatch(routeRequested(routeId));
      this.props.dispatch(routeDirectionsRequested(routeId));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings && !nextProps.agency && !nextProps.isAgencyLoading) {
      this.props.dispatch(agencyRequested(nextProps.settings.agency));
    }

    let { routeType, routeId } = this.props.params;
    let nextRouteType = nextProps.params.routeType;
    let nextRouteId = nextProps.params.routeId;

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
  let { routeType, routeId } = params.params;

  return {
    agency: state.agencies.agency,
    isAgencyLoading: state.agencies.isAgencyLoading,

    page: state.page,
    settings: state.settings.settings,

    route_type: state.route_types.route_types[routeType],
    route_types_loading: state.route_types.route_types_loading,
    route_types_error: state.route_types.route_types_error,

    route: state.routes.routes[routeId],
    route_error: state.routes.route_errors[routeId],
    route_loading: state.routes.route_loading[routeId]
  };
})(Application);
