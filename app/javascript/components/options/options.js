import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import Section from './section';

export default class Options extends Component {
  constructor(...args) {
    super(...args);
    this.handle_save_trip = this.handle_save_trip.bind(this);
    this.handle_delete_trip = this.handle_delete_trip.bind(this);
  }

  static propTypes = {
    recent_trips: PropTypes.array,
    saved_trips: PropTypes.array,
    on_saved_trip_deleted: PropTypes.func,
    on_recent_trip_saved: PropTypes.func
  };

  static defaultProps = {
    recent_trips: [],
    saved_trips: [],
    on_saved_trip_deleted: function(key) {},
    on_recent_trip_saved: function(recent_trip) {}
  };

  handle_delete_trip(event) {
    let key = event.target.getAttribute('data-key');
    this.props.on_saved_trip_deleted(key);
  }

  handle_save_trip(event) {
    let key = event.target.getAttribute('data-key');
    let trip = this.props.recent_trips.find((trip) => { 
      return trip.key === key;
    });

    if (trip) {
      this.props.on_recent_trip_saved(trip);
    }
  }

  get_saved_trip_button(trip) {
    return (
      <button 
        type="button" 
        className="btn btn-small btn-danger btn-right"
        onClick={this.handle_delete_trip}
        data-key={trip.key}
      >Delete</button>
    );
  }

  get_recent_trip_button(trip) {
    let btn_classes = classnames('btn btn-small btn-right', {
      'disabled': trip.saved,
      'btn-add': !trip.saved
    });
    let btn_text = trip.saved ? 'Saved' : 'Save';
    let clickHandler = trip.saved
                        ? this.handle_delete_trip
                        : this.handle_save_trip;

    return (
      <button 
        type="button" 
        className={btn_classes} 
        disabled={trip.saved} 
        data-key={trip.key}
        onClick={clickHandler}
      >{btn_text}</button>
    );
  }

  getTrips(trips, saved) {
    return trips.map((trip) => {
      let title = `${trip.direction_name} ${trip.from_stop_name} to ${trip.to_stop_name}`;
      let button = saved 
                    ? this.get_saved_trip_button(trip) 
                    : this.get_recent_trip_button(trip);

      return (
        <li key={trip.key}>
          <Link to={trip.path} className="options-trip">
            <strong className={`${trip.route_type} ${trip.slug}`}>
              {trip.route_name}
            </strong>
            <span className="options-trip-stops" title={title}>
              {trip.from_stop_name} &rarr; {trip.to_stop_name}
              <span className="options-trip-direction">{trip.direction_name}</span>
            </span>
          </Link>
          {button}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="options">
        <Section title="Saved Trips">
          <div className="content-inner">
            <nav className="simple-nav">
              <ul>
                {this.getTrips(this.props.saved_trips, true)}
                {!this.props.saved_trips.length &&
                  <li className="simple-nav-item">No saved trips yet.</li>
                }
              </ul>
            </nav>
          </div>
        </Section>

        {!!this.props.recent_trips.length &&
          <Section title="Recent Trips" show_clear>
            <div className="content-inner">
              <nav className="simple-nav">
                <ul>
                  {this.getTrips(this.props.recent_trips)}
                </ul>
              </nav>
            </div>
          </Section>
        }

        <Section inset>
          <nav className="simple-nav">
            <ul>
              <li>
                <Link to="/about">
                  About{' '}<i className="btn-right icon-angle-right"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </Section>
      </div>
    );
  }
}
