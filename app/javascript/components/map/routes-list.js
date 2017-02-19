import React, { Component, PropTypes } from 'react';

export default class MapRoutesList extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  static defaultProps = {
    routes: null
  };

  getRouteItems() {
    return this.props.routes.map((route) => {
      return (
        <li key={route.id}>
          <a href="/">{route.label}</a>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="map-results-list">
        <ul>
          {this.getRouteItems()}
        </ul>
      </div>
    );
  }
};
