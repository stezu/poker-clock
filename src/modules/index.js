import Duration from 'duration-js';

// Get the previous, current and next levels
export function getLevelsForDisplay(levels, currentLevel) {

  return {
    previous: levels[currentLevel - 1],
    current: levels[currentLevel],
    next: levels[currentLevel + 1]
  };
}

// Given a number, return a string that has at least 2 characters
function padSection(num) {
  const str = `${num || 0}`;

  if (str.length >= 2) {
    return str;
  }

  return `00${str}`.slice(-2);
}

export function formatTime(timeInSeconds) {
  const time = new Duration(timeInSeconds * 1000);

  // Get the value in minutes, this can theoretically be more than 60.
  const minutes = time.minutes();

  // Get the entire value in milliseconds, then remove the extracted whole minutes, then
  // divide by 1000 to get seconds and then round the value to get an integer.
  const seconds = Math.floor((time.valueOf() - (minutes * 60 * 1000)) / 1000);

  return `${padSection(minutes)}:${padSection(seconds)}`;
}

// Get the remaining time in minutes and seconds
export function getRemainingTime({ start, duration, now }) {
  let result = 0;

  if (duration) {
    const delta = new Duration((duration * 1000) - (now - start));

    // The total time in seconds, when this reaches 0, we have finished the level.
    result = delta.seconds();
  }

  return result;
}

// Create an array with a certain length that can be iterated over.
// Just simply using Array(n) would produce an array that cannot be
// iterated over so this is a bit of a hack to make it work.
export function arrayOfLength(n) {
  const result = Array(n);
  let index = 0;

  while (index < n) {
    result[index] = index + 1;

    index += 1;
  }

  return result;
}

// Given an initial state and an object of handlers, create any arbitrary reducer
export function createReducer(initialState, handlers) {

  return function reducer(state = initialState, action) {

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

// Ensure we always return a string representation of a given blind
export function getBlindString(val = null) {

  if (val === null) {
    return '-';
  }

  return val.toString();
}
