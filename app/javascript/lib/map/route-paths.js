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

export function getLayerDefinition(routePaths, routeColor) {
  // Reverse position of lat/long in arrays
  const reorderedPaths = routePaths.map((path) => {
    return path.map(coord => [coord[1], coord[0]])
  });

  return {
    id: 'route-paths',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': routeColor,
      'line-width': 5,
      'line-opacity': 0.65
    },
    source: {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'MultiLineString',
          'coordinates': reorderedPaths
        }
      }
    }
  };
}
