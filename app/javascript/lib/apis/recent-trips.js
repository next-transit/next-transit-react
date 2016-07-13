import cookie from 'cookie';

function getTrips(cookieName) {
  let cookies = cookie.parse(document.cookie);
  let trips = [];

  if (cookies[cookieName]) {
    let parsed_trips;

    try { parsed_trips = JSON.parse(cookies[cookieName].replace(/^j:/, '')); }
    catch (e) { }

    if (parsed_trips) {
      trips = parsed_trips;
    }
  }

  return trips;
}

function setTrips(cookieName, trips) {
  document.cookie = cookie.serialize(cookieName, JSON.stringify(trips), {
    httpOnly: true,
    maxAge: (60 * 60 * 24 * 365.4) // 1 year
  });
}

export function getRecentTrips(callback) {
  callback(getTrips('recent_trips'));
};

export function getSavedTrips(callback) {
  callback(getTrips('saved_trips'));
};

export function saveRecentTrip(recent_trip, callback) {
  let recent_trips = getTrips('recent_trips') || [];
  let saved_trips = getTrips('saved_trips') || [];
  
  // If this trip was already saved, remove it and re-add it to the 
  // beginning of the array
  let existing_saved_idx = saved_trips.findIndex((trip) => {
    return trip.key === recent_trip.key;
  });

  if (existing_saved_idx > -1) {
    saved_trips.splice(existing_saved_idx, 1);
  }

  saved_trips.unshift(recent_trip);

  setTrips('saved_trips', saved_trips);

  // Update Recent trip to be "saved"
  let existing_recent_idx = recent_trips.findIndex((trip) => {
    return trip.key === recent_trip.key;
  });

  if (existing_recent_idx > -1) {
    recent_trip.saved = true;
    recent_trips[existing_recent_idx] = recent_trip;
    setTrips('recent_trips', recent_trips);
  }

  callback(saved_trips, recent_trips);
};

export function deleteSavedTrip(key, callback) {
  let saved_trips = getTrips('saved_trips') || [],
      remove_idx = -1;

  saved_trips.forEach(function(saved_trip, idx) {
    if(saved_trip.key === key) {
      remove_idx = idx;
    }
  });

  if(remove_idx > -1) {
    saved_trips.splice(remove_idx, 1);
    setTrips('saved_trips', saved_trips);
  }

  callback(saved_trips);
};
