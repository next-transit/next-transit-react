import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPageRoute } from 'lib/selectors/routes';
import { getPageFromStop } from 'lib/selectors/stops';

import View from 'components/shared/view';
import TripsHeader from 'components/shared/trips-header';
import Trips from './trips';

class TripsHandler extends Component {
  render() {
    return (
      <View name="trips" inner_content={false}>
        <TripsHeader 
          back_path={this.props.backPath} 
          from_stop={this.props.fromStop}
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

export default connect((state) => {
  const backPath = `/${state.page.routeType}/${state.page.routeId}/${state.page.directionId}`;

  return {
    backPath: backPath,
    route: getPageRoute(state),
    fromStop: getPageFromStop(state),
    trips: state.trips.trips,
    all_trips: false
  };
})(TripsHandler);
