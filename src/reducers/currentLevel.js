import {
  INCREMENT_CURRENT_LEVEL,
  DECREMENT_CURRENT_LEVEL
} from '@/constants/actionTypes';
import { createReducer } from '@/modules';

const initialState = 0;

const currentLevelReducer = createReducer(initialState, {

  [INCREMENT_CURRENT_LEVEL](state) {
    return state + 1;
  },

  [DECREMENT_CURRENT_LEVEL](state) {
    return state - 1;
  }
});

export default currentLevelReducer;
