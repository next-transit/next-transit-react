import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getPageRouteDirection } from 'lib/selectors/directions';
import { getBackPath } from 'lib/selectors/page';
import { getPageStops, getPageFromStop } from 'lib/selectors/stops';

import View from 'components/shared/view';
import SimpleNav from 'components/shared/simple-nav';
import TripsHeader from 'components/shared/trips-header';

class DirectionHandler extends Component {
  getStopItems() {
    return this.props.stops && this.props.stops.map((stop) => {
      const path = `${this.props.backPath}/${stop.stop_id}`;

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
          back_path={this.props.backPath}
          from_stop={this.props.fromStop}
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
  return {
    backPath: getBackPath(state),
    direction: getPageRouteDirection(state),
    fromStop: getPageFromStop(state),
    page: state.page,
    stops: getPageStops(state)
  };
})(DirectionHandler);
