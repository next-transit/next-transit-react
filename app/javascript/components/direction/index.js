import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { page_state_updated } from 'lib/actions/page';
import { routeDirectionStopsRequested } from 'lib/actions/stops';

import View from 'components/shared/view';
import SimpleNav from 'components/shared/simple-nav';
import TripsHeader from 'components/shared/trips-header';

class DirectionHandler extends Component {
  componentDidMount() {
    const { routeType, routeId } = this.props.routeParams;
    const { route, direction } = this.props;

    this.props.dispatch(page_state_updated({ back:`/${routeType}/${routeId}` }));

    if (route && direction) {
      this.props.dispatch(page_state_updated({
        title: `${route.route_short_name} - ${direction.direction_name}`
      }));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { route, direction } = nextProps;

    if ((!this.props.route || !this.props.direction) && route && direction) {
      this.props.dispatch(page_state_updated({ 
        title: `${route.route_short_name} - ${direction.direction_name}`
      }));
    }
  }

  getStopItems() {
    const { routeType, routeId, directionId } = this.props.routeParams;

    return this.props.stops && this.props.stops.map((stop) => {
      const path = `${this.props.back_path}/${stop.stop_id}`;

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
      <View name="stops" inner_content={false}>
        <TripsHeader 
          back_path={this.props.back_path} 
          from_stop={this.props.from_stop}
          allow_choose={false}
        />
        <div className="content-inner">
          <SimpleNav>
            {this.getStopItems()}
          </SimpleNav>
        </div>
      </View>
    );
  }
}

export default connect((state, params) => {
  let { routeType, routeId, directionId, fromStopId } = params.routeParams;
  let stops_key = `${routeId}-${directionId}`;
  
  let directions = state.route_directions.directions[routeId];
  let direction;
  if (directionId && directions) {
    directionId = parseInt(directionId, 10);
    direction = directions[directionId];
  }

  let from_stop = state.stops.stops_by_id[fromStopId];
  let back_path = `/${routeType}/${routeId}/${directionId}`;

  if (from_stop) {
    back_path += `/${from_stop.stop_id}`;
  }

  return {
    back_path,
    direction,
    from_stop,
    route: state.routes.routes[routeId],
    stops: state.stops.stops[stops_key]
  };
})(DirectionHandler);
