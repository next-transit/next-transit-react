export function getUserLocationDefinition(userLocation) {
  return {
    id: 'user-location',
    type: 'symbol',
    layout: {
      'icon-image': 'marker-15',
      'icon-rotation-alignment': 'map',
      'icon-size': 2
    },
    source: {
      type: 'geojson',
      data: {
        type: 'Point',
        coordinates: userLocation
      }
    }
  };
};
