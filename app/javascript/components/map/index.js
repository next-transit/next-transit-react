import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import { routeShapesRequested } from 'lib/actions/shapes';
import { getPageRoute } from 'lib/selectors/routes';

import Map from './map';

class MapHandler extends Component {
  static propTypes = {
    offset: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    mapStyle: PropTypes.string
  };

  static defaultProps = {
    offset: 0,
    height: 400,
    width: 960,
    mapStyle: 'mapbox://styles/reedlauber/ciy7h1g0x000o2soycdi7z1fe'
  };

  constructor(...args) {
    super(...args);

    this.handleStopClick = this.handleStopClick.bind(this);
  }

  componentWillMount() {
    if (this.props.routeId && this.props.routeId !== this.props.shapesRouteId) {
      this.props.dispatch(routeShapesRequested(this.props.routeId));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.routeId
      && !nextProps.shapes
      && !nextProps.shapesLoading
      && !nextProps.shapesError
    ) {
      this.props.dispatch(routeShapesRequested(nextProps.routeId));
    }
  }

  handleStopClick(directionId, stopId) {
    const { routeType, routeId } = this.props.page;

    browserHistory.push(`/${routeType}/${routeId}/${directionId}/${stopId}`);
  }

  render() {
    const routeColor = (this.props.route || {}).color;
    const routePaths = (this.props.shapes || {}).paths;
    const routeStops = (this.props.shapes || {}).stops;

    return(
      <div className="map-container">
        {this.props.height && this.props.width &&
          <Map
            offset={this.props.offset}
            height={this.props.height}
            width={this.props.width}
            mapStyle={this.props.mapStyle}
            routeColor={routeColor}
            routePaths={routePaths}
            routeStops={routeStops}
            onStopClicked={this.handleStopClick}
          />
        }
      </div>
    );
  }
}

export default connect((state, { params }) => {
  return {
    page: state.page,

    offset: state.page.contentOffset,
    height: state.page.contentHeight,
    width: state.page.contentWidth,

    routeId: params.routeId,
    route: getPageRoute(state),

    shapes: state.shapes.shapes,
    shapesRouteId: state.shapes.routeId,
    shapesLoading: state.shapes.loading,
    shapesError: state.shapes.error
  };
})(MapHandler);
