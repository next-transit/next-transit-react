function getBounds(bounds, coord) {
  bounds.w = Math.min(bounds.w, coord.w || coord[1]);
  bounds.s = Math.min(bounds.s, coord.s || coord[0]);
  bounds.e = Math.max(bounds.e, coord.e || coord[1]);
  bounds.n = Math.max(bounds.n, coord.n || coord[0]);

  return bounds;
}

export function getRouteBounds(routePaths) {
  return routePaths.reduce((bounds, path) => {
    const pathBounds = path.reduce(getBounds, bounds);

    return getBounds(bounds, pathBounds);
  }, { w:180, s:180, e:-180, n:-180 });
}

function getRoutePathsFeatures(route, routePaths) {
  return routePaths.map((path) => {
    // Reverse position of lat/long in arrays
    return path.map(coord => [coord[1], coord[0]])
  }).map((path) => {
    return {
      type: 'Feature',
      properties: {
        route_id: route.slug,
        route_path: route.path
      },
      geometry: {
        type: 'LineString',
        coordinates: path
      }
    };
  });
}

function getRouteStopsFeatures(routeStops) {
  return routeStops.map((stop) => {
    return {
      type: 'Feature',
      properties: {
        direction_id: stop.direction_id,
        stop_id: stop.stop_id
      },
      geometry: {
        type: 'Point',
        coordinates: [stop.stop_lon, stop.stop_lat]
      }
    }
  });
}

export function getVehiclesFeatures(vehicles) {
  const features = (vehicles || []).map((vehicle) => {
    return {
      type: 'Feature',
      properties: {
        vehicle_id: vehicle.vehicle_id
      },
      geometry: {
        type: 'Point',
        coordinates: [vehicle.lng, vehicle.lat]
      }
    };
  });

  return {
    type: 'FeatureCollection',
    features: features
  };
}

export function getRouteSource(route, routePaths, routeStops) {
  const pathFeatures = getRoutePathsFeatures(route, routePaths);
  const stopFeatures = getRouteStopsFeatures(routeStops);

  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: pathFeatures.concat(stopFeatures)
    }
  };
}

export function getVehiclesSource() {
  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  };
}

export function getPathsStyleDefinition(routeId, routeColor, isHighlighted = false) {
  return {
    id: `route-paths-${routeId}`,
    type: 'line',
    source: `route-vectors-${routeId}`,
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': (routeColor || '#a33'),
      'line-width': isHighlighted ? 6 : 5,
      'line-opacity': isHighlighted ? 0.95 : 0.50
    },
    filter: ['==', '$type', 'LineString']
  };
}

export function getStopsStyleDefinition(routeId, routeColor, minZoom) {
  return {
    id: `route-stops-${routeId}`,
    type: 'circle',
    source: `route-vectors-${routeId}`,
    paint: {
      'circle-radius': 5,
      'circle-color': '#fff',
      'circle-opacity': 0.65,
      'circle-stroke-width': 3,
      'circle-stroke-color': (routeColor || '#a33')
    },
    minzoom: minZoom,
    filter: ['==', '$type', 'Point']
  };
}

export function getVehiclesStyleDefinition() {
  return {
    id: 'vehicles',
    type: 'symbol',
    source: 'vehicles-data',
    layout: {
      'icon-image': 'bus-15'
    },
    filter: ['==', '$type', 'Point']
  };
}
