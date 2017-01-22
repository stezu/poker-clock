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
export function padSection(num) {
  const str = `${num || 0}`;

  if (str.length >= 2) {
    return str;
  }

  return `00${str}`.slice(-2);
}

// Get the remaining time in minutes and seconds
export function getRemainingTime({ start, duration, now }) {
  const result = {
    m: 0,
    s: 0,
    total: 0
  };

  if (duration) {
    const delta = new Duration(duration - (now - start));

    // Get the value in minutes, this can theoretically be more than 60.
    result.m = delta.minutes();

    // Get the entire value in milliseconds, then remove the extracted whole minutes, then
    // divide by 1000 to get seconds and then round the value to get an integer.
    result.s = Math.floor((delta.valueOf() - (result.m * 60 * 1000)) / 1000);

    // The total time in seconds, when this reaches 0, we have finished the level.
    result.total = delta.seconds();
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
