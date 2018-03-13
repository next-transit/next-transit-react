import React, { Component, PropTypes } from 'react';

export default class MapRoutesList extends Component {
  static propTypes = {
    onHover: PropTypes.func,
    routes: PropTypes.array.isRequired
  };

  static defaultProps = {
    onHover: (routeId, isHovering) => {},
    routes: null
  };

  constructor(...args) {
    super(...args);

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(routeId) {
    this.props.onHover(routeId);
  }

  getRouteItems() {
    return this.props.routes.filter((route, i) => {
      return true;
    }).map((route) => {
      return (
        <li
          key={route.slug}
          onMouseOver={(event) => { return this.handleHover(route.slug); }}
          onMouseOut={(event) => { return this.handleHover(null); }}
        >
          <a href={route.path}>{route.label}</a>
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
