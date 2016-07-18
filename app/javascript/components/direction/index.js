import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pageStateUpdated } from 'lib/actions/page';
import { routeDirectionStopsRequested } from 'lib/actions/stops';
import View from 'components/shared/view';

class DirectionHandler extends Component {
  componentDidMount() {
    const { routeType, routeId } = this.props.routeParams;
    const { route, direction } = this.props;

    this.props.dispatch(pageStateUpdated({ back:`/${routeType}/${routeId}` }));

    if (route && direction) {
      this.props.dispatch(pageStateUpdated({
        title: `${route.route_short_name} - ${direction.direction_name}`
      }));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { route, direction } = nextProps;

    if ((!this.props.route || !this.props.direction) && route && direction) {
      this.props.dispatch(pageStateUpdated({ 
        title: `${route.route_short_name} - ${direction.direction_name}`
      }));
    }
  }

  getStopItems() {
    const { routeType, routeId, directionId } = this.props.routeParams;

    return this.props.stops && this.props.stops.map((stop) => {
      const path = `/${routeType}/${routeId}/${directionId}/${stop.stop_id}`;

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
      <View name="stops" nav_items={this.getStopItems()} />
    );
  }
}

export default connect((state, params) => {
  let { routeId, directionId } = params.routeParams;
  let stops_key = `${routeId}-${directionId}`;
  
  let directions = state.route_directions.directions[routeId];
  let direction;
  if (directionId && directions) {
    directionId = parseInt(directionId, 10);
    direction = directions[directionId];
  }

  return {
    route: state.routes.routes[routeId],
    direction,
    stops: state.stops.stops[stops_key]
  };
})(DirectionHandler);
