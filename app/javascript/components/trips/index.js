import React, { Component } from 'react';
import { connect } from 'react-redux';

import { page_state_updated } from 'lib/actions/page';

import View from 'components/shared/view';
import TripsHeader from 'components/shared/trips-header';
import Trips from './trips';

class TripsHandler extends Component {
  componentDidMount() {
    const { routeType, routeId } = this.props.routeParams;
    const { route, direction } = this.props;

    this.props.dispatch(page_state_updated({ back:this.props.back_path }));
    
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

  render() {
    return (
      <View name="trips" inner_content={false}>
        <TripsHeader 
          back_path={this.props.back_path} 
          from_stop={this.props.from_stop}
        />
        {/*this.props.all_trips &&
          <div class="align-center">
            {{#all_trips_days}}
            <a href="?day={{val}}" class="btn{{#unless selected}} btn-secondary{{/unless}}">{{label}}</a>
            {{/all_trips_days}}
          </div>
        */}

        <div className="trips-subheader">
          <div className="trips-subheader-stop trips-subheader-from">Departs</div>
          <div className="trips-subheader-stop trips-subheader-to">Arrives</div>
        </div>

        <div className="content-inner">
          <Trips 
            show_realtime={this.props.route && this.props.route.has_realtime}
            trips={this.props.trips || []} 
          />
        </div>
      </View>
    );
  }
};

export default connect((state, params) => {
  let { 
    routeType, 
    routeId, 
    directionId, 
    fromStopId, 
    toStopId 
  } = params.routeParams;
  
  let directions = state.route_directions.directions[routeId];
  let direction;
  if (directionId && directions) {
    directionId = parseInt(directionId, 10);
    direction = directions[directionId];
  }

  let from_stop = state.stops.stops_by_id[fromStopId];
  let to_stop = state.stops.stops_by_id[toStopId];

  return {
    back_path: `/${routeType}/${routeId}/${directionId}`,
    route: state.routes.routes[routeId],
    direction,
    from_stop,
    to_stop,
    trips: state.trips.trips,
    all_trips: false
  };
})(TripsHandler);
