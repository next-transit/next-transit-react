import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import { userLocationRequested } from 'lib/actions/map';
import {
  routeShapesRequested,
  boundingBoxShapesRequested
} from 'lib/actions/shapes';
import { getPageRoute } from 'lib/selectors/routes';

import Map from './map';
import MapRoutesList from './routes-list';

class MapHandler extends Component {
  static propTypes = {
    offset: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    mapStyle: PropTypes.string,
    accessToken: PropTypes.string
  };

  static defaultProps = {
    offset: 0,
    height: 0,
    width: 0,
    mapStyle: 'mapbox://styles/reedlauber/ciy7h1g0x000o2soycdi7z1fe',
    accessToken: 'pk.eyJ1IjoicmVlZGxhdWJlciIsImEiOiJsSGFVWGNvIn0.CG9YSrTrTMcGstdLAH2Nvw'
  };

  constructor(...args) {
    super(...args);

    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
  }

  state = {
    userLocation: null
  };

  componentWillMount() {
    if (this.props.routeId && this.props.routeId !== this.props.shapesRouteId) {
      this.props.dispatch(routeShapesRequested(this.props.routeId));
    }

    if (this.props.shouldLocate) {
      this.props.dispatch(userLocationRequested());
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

  handleMapMove(mapBounds) {
    if (this.props.shouldLocate) {
      this.props.dispatch(boundingBoxShapesRequested({
        w: mapBounds.getWest(),
        s: mapBounds.getSouth(),
        e: mapBounds.getEast(),
        n: mapBounds.getNorth()
      }));
    }
  }

  handleStopClick(directionId, stopId) {
    const { routeType, routeId } = this.props.page;

    browserHistory.push(`/${routeType}/${routeId}/${directionId}/${stopId}`);
  }

  sortRouteInfo(a, b) {
    if (a.route_short_name > b.route_short_name) {
      return 1;
    } else if (a.route_short_name < b.route_short_name) {
      return -1;
    }

    return 0;
  }

  render() {
    const routeColor = (this.props.route || {}).color;
    const routePaths = (this.props.shapes || {}).paths;
    const routeStops = (this.props.shapes || {}).stops;

    let routesInfo = this.props.shapes;

    if (routeColor && routePaths && routeStops) {
      routesInfo = [{
        id: this.props.routeId,
        color: routeColor,
        paths: routePaths,
        stops: routeStops
      }];
    }

    if (routesInfo) {
      routesInfo = routesInfo.sort(this.sortRouteInfo).map((routeInfo) => {
        return {
          id: routeInfo.route_id,
          label: routeInfo.route_short_name,
          color: routeInfo.route_color || routeInfo.color,
          paths: routeInfo.paths,
          stops: routeInfo.stops
        };
      });
    }

    const containerStyle = {
      top: this.props.offset || 0,
      width: this.props.width,
      height: this.props.height + (this.props.offset || 0)
    };

    return(
      <div className="map-container" style={containerStyle}>
        {this.props.userLocationLoading &&
          <div className="map-loading-overlay">
            <div className="map-loading">
              Getting location...
            </div>
          </div>
        }

        {this.props.height && this.props.width &&
          <Map
            agency={this.props.settingsAgency}
            offset={this.props.offset}
            height={this.props.height}
            width={this.props.width}
            mapStyle={this.props.mapStyle}
            accessToken={this.props.accessToken}
            userLocation={this.props.userLocation}
            routes={routesInfo}
            onStopClicked={this.handleStopClick}
            onMapMove={this.handleMapMove}
            fitToShapes={!!this.props.routeId}
          />
        }

        {routesInfo &&
          <MapRoutesList routes={routesInfo} />
        }
      </div>
    );
  }
}

export default connect((state, { params, route }) => {
  return {
    settingsAgency: state.settings.settings.agency,

    page: state.page,

    offset: state.page.contentOffset,
    height: state.page.contentHeight,
    width: state.page.contentWidth,

    routeId: params.routeId,
    route: getPageRoute(state),

    shapes: state.shapes.shapes,
    shapesRouteId: state.shapes.routeId,
    shapesLoading: state.shapes.loading,
    shapesError: state.shapes.error,

    shouldLocate: route.path === '/locate',
    userLocation: state.map.userLocation,
    userLocationLoading: state.map.userLocationLoading,
    userLocationError: state.map.userLocationError
  };
})(MapHandler);
