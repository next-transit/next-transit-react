import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pageStateUpdated } from 'lib/actions/page';
import { routeDirectionStopsRequested } from 'lib/actions/stops';
import Direction from './direction';

class DirectionHandler extends Component {
  componentDidMount() {
    const { routeType, routeId } = this.props.routeParams;

    this.props.dispatch(pageStateUpdated({ back:`/${routeType}/${routeId}` }));

    if (this.props.route) {
      this.props.dispatch(pageStateUpdated({ title:this.props.route.route_name }));
    }
  }

  render() {
    let { routeType, routeId, directionId } = this.props.params;

    return (
      <Direction 
        route_type={routeType} 
        route_id={routeId}
        direction_id={directionId}
        stops={this.props.stops || []} 
      />
    );
  }
}

export default connect((state, params) => {
  let { routeId, directionId } = params.routeParams;
  let stops_key = `${routeId}-${directionId}`;

  return {
    route: state.routes.routes[routeId],
    stops: state.stops.stops[stops_key]
  };
})(DirectionHandler);