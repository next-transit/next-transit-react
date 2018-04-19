export function getLocation (callback) {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        callback(null, position);
      } else {
        callback(new Error('Could not get position.'));
      }
    }, callback);
  } else {
    callback(new Error('Location API not available.'));
  }
};
