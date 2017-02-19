import React, { Component, PropTypes } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import { getUserLocationDefinition } from 'lib/map/locate';
import {
  getRouteBounds,
  getRouteSource,
  getPathsStyleDefinition,
  getStopsStyleDefinition
} from 'lib/map/route-paths';

const CENTERS = {
  septa: {
    lat:  39.9523350,
    lng: -75.163789,
    zoom: 14
  }, 
  trimet: {
    lat:  45.5197293,
    lng: -122.673683,
    zoom: 15
  }
};

const STOPS_MAX_ZOOM = 14;

export default class Map extends Component {
  static propTypes = {
    agency: PropTypes.string.isRequired,

    offset: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,

    accessToken: PropTypes.string.isRequired,
    mapStyle: PropTypes.string.isRequired,

    userLocation: PropTypes.array,
    
    fitToShapes: PropTypes.bool,
    routes: PropTypes.array, // [{ color, paths, stops }]

    onStopClicked: PropTypes.func,
    onMapMove: PropTypes.func
  };

  static defaultProps = {
    offset: 0,
    height: 450,
    width: 960,
    userLocation: null,
    fitToShapes: false,
    routes: null,
    onStopClicked: (stopId) => {},
    onMapMove: (bounds) => {}
  };

  state = {
    mapLoaded: false,
    renderedRouteIds: []
  };

  componentDidMount() {
    const agencyCenter = CENTERS[this.props.agency] || {};

    mapboxgl.accessToken = this.props.accessToken;

    this._map = new mapboxgl.Map({
      container: this.refs.mapboxMap,
      center: [agencyCenter.lng, agencyCenter.lat],
      zoom: agencyCenter.zoom,
      // maxZoom: 10,
      // pitch: this.props.pitch,
      // bearing: this.props.bearing,
      style: this.props.mapStyle,
      interactive: true,
      // preserveDrawingBuffer: this.props.preserveDrawingBuffer
      // TODO?
      // attributionControl: this.props.attributionControl
    });

    this._map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    this._map.on('load', () => {
      if (this.props.routes) {
        this.renderRoutes(this.props.routes);
      }

      this.setState({ mapLoaded:true });
    });

    this._map.on('moveend', (e) => {
      this.props.onMapMove(this._map.getBounds());
    });

    this._map.on('click', (e) => {
      if (this.props.routes && this._map.getZoom() > STOPS_MAX_ZOOM) {
        const features = this._map.queryRenderedFeatures(e.point, { filter:['has', 'stop_id'] });

        if (features.length) {
          this.props.onStopClicked(
            features[0].properties.direction_id,
            features[0].properties.stop_id
          );
        }
      }
    });
    
    this._map.on('mousemove', (e) => {
      if (this.props.routes && this._map.getZoom() > STOPS_MAX_ZOOM) {
        const features = this._map.queryRenderedFeatures(e.point, { filter:['has', 'stop_id'] });

        this._map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mapLoaded) {
      if (this.props.routes !== nextProps.routes && nextProps.routes) {
        this.renderRoutes(nextProps.routes);
      }

      if (!this.props.userLocation && nextProps.userLocation) {
        this.renderUserLocation(nextProps.userLocation);
        this._map.flyTo(
          { center:nextProps.userLocation, zoom:16 },
          { locate:true }
        );
      }
    }
  }

  renderRoutes(routes) {
    this.state.renderedRouteIds.forEach((routeId) => {
      this._map.removeSource(`route-vectors-${routeId}`);
      this._map.removeLayer(`route-paths-${routeId}`);
      this._map.removeLayer(`route-stops-${routeId}`);
    });

    routes.forEach((route) => {
      // Add "source" for all route data
      this._routeSource = this._map.addSource(
        `route-vectors-${route.id}`,
        getRouteSource(route.paths, route.stops)
      );

      // Add route paths layer
      this._pathsLayer = this._map.addLayer(
        getPathsStyleDefinition(route.id, route.color)
      );

      // Add route stops layer
      this._stopsLayer = this._map.addLayer(
        getStopsStyleDefinition(route.id, route.color)
      );
    });

    this.setState({
      renderedRouteIds: routes.map(route => route.id)
    });
    
    // Fit map to route paths boundary
    if (this.props.fitToShapes) {
      const bounds = getRouteBounds(routes[0].paths);
      this._map.fitBounds(new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(bounds.w, bounds.s),
        new mapboxgl.LngLat(bounds.e, bounds.n)
      ), { padding: 16 });
    }
  }

  renderUserLocation(userLocation) {
    this._locationLayer = this._map.addLayer(
      getUserLocationDefinition(userLocation)
    );
  }

  render() {
    const style = {
      width: this.props.width,
      height: this.props.height
    };

    return(
      <div id="map" className="map" ref="mapboxMap" style={style} />
    );
  }
}
