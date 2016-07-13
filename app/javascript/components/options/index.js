import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { 
  recentTripsRequested, 
  recentTripSaveRequested,
  savedTripsRequested,
  savedTripDeleteRequested
} from 'lib/actions/recent-trips';

import Options from './options';

class OptionsHandler extends Component {
  constructor(...args) {
    super(...args);
    this.handle_saved_trip_deleted = this.handle_saved_trip_deleted.bind(this);
    this.handle_recent_trip_saved = this.handle_recent_trip_saved.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(recentTripsRequested());
    this.props.dispatch(savedTripsRequested());
  }

  handle_saved_trip_deleted(key) {
    this.props.dispatch(savedTripDeleteRequested(key));
  }

  handle_recent_trip_saved(recent_trip) {
    this.props.dispatch(recentTripSaveRequested(recent_trip));
  }

  render() {
    return (
      <Options 
        recent_trips={this.props.recent_trips} 
        saved_trips={this.props.saved_trips}
        on_saved_trip_deleted={this.handle_saved_trip_deleted}
        on_recent_trip_saved={this.handle_recent_trip_saved}
      />
    );
  }
}

export default connect((state) => {
  return {
    agency: state.agencies.agency,
    recent_trips: state.recent_trips.recent_trips,
    saved_trips: state.recent_trips.saved_trips
  };
})(OptionsHandler);