import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  clearRecentTripsRequested,
  recentTripsRequested, 
  recentTripSaveRequested,
  savedTripsRequested,
  savedTripDeleteRequested
} from 'lib/actions/recent-trips';

import Options from './options';

class OptionsHandler extends Component {
  constructor(...args) {
    super(...args);

    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleSavedTripDeleted = this.handleSavedTripDeleted.bind(this);
    this.handleRecentTripSaved = this.handleRecentTripSaved.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(recentTripsRequested());
    this.props.dispatch(savedTripsRequested());
  }

  handleClearClick() {
    this.props.dispatch(clearRecentTripsRequested());
  }

  handleSavedTripDeleted(key) {
    this.props.dispatch(savedTripDeleteRequested(key));
  }

  handleRecentTripSaved(recent_trip) {
    this.props.dispatch(recentTripSaveRequested(recent_trip));
  }

  render() {
    return (
      <Options 
        recent_trips={this.props.recentTrips} 
        saved_trips={this.props.savedTrips}
        onClearClick={this.handleClearClick}
        on_saved_trip_deleted={this.handleSavedTripDeleted}
        on_recent_trip_saved={this.handleRecentTripSaved}
      />
    );
  }
}

export default connect((state) => {
  return {
    agency: state.agencies.agency,
    recentTrips: state.recent_trips.recent_trips,
    savedTrips: state.recent_trips.saved_trips
  };
})(OptionsHandler);