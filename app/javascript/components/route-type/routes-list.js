import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class RoutesList extends Component {
  static propTypes = {
    routes: PropTypes.array
  };

  static defaultProps = {
    routes: []
  };

  getRouteItems() {
    return this.props.routes.map((route) => {
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
};
