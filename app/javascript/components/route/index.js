import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getPageRouteDirections } from 'lib/selectors/directions';

import View from 'components/shared/view';

class RouteHandler extends Component {
  getDirectionItems() {
    const { routeType, routeId } = this.props.page;

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

export default connect((state) => {
  return {
    page: state.page,
    directions: getPageRouteDirections(state)
  };
})(RouteHandler);
