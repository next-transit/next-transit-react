import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Direction extends Component {
  static propTypes = {
    route_type:     PropTypes.string.isRequired,
    route_id:       PropTypes.string.isRequired,
    direction_id:   PropTypes.string.isRequired,
    stops:          PropTypes.array.isRequired
  };

  static defaultProps = {};

  getStopItems() {
    return this.props.stops.map((stop) => {
      let { route_type, route_id, direction_id } = this.props;
      let path = `/${route_type}/${route_id}/${direction_id}/${stop.stop_id}`;

      return (
        <li key={`stop-${stop.stop_id}`}>
          <Link to={path}>
            <i className="icon-map-marker"></i>{' '}
            <span>{stop.stop_name}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="stop">
        <div className="content-inner content-section">
          <nav className="simple-nav">
            <ul>
              {this.getStopItems()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};
