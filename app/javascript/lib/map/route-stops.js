export function getStopsDefinition(routeStops, routeColor) {
  const features = routeStops.map((stop) => {
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

  return {
    id: 'route-stops',
    type: 'circle',
    paint: {
      'circle-radius': 4,
      'circle-color': '#fff',
      'circle-opacity': 0.65,
      'circle-stroke-width': 3,
      'circle-stroke-color': routeColor
    },
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    }
  };
}
