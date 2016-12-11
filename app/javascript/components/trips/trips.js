import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import View from 'components/shared/view';
import SimpleNav from 'components/shared/simple-nav';

export default class Trips extends Component {
  static propTypes = {
    trips: PropTypes.array.isRequired,
    show_realtime: PropTypes.bool
  };

  static defaultProps = {
    show_realtime: false
  };

  getCoverageStyles(coverage) {
    return {
      marginLeft: `${coverage.left}px`,
      marginRight: `${coverage.right}px`
    };
  }

  getTripItems() {
    return this.props.trips && this.props.trips.map((trip) => {
      let classes = classnames('simple-nav-item trip', {
        'show-gone': trip.gone,
        'has-realtime': this.props.show_realtime
      });

      return (
        <li key={`trip-${trip.trip_id}`} className={classes}>
          <div className="trip-stop trip-from">
            <i className="icon-time"></i> 
            <div className="trip-label">
              {trip.departure_time_formatted}
              {!this.props.all_trips &&
                <span className="trip-from-now"> ({trip.from_now})</span>
              }
            </div>
          </div>

          <div className="trip-stop trip-to">
            <div className="trip-label">
              {trip.arrival_time_formatted}
            </div>
            {this.props.show_realtime &&
              <i className="icon-map-marker" title="Vehicle location"></i>
            }
          </div>
          {!trip.coverage.full &&
            <div className="trip-coverage">
              <div className="trip-coverage-active" style={this.getCoverageStyles(trip.coverage)}></div>
            </div>
          }
        </li>
      );
    });
  }

  render() {
    return (
      <SimpleNav>
        {this.getTripItems()}
      </SimpleNav>
    );
  }
};
