import React, { Component, PropTypes } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import { getUserLocationDefinition } from 'lib/map/locate';
import {
  getPathsStyleDefinition,
  getRouteBounds,
  getRouteSource,
  getVehiclesFeatures,
  getVehiclesSource,
  getVehiclesStyleDefinition,
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

const STOPS_MIN_ZOOM = 12;

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
    highlightedRoute: PropTypes.string,

    vehicles: PropTypes.array,
    selectedVehicle: PropTypes.object,

    onRouteClicked: PropTypes.func,
    onStopClicked: PropTypes.func,
    onVehicleClicked: PropTypes.func,
    onMapMove: PropTypes.func
  };

  static defaultProps = {
    offset: 0,
    height: 450,
    width: 960,
    userLocation: null,
    fitToShapes: false,
    routes: null,
    highlightedRoute: null,
    vehicles: null,
    selectedVehicle: null,
    onRouteClicked: (routeId) => {},
    onStopClicked: (stopId) => {},
    onVehicleClicked: (vehicleId) => {},
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
        this._map.addSource('vehicles-data', getVehiclesSource([]));
        this._map.addLayer(getVehiclesStyleDefinition());
        this.renderRoutes(this.props.routes);
      }

      if (this.props.userLocation) {
        this.renderUserLocation(this.props.userLocation);
      }

      if (this.props.selectedVehicle) {
        this.renderVehicleLocation(this.props.selectedVehicle);
      }

      this.setState({ mapLoaded:true });
    });

    this._map.on('moveend', (e) => {
      this.props.onMapMove(this._map.getBounds());
    });

    this._map.on('click', (e) => {
      if (this.props.routes && this._map.getZoom() > STOPS_MIN_ZOOM) {
        const routeFeatures = this._map.queryRenderedFeatures(e.point, { filter:['has', 'route_id'] });
        const stopFeatures = this._map.queryRenderedFeatures(e.point, { filter:['has', 'stop_id'] });
        const vehicleFeatures = this._map.queryRenderedFeatures(e.point, { filter:['has', 'vehicle_id'] });

        if (vehicleFeatures) {
          return this.props.onVehicleClicked(vehicleFeatures[0].properties.vehicle_id);
        }

        if (stopFeatures.length) {
          return this.props.onStopClicked(
            stopFeatures[0].properties.direction_id,
            stopFeatures[0].properties.stop_id
          );
        }

        if (routeFeatures.length) {
          return this.props.onRouteClicked(routeFeatures[0].properties.route_path);
        }
      }
    });
    
    this._map.on('mousemove', (e) => {
      const routeFeatures = this._map.queryRenderedFeatures(e.point, { filter:['has', 'route_id'] });
      const stopFeatures = this._map.queryRenderedFeatures(e.point, { filter:['has', 'stop_id'] });
      const vehicleFeatures = this._map.queryRenderedFeatures(e.point, { filter:['has', 'vehicle_id'] });

      this._map.getCanvas().style.cursor = routeFeatures.length || stopFeatures.length || vehicleFeatures.length
        ? 'pointer'
        : '';
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mapLoaded) {
      if (this.props.routes !== nextProps.routes && nextProps.routes) {
        this.renderRoutes(nextProps.routes);
      } else if (this.props.highlightedRoute !== nextProps.highlightedRoute) {
        this.setHighlightedRoute(this.props.highlightedRoute, false);
        this.setHighlightedRoute(nextProps.highlightedRoute, true);
      }

      if (!this.props.userLocation && nextProps.userLocation) {
        this.renderUserLocation(nextProps.userLocation);
      }

      if (this.props.selectedVehicle !== nextProps.selectedVehicle && nextProps.selectedVehicle) {
        this.renderVehicleLocation(nextProps.selectedVehicle);
      }
    }
  }

  setHighlightedRoute(routeId, isHighlighted = false) {
    if (routeId) {
      const route = this.props.routes.find((rt) => {
        return rt.slug === routeId;
      });

      if (route) {
        this.addPathsLayer(route, isHighlighted);
      }
    }
  }

  addPathsLayer(route, isHighlighted = false) {
    this._map.removeLayer(`route-paths-${route.slug}`);

    this._map.addLayer(
      getPathsStyleDefinition(route.slug, route.color, isHighlighted)
    );
  }

  renderRoutes(routes) {
    this.state.renderedRouteIds.forEach((routeId) => {
      this._map.removeLayer(`route-paths-${routeId}`);
      this._map.removeLayer(`route-stops-${routeId}`);
      this._map.removeSource(`route-vectors-${routeId}`);
    });

    const vehiclesSource = this._map.getSource('vehicles-data');

    if (vehiclesSource) {
      vehiclesSource.setData(getVehiclesFeatures(this.props.vehicles));
    }

    routes.forEach((route) => {
      const isHighlighted = route.slug === this.props.highlightedRoute;

      // Add "source" for all route data
      this._map.addSource(
        `route-vectors-${route.slug}`,
        getRouteSource(route, route.paths, route.stops)
      );

      // Add route paths layer
      this._map.addLayer(
        getPathsStyleDefinition(route.slug, route.color, isHighlighted)
      );

      // Add route stops layer
      this._map.addLayer(
        getStopsStyleDefinition(route.slug, route.color, STOPS_MIN_ZOOM)
      );
    });

    this.setState({
      renderedRouteIds: routes.map(route => route.slug)
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

    this._map.flyTo(
      { center:userLocation, zoom:16 },
      { locate:true }
    );
  }

  renderVehicleLocation() {
    const { lat, lng } = this.props.selectedVehicle;
    const vehicleLocation = [lng, lat];
    this._map.flyTo({ center:vehicleLocation, zoom:16 }, { locate:true });
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
