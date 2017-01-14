import {
  INCREMENT_CURRENT_LEVEL,
  DECREMENT_CURRENT_LEVEL
} from '../constants/ActionTypes';

const initialState = 0;

export default function currentLevel(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_CURRENT_LEVEL:
      return state + 1;

    case DECREMENT_CURRENT_LEVEL:
      return state - 1;

    default:
      return state;
  }
}
