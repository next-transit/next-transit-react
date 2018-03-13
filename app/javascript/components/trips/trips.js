import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import View from 'components/shared/view';
import SimpleNav from 'components/shared/simple-nav';
import Timer from './timer';

export default class Trips extends Component {
  static propTypes = {
    tripsOffset: PropTypes.number,
    trips: PropTypes.array.isRequired,
    showRealtime: PropTypes.bool,
    vehicles: PropTypes.array,
    onRealtimeClick: PropTypes.func
  };

  static defaultProps = {
    tripsOffset: 0,
    showRealtime: false,
    vehicles: null,
    onRealtimeClick: (vehicleId) => {}
  };

  state = {
    relativeStopTimes: {}
  };

  constructor(...args) {
    super(...args);

    this.handleRealtimeClick = this.handleRealtimeClick.bind(this);

    this.timer = new Timer(this.onTimerUpdate.bind(this));
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  onTimerUpdate(relativeTimes) {
    const relativeStopTimes = {};

    relativeTimes.forEach((relativeTime) => {
      relativeStopTimes[relativeTime.tripId] = relativeTime;
    });

    this.setState({ relativeStopTimes });
  }

  updateTimer(trips) {
    const stops = trips.map((trip) => {
      const departureTime = trip.departure_datetime;
      const dateParts = departureTime.split(/[- :]/);
      const departureDate = new Date(
        dateParts[0],
        dateParts[1] - 1,
        dateParts[2],
        dateParts[3],
        dateParts[4],
        '00'
      );

      return {
        tripId: trip.trip_id,
        time: departureDate
      };
    });

    this.timer.setTrips(stops);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trips !== nextProps.trips && nextProps.trips) {
      this.updateTimer(nextProps.trips);
    }
  }

  getCoverageStyles(coverage) {
    return {
      marginLeft: `${coverage.left}px`,
      marginRight: `${coverage.right}px`
    };
  }

  getHasVehicle(blockId) {
    if (this.props.vehicles) {
      return !!this.props.vehicles.find((vehicle) => {
        return vehicle.block_id.toString() === blockId;
      });
    }

    return false;
  }

  getVehicle(trip) {
    return (this.props.vehicles || []).find(vehicle => vehicle.block_id.toString() === trip.block_id);
  }

  handleRealtimeClick(vehicle) {
    if (vehicle) {
      this.props.onRealtimeClick(vehicle.vehicle_id);
    }
  }

  getTripItems() {
    return this.props.trips.map((trip) => {
      const relativeStopTime = this.state.relativeStopTimes[trip.trip_id];
      const isGone = (relativeStopTime && relativeStopTime.isGone) || trip.gone;
      const fromNow = (relativeStopTime && relativeStopTime.fromNow) || '';
      const vehicle = this.getVehicle(trip);

      const classes = classnames('simple-nav-item trip', {
        'gone': isGone,
        'has-realtime': this.props.showRealtime,
        'has-vehicle': !!vehicle
      });

      return (
        <li key={`trip-${trip.trip_id}`} className={classes}>
          <div className="trip-stop trip-from">
            <i className="icon-time"></i> 
            <div className="trip-label">
              {trip.departure_time_formatted}
              {!this.props.all_trips && fromNow &&
                <span className="trip-from-now"> {fromNow}</span>
              }
            </div>
          </div>

          <div className="trip-stop trip-to">
            <div className="trip-label">
              &nbsp;{trip.arrival_time_formatted}
            </div>
            {this.props.showRealtime &&
              <i
                className="icon-map-marker"
                title="Vehicle location"
                onClick={event => this.handleRealtimeClick(vehicle)}
              ></i>
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
