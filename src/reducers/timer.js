import {
  RESET_TIMER,
  START_TIMER,
  PAUSE_TIMER,
  RESUME_TIMER
} from '../constants/ActionTypes';
import { createReducer } from '../modules';

const initialState = {
  startTime: null,
  duration: null,
  elapsedTime: 0,
  paused: true,
  started: false
};

export default createReducer(initialState, {

  [RESET_TIMER]() {
    return initialState;
  },

  [START_TIMER](state, action) {
    return {
      ...state,
      startTime: action.now,
      duration: action.duration,
      elapsedTime: 0,
      paused: false,
      started: true
    };
  },

  [PAUSE_TIMER](state, action) {
    return {
      ...state,
      elapsedTime: action.now - state.startTime,
      paused: true
    };
  },

  [RESUME_TIMER](state, action) {
    return {
      ...state,
      startTime: action.now - state.elapsedTime,
      paused: false
    };
  }
});
