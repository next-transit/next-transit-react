import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { page_state_updated } from 'lib/actions/page';
import { routeDirectionsRequested } from 'lib/actions/route-directions';
import View from 'components/shared/view';

class RouteHandler extends Component {
  componentDidMount() {
    this.props.dispatch(page_state_updated({ back:`/${this.props.routeParams.routeType}` }));

    if (this.props.route) {
      this.props.dispatch(page_state_updated({ title:this.props.route.route_short_name }));
    }

    if (!this.props.directions
      && !this.props.directions_loading
      && !this.props.directions_error) 
    {
      this.props.dispatch(routeDirectionsRequested(this.props.routeParams.routeId));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.route !== nextProps.route) {
      this.props.dispatch(page_state_updated({ title:nextProps.route.route_short_name }));
    }
  }

  getDirectionItems() {
    const { routeType, routeId } = this.props.routeParams;

    return this.props.directions && this.props.directions.map((direction, i) => {
      return (
        <li key={`direction-${i}`}>
          <Link to={`/${routeType}/${routeId}/${direction.direction_id}`}>
            <strong>{direction.direction_name}</strong>
            <span>to {direction.direction_long_name}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <View name="directions" nav_items={this.getDirectionItems()} />
    );
  }
}

export default connect((state, params) => {
  let { routeId } = params.routeParams;

  return {
    route: state.routes.routes[routeId],
    directions: state.route_directions.directions[routeId],
    directions_loading: state.route_directions.loading[routeId],
    directions_error: state.route_directions.errors[routeId]
  };
})(RouteHandler);