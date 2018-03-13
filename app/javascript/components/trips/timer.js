const INTERVAL_TIME = 10 * 1000; // 10 seconds
const TIME_INTERVALS = [
  { label:'week', limit:604800 },
  { label:'day', limit:86400 },
  { label:'hr', limit:3600 },
  { label:'min', limit:60 }
];

function getRelativeTime(diff, trip) {
  if (diff < 0) {
    return '(GONE)';
  }

  if (diff < 60) {
    return '(< 1m)';
  }

  let label = '';
  let timeValue = 0;

  TIME_INTERVALS.forEach((interval) => {
    if (diff > interval.limit) {
      timeValue = Math.floor(diff / interval.limit);

      if (label) {
        label += ' ';
      }

      label += `${timeValue}${interval.label[0]}`;

      diff = diff % interval.limit;
    }
  });

  return `(${label})`;
}

function getRelativeTimes(trips) {
  const now = new Date();

  return trips.map((trip) => {
    const diff = (trip.time - now) / 1000;

    return {
      tripId: trip.tripId,
      fromNow: getRelativeTime(diff, trip),
      isGone: diff < 0
    };
  });
}

export default class Timer {
  timerInterval = null;
  currentTrips = [];
  onUpdate = () => {}

  constructor(onUpdate) {
    this.onUpdate = onUpdate;
  }

  setTrips(trips) {
    this.currentTrips = trips;
    this.start();
  }

  stop() {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  start() {
    this.stop();

    this.onUpdate(getRelativeTimes(this.currentTrips));

    this.timerInterval = window.setInterval(() => {
      this.onUpdate(getRelativeTimes(this.currentTrips));
    }, INTERVAL_TIME);
  }
}
