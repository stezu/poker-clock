import {
  RESET_LEVELS,
  EDIT_DURATION,
  EDIT_BIG_BLIND,
  EDIT_SMALL_BLIND,
  EDIT_POSITION,
  REMOVE_LEVEL,
  ADD_LEVEL,
  ADD_BREAK
} from '../constants/actionTypes';
import { arrayOfLength, createReducer } from '../modules';
import { arrayMove } from 'react-sortable-hoc';

// Get the level configuration
import { getLevelConfiguration } from '../config';

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
function createLevel(id, type) {
  const {
    duration,
    firstBigBlind
  } = getLevelConfiguration();
  const level = {
    id,
    type,
    duration
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

  const levels = arrayOfLength(numberOfLevels).map((id) => {

    // Every few levels is a break
    if (id % breakEveryXLevels === 0) {
      return createLevel(id, 'break');
    }

    return createLevel(id, 'play');
  });

  return numberPlayLevels(levels);
}

export default createReducer(getInitialState(), {

  [RESET_LEVELS]() {
    return getInitialState();
  },

  [EDIT_DURATION](state, action) {
    return state.map((level) => {

      if (level.id === action.id) {
        return {
          ...level,
          duration: action.duration
        };
      }

      return level;
    });
  },

  [EDIT_BIG_BLIND](state, action) {
    return state.map((level) => {

      if (level.id === action.id) {
        return {
          ...level,
          bigBlind: action.bigBlind
        };
      }

      return level;
    });
  },

  [EDIT_SMALL_BLIND](state, action) {
    return state.map((level) => {

      if (level.id === action.id) {
        return {
          ...level,
          smallBlind: action.smallBlind
        };
      }

      return level;
    });
  },

  [EDIT_POSITION](state, action) {
    return numberPlayLevels(arrayMove(state, action.oldIndex, action.newIndex));
  },

  [REMOVE_LEVEL](state, action) {
    return state.filter((level) => level.id !== action.id);
  },

  [ADD_LEVEL](state) {
    return [
      ...state,
      createLevel(state.length, 'play')
    ];
  },

  [ADD_BREAK](state) {
    return [
      ...state,
      createLevel(state.length, 'break')
    ];
  }
});
