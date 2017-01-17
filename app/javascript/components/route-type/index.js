import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getPageRouteType } from 'lib/selectors/route-types';
import { getPageRoutes } from 'lib/selectors/routes';

import View from 'components/shared/view';

class RouteTypeHandler extends Component {
  getRouteItems() {
    return this.props.routes && this.props.routes.map((route) => {
      return (
        <li key={`route-${route.route_id}`}>
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
      <View name="routes" nav_items={this.getRouteItems()} />
    );
  }
}

export default connect((state, params) => {
  return {
    routeType: getPageRouteType(state),
    routes: getPageRoutes(state)
  };
})(RouteTypeHandler);
