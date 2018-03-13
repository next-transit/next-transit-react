import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

export default class TripsHeader extends Component {
  static propTypes = {
    back_path: PropTypes.string,
    back_path_reversed: PropTypes.string,
    from_stop: PropTypes.object,
    to_stop: PropTypes.object,
    allow_choose: PropTypes.bool
  };

  static defaultProps = {
    back_path: null,
    from_stop: null,
    to_stop: null,
    allow_choose: true
  };

  render() {
    if (!this.props.from_stop) {
      return <span />;
    }

    return (
      <div className="content-inner trips-header">
        <span className="trips-header-from-stop">
          <Link to={this.props.back_path}>
            <i className="icon-map-marker"></i>{' '}
            <span>{this.props.from_stop.stop_name}</span>
          </Link>
        </span>

        {this.props.from_stop && this.props.to_stop &&
          <span className="trips-header-reverse">
            <Link to={`/${this.props.back_path_reversed}/${this.props.to_stop.stop_id}/${this.props.from_stop.stop_id}`}>
              <i className="icon-exchange"></i>
            </Link>
          </span>
        }

        <span className="trips-header-to-stop">
          {this.props.to_stop &&
            <Link to={`${this.props.back_path}/${this.props.from_stop.stop_id}/choose`}>
              <span>{this.props.to_stop.stop_name}</span>{' '}
              <i className="icon-map-marker"></i>
            </Link>
          }
          {!this.props.to_stop && this.props.allow_choose && 
            <Link to={`${this.props.back_path}/${this.props.from_stop.stop_id}/choose`}>
              Choose Destination
            </Link>
          }
        </span>
      </div> 
    );
  }
}
