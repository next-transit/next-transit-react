import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import { userLocationRequested } from 'lib/actions/map';
import { requestLocations } from 'lib/actions/realtime';

import { getShapeRouteInfos, getVehicles, getVehicleById } from 'lib/selectors/map';
import {
  routeShapesRequested,
  boundingBoxShapesRequested
} from 'lib/actions/shapes';
import { getPageRoute } from 'lib/selectors/routes';

import Map from './map';
import MapRoutesList from './routes-list';

class MapContainer extends Component {
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

    this.handleRouteListHover = this.handleRouteListHover.bind(this);
    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleRouteClick = this.handleRouteClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleVehicleClick = this.handleVehicleClick.bind(this);
  }

  state = {
    highlightedRoute: null,
    trackVehicles: false,
    userLocation: null
  };

  componentWillMount() {
    if (this.props.routeId && this.props.routeId !== this.props.shapesRouteId) {
      this.props.dispatch(routeShapesRequested(this.props.routeId));
    }

    if (this.props.shouldLocate) {
      this.props.dispatch(userLocationRequested());
    }

    if (this.props.route) {
      this.setState({ trackVehicles:true });
    }
  }

  componentWillUnmount() {
    if (this.vehiclesInterval) {
      clearInterval(this.vehiclesInterval);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.trackVehicles && this.state.trackVehicles) {
      this.requestVehicles();

      clearInterval(this.vehiclesInterval);
      this.vehiclesInterval = setInterval(() => {
        this.requestVehicles();
      }, 25 * 1000);
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.routeId
      && !nextProps.shapes
      && !nextProps.shapesLoading
      && !nextProps.shapesError
    ) {
      this.props.dispatch(routeShapesRequested(nextProps.routeId));
    }

    if (!this.props.route && nextProps.route && !nextState.trackVehicles) {
      this.setState({ trackVehicles:true });
    }
  }

  requestVehicles() {
    this.props.dispatch(requestLocations(
      this.props.route.route_type_slug,
      this.props.route.slug
    ));
  }

  handleRouteListHover(routeId) {
    this.setState({ highlightedRoute:routeId });
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

  handleRouteClick(routePath) {
    if (routePath) {
      browserHistory.push(routePath);
    }
  }

  handleStopClick(directionId, stopId) {
    const { routeType, routeId } = this.props.page;

    browserHistory.push(`/${routeType}/${routeId}/${directionId}/${stopId}`);
  }

  handleVehicleClick(vehicleId) {
    const { routeType, routeId } = this.props.page;

    browserHistory.push(`/${routeType}/${routeId}/map?vehicle=${vehicleId}`);
  }

  render() {
    const containerStyle = {
      top: this.props.offset || 0,
      width: this.props.width,
      height: this.props.height// + (this.props.offset || 0)
    };
    console.log('selectedVehicle', this.props.selectedVehicle);

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
            routes={this.props.routeInfos}
            highlightedRoute={this.state.highlightedRoute}
            onRouteClicked={this.handleRouteClick}
            onStopClicked={this.handleStopClick}
            onVehicleClicked={this.handleVehicleClick}
            onMapMove={this.handleMapMove}
            fitToShapes={!!this.props.routeId}
            vehicles={this.props.vehicles}
            selectedVehicle={this.props.selectedVehicle}
          />
        }

        {this.props.routeInfos &&
          <MapRoutesList
            onHover={this.handleRouteListHover}
            routes={this.props.routeInfos}
          />
        }
      </div>
    );
  }
}

export default connect((state, { params, route, location }) => {
  return {
    settingsAgency: state.settings.settings.agency,

    page: state.page,

    offset: state.page.contentOffset,
    height: state.page.contentHeight,
    width: state.page.contentWidth,

    routeId: params.routeId,
    route: getPageRoute(state),

    routeInfos: getShapeRouteInfos(state),

    shapes: state.shapes.shapes,
    shapesRouteId: state.shapes.routeId,
    shapesLoading: state.shapes.loading,
    shapesError: state.shapes.error,

    shouldLocate: route.path === '/locate',
    userLocation: state.map.userLocation,
    userLocationLoading: state.map.userLocationLoading,
    userLocationError: state.map.userLocationError,

    vehicleId: location.query.vehicle,
    vehicles: getVehicles(state),
    selectedVehicle: getVehicleById(state, location.query.vehicle)
  };
})(MapContainer);
