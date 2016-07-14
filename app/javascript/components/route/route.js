import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Route extends Component {
  static propTypes = {
    route_type: PropTypes.string.isRequired,
    route_id: PropTypes.string.isRequired,
    directions: PropTypes.array
  };

  static defaultProps = {
    directions: []
  };

  getDirectionItems() {
    return this.props.directions.map((direction, i) => {
      return (
        <li key={`direction-${i}`}>
          <Link to={`/${this.props.route_type}/${this.props.route_id}/${direction.direction_id}`}>
            <strong>{direction.direction_name}</strong>
            <span>to {direction.direction_long_name}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="directions">
        <div className="content-inner content-section">
          <nav className="simple-nav">
            <ul>
              {this.getDirectionItems()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};
