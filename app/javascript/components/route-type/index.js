import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routesRequested } from 'lib/actions/route-types';

import { Link } from 'react-router';

class RouteTypeHandler extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.props.dispatch(routesRequested(this.props.routeParams.routeType));
  }

  getRouteItems() {
    return this.props.routes.map((route) => {
      return (
        <li key={`route-${route.slug}`}>
          <Link to={`/${route.route_type_slug}/${route.slug}`}>
            <strong className={`${route.route_type_slug} ${route.slug}`}>
              {route.route_short_name}
            </strong>
            <span>{route.route_long_name}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="routes">
        <nav className="quicknav"></nav>
        <div className="content-inner">
          <nav className="simple-nav">
            <ul>
              {this.getRouteItems()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    agency: state.agencies.agency,
    routes: state.route_types.routes
  };
})(RouteTypeHandler);