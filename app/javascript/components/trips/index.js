import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { clearLocations, requestLocations } from 'lib/actions/realtime';
import { newRecentTripRequested } from 'lib/actions/recent-trips';

import { getPageRouteDirection } from 'lib/selectors/directions';
import { getPageRoute } from 'lib/selectors/routes';
import { getPageRouteType } from 'lib/selectors/route-types';
import { getPageFromStop, getPageToStop } from 'lib/selectors/stops';

import View from 'components/shared/view';
import TripsHeader from 'components/shared/trips-header';
import Trips from './trips';
import Paging from './paging';

class TripsHandler extends Component {
  constructor(...args) {
    super(...args);

    this.handleRealtimeClick = this.handleRealtimeClick.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(clearLocations());
    this.requestVehicles(this.props);

    if (this.props.fromStop) {
      this.addRecentTripInfo(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.requestVehicles(nextProps);

    // Store this trip as a "recent trip"
    if (this.props.route
      && !nextProps.isSavingRecentTrip
      && nextProps.fromStop
      && (this.props.fromStop !== nextProps.fromStop || this.props.toStop !== nextProps.toStop)
    ) {
      this.addRecentTripInfo(nextProps);
    }
  }

  requestVehicles(props) {
    const { route, trips, vehicles, isLocationsLoading, locationsRequestError } = props;

    if (route
      && route.has_realtime
      && trips
      && !vehicles
      && !isLocationsLoading
      && !locationsRequestError
    ) {
      props.dispatch(requestLocations(
        props.route.route_type_slug,
        props.route.slug
      ));
    }
  }

  addRecentTripInfo(props) {
    const { currentPath, direction, fromStop, route, routeType, toStop } = props;

    const tripKey = currentPath.substr(1).replace(/\//g, '-');

    this.props.dispatch(newRecentTripRequested({
      key: tripKey,
      path: currentPath,
      slug: route.slug,
      route_type: routeType.slug,
      route_name: route.route_name,
      direction_name: direction.direction_name,
      from_stop_name: fromStop.stop_name,
      to_stop_name: toStop ? toStop.stop_name : null
    }));
  }

  handleRealtimeClick(vehicleId) {
    const { route } = this.props;

    browserHistory.push(`/${route.route_type_slug}/${route.slug}/map?vehicle=${vehicleId}`);
  }

  render() {
    return (
      <View name="trips" innerContent={false}>
        <TripsHeader 
          back_path={this.props.backPath} 
          from_stop={this.props.fromStop}
          to_stop={this.props.toStop}
        />

        <div className="trips-subheader">
          <div className="trips-subheader-stop trips-subheader-from">Departs</div>
          <div className="trips-subheader-stop trips-subheader-to">Arrives</div>
        </div>

        <div className="content-inner">
          <Trips
            tripsOffset={this.props.tripsOffset}
            showRealtime={this.props.route && this.props.route.has_realtime}
            vehicles={this.props.vehicles}
            trips={this.props.trips || []}
            onRealtimeClick={this.handleRealtimeClick}
          />
        </div>
        
        <Paging
          currentPath={this.props.currentPath}
          currentOffset={this.props.currentOffset}
        />
      </View>
    );
  }
};

export default connect((state, { location }) => {
  const tripsOffset = parseInt(location.query.offset, 10) || 0;
  const backPath = `/${state.page.routeType}/${state.page.routeId}/${state.page.directionId}`;

  let currentOffset = location.query.offset;

  if (currentOffset) {
    currentOffset = parseInt(currentOffset, 10) || 0;
  }

  return {
    backPath: backPath,
    currentPath: location.pathname,
    currentOffset,
    direction: getPageRouteDirection(state),
    route: getPageRoute(state),
    routeType: getPageRouteType(state),
    fromStop: getPageFromStop(state),
    isSavingRecentTrip: state.recent_trips.isSavingRecentTrip,
    toStop: getPageToStop(state),
    trips: state.trips.trips,
    tripsOffset,
    all_trips: false,
    isLocationsLoading: state.realtime.isLocationsLoading,
    locationsRequestError: state.realtime.locationsRequestError,
    vehicles: state.realtime.locations
  };
})(TripsHandler);
