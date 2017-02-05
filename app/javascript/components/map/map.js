import React, { Component, PropTypes } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

import { getRouteBounds, getLayerDefinition } from 'lib/map/route-paths';
import { getStopsDefinition } from 'lib/map/route-stops';

const CENTERS = {
  septa: {
    lat:  39.9523350,
    lng: -75.163789,
    zoom: 16
  }, 
  trimet: {
    lat:  45.5197293,
    lng: -122.673683,
    zoom: 15
  }
};

export default class Map extends Component {
  static propTypes = {
    offset: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    mapStyle: PropTypes.string.isRequired,
    routeColor: PropTypes.string,
    routePaths: PropTypes.array,
    routeStops: PropTypes.array,
    onStopClicked: PropTypes.func
  };

  static defaultProps = {
    offset: 0,
    height: 450,
    width: 960,
    routeColor: '#a33',
    routePaths: null,
    routePaths: null,
    onStopClicked: (stopId) => {}
  };

  constructor(...args) {
    super(...args);

    mapboxgl.accessToken = 'pk.eyJ1IjoicmVlZGxhdWJlciIsImEiOiJsSGFVWGNvIn0.CG9YSrTrTMcGstdLAH2Nvw';
  }

  componentDidMount() {
    const agency = CENTERS.trimet;

    this._map = new mapboxgl.Map({
      container: this.refs.mapboxMap,
      center: [agency.lng, agency.lat],
      zoom: agency.zoom,
      // maxZoom: this.props.maxZoom,
      // pitch: this.props.pitch,
      // bearing: this.props.bearing,
      style: this.props.mapStyle,
      interactive: true,
      // preserveDrawingBuffer: this.props.preserveDrawingBuffer
      // TODO?
      // attributionControl: this.props.attributionControl
    });

    this._map.on('load', () => {
      if (this.props.routePaths) {
        this.renderRoutePaths(this.props.routePaths);
      }

      if (this.props.routeStops) {
        this.renderRouteStops(this.props.routeStops);
      }
    });

    this._map.on('click', (e) => {
      const features = this._map.queryRenderedFeatures(e.point, { layers:['route-stops'] });

      if (features.length) {
        this.props.onStopClicked(
          features[0].properties.direction_id,
          features[0].properties.stop_id
        );
      }
    });
    
    this._map.on('mousemove', (e) => {
      const features = this._map.queryRenderedFeatures(e.point, { layers:['route-stops'] });
      this._map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this._map && this._map.loaded()) {
      if (!this.props.routePaths && nextProps.routePaths) {
        this.renderRoutePaths(nextProps.routePaths);
      }

      if (!this.props.routeStops && nextProps.routeStops) {
        this.renderRouteStops(nextProps.routeStops);
      }
    }
  }

  renderRoutePaths(routePaths) {
    this._routeLayer = this._map.addLayer(getLayerDefinition(routePaths, this.props.routeColor));
    
    const bounds = getRouteBounds(routePaths);
    this._map.fitBounds(new mapboxgl.LngLatBounds(
      new mapboxgl.LngLat(bounds.w, bounds.s),
      new mapboxgl.LngLat(bounds.e, bounds.n)
    ), { padding: 16 });
  }

  renderRouteStops(routeStops) {
    this._stopsLayer = this._map.addLayer(getStopsDefinition(routeStops, this.props.routeColor));
  }

  render() {
    const style = {
      top: this.props.offset,
      width: this.props.width,
      height: this.props.height
    };

    return(
      <div id="map" className="map" ref="mapboxMap" style={style} />
    );
  }
}
