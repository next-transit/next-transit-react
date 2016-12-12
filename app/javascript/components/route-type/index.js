import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { page_state_updated } from 'lib/actions/page';
import View from 'components/shared/view';

class RouteTypeHandler extends Component {
  componentDidMount() {
    this.props.dispatch(page_state_updated({ back:'/' }));

    if (this.props.route_type) {
      this.props.dispatch(page_state_updated({ title:this.props.route_type.label }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.route_type && nextProps.route_type) {
      this.props.dispatch(page_state_updated({ title:nextProps.route_type.label }));
    }
  }

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
  let { routeType } = params.routeParams;

  return {
    route_type: state.route_types.route_types[routeType],
    routes: state.routes.route_type_routes[routeType]
  };
})(RouteTypeHandler);
