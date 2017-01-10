import {
  RESET_LEVELS,
  EDIT_DURATION,
  EDIT_BIG_BLIND,
  EDIT_SMALL_BLIND,
  REMOVE_LEVEL,
  ADD_LEVEL,
  ADD_BREAK,
  INCREMENT_CURRENT_LEVEL,
  DECREMENT_CURRENT_LEVEL
} from '../constants/ActionTypes';

// Get the level configuration
import { getLevelConfiguration } from '../config';

// Create an array with a certain length that can be iterated over.
// Just simply using Array(n) would produce an array that cannot be
// iterated over so this is a bit of a hack to make it work.
function arrayOfLength(n) {
  return Array.from(Array(n));
}

// Each level of play needs to have a number. This function
// adds that auto-incrementing number starting at 1.
function numberPlayLevels(levels) {
  let number = 0;

  return levels.map((level) => {

    if (level.type === 'play') {
      number += 1;

      return {
        ...level,
        number
      };
    }

    return level;
  });
}

// Create a level which will be added directly to the state.
function createLevel({ id, type }) {
  const {
    duration,
    firstBigBlind
  } = getLevelConfiguration();
  const level = {
    id,
    type,
    duration,
    current: false
  };

  if (level.type === 'play') {
    level.bigBlind = firstBigBlind * id;
    level.smallBlind = level.bigBlind / 2;
  }

  return level;
}

// Get the initial state of the levels using the config file. This also
// allows the user to reset the levels after changing the config.
function getInitialState() {
  const {
    numberOfLevels,
    breakEveryXLevels
  } = getLevelConfiguration();

  const levels = arrayOfLength(numberOfLevels).map((_, id) => {

    // Every few levels is a break
    if (id % breakEveryXLevels === 0) {
      return createLevel({ id, type: 'break' });
    }

    return createLevel({ id, type: 'play' });
  });

  return numberPlayLevels(levels);
}

function getCurrentLevel(state) {
  return state.reduce((memo, level) => {
    return level.current === true ? level.id : memo;
  }, 0);
}

export default function levels(state = getInitialState(), action) {
  const currentLevel = getCurrentLevel(state);

  switch (action.type) {
    case RESET_LEVELS:
      return getInitialState();

    case EDIT_DURATION:
      return state.map((level) =>
        level.id === action.id ?
          { ...level, duration: action.duration }:
          level
      );

    case EDIT_BIG_BLIND:
      return state.map((level) =>
        level.id === action.id ?
          { ...level, bigBlind: action.bigBlind }:
          level
      );

    case EDIT_SMALL_BLIND:
      return state.map((level) =>
        level.id === action.id ?
          { ...level, smallBlind: action.smallBlind }:
          level
      );

    case REMOVE_LEVEL:
      return state.filter((level) => {
        return level.id !== action.id;
      });

    case ADD_LEVEL:
      return [
        ...state,
        createLevel({ id: state.length, type: 'play' })
      ];

    case ADD_BREAK:
      return [
        ...state,
        createLevel({ id: state.length, type: 'break' })
      ];

    case INCREMENT_CURRENT_LEVEL:
      return state.map((level) => {
        return {
          ...level,
          current: (currentLevel + 1 === level.id) ? true : false
        }
      });

    case DECREMENT_CURRENT_LEVEL:
      return state.map((level) => {
        return {
          ...level,
          current: (currentLevel - 1 === level.id) ? true : false
        }
      });

    default:
      return state;
  }
}
