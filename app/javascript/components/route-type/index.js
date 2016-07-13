import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pageStateUpdated } from 'lib/actions/page';
import { 
  routeTypesRequested, 
  routesRequested 
} from 'lib/actions/route-types';

import { Link } from 'react-router';

class RouteTypeHandler extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.props.dispatch(pageStateUpdated({ back:'/' }));
    this.props.dispatch(routesRequested(this.props.routeParams.routeType));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.route_types 
      && !nextProps.route_types_loading 
      && !nextProps.route_types_error) 
    {
      this.props.dispatch(routeTypesRequested());
    }

    if (!this.props.route_types 
      && nextProps.route_types 
      && nextProps.route_types[this.props.routeParams.routeType]) 
    {
      let route_type = nextProps.route_types[this.props.routeParams.routeType];
      this.props.dispatch(pageStateUpdated({ title:route_type.label }));
    }
  }

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
}

export default connect((state, params) => {
  return {
    agency: state.agencies.agency,

    route_types: state.route_types.route_types,
    route_types_loading: state.route_types.route_types_loading,
    route_types_error: state.route_types.route_types_error,
    
    routes: state.route_types.routes,
  };
})(RouteTypeHandler);
