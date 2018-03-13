function getTrips(cookieName) {
  const tripsJSON = window.localStorage.getItem(cookieName);

  if (tripsJSON) {
    try { return JSON.parse(tripsJSON); }
    catch(error) {
      window.console && console.error(error);
    }
  }

  return null;
}

function setTrips(cookieName, trips) {
  window.localStorage.setItem(cookieName, JSON.stringify(trips));
}

export function getRecentTrips(callback) {
  callback(getTrips('recent_trips'));
};

export function getSavedTrips(callback) {
  callback(getTrips('saved_trips'));
};

export function addRecentTrip(recentTrip, callback) {
  const recentTrips = getTrips('recent_trips') || [];

  // Remove existing, if present
  const existingIdx = recentTrips.find(trip => trip.key === recentTrip.key);

  if (existingIdx > -1) {
    recentTrips.splice(existingIdx, 1);
  }

  // Add to the top
  recentTrips.unshift(recentTrip);

  // Trim to 5 items
  if (recentTrips.length > 5) {
    recentTrips.splice(5);
  }

  setTrips('recent_trips', recentTrips);

  callback(getTrips('recent_trips'));
};

export function saveRecentTrip(recentTrip, callback) {
  const recentTrips = getTrips('recent_trips') || [];
  const savedTrips = getTrips('saved_trips') || [];
  
  // If this trip was already saved, remove it and re-add it to the 
  // beginning of the array
  const existingSavedIdx = savedTrips.findIndex(trip => trip.key === recentTrip.key);

  if (existingSavedIdx > -1) {
    savedTrips.splice(existingSavedIdx, 1);
  }

  savedTrips.unshift(recentTrip);

  setTrips('saved_trips', savedTrips);

  // Update Recent trip to be "saved"
  const existingRecentIdx = recentTrips.findIndex(trip => trip.key === recentTrip.key);

  if (existingRecentIdx > -1) {
    recentTrip.saved = true;
    recentTrips[existingRecentIdx] = recentTrip;
    setTrips('recent_trips', recentTrips);
  }

  callback(recentTrips, savedTrips);
};

export function deleteSavedTrip(key, callback) {
  const savedTrips = getTrips('saved_trips') || [];
  const recentTrips = getTrips('recent_trips') || [];

  const removeIdx = savedTrips.findIndex(trip => trip.key === key);
  const recentTripIdx = recentTrips.findIndex(trip => trip.key === key);

  if(removeIdx > -1) {
    savedTrips.splice(removeIdx, 1);
    setTrips('saved_trips', savedTrips);
  }

  if(recentTripIdx > -1) {
    recentTrips[recentTripIdx].saved = false;
    setTrips('recent_trips', recentTrips)
  }

  callback(recentTrips, savedTrips);
};

export function clearRecentTrips(callback) {
  setTrips('recent_trips', []);
  callback([]);
}
