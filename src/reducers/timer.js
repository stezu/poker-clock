import {
  RESET_TIMER,
  START_TIMER,
  PAUSE_TIMER,
  RESUME_TIMER
} from '../constants/ActionTypes';

const initialState = {
  startTime: null,
  duration: null,
  elapsedTime: 0,
  paused: true,
  started: false
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case RESET_TIMER:
      return initialState;

    case START_TIMER:
      return {
        ...state,
        startTime: action.now,
        duration: action.duration,
        elapsedTime: 0,
        paused: false,
        started: true
      };

    case PAUSE_TIMER:
      return {
        ...state,
        elapsedTime: action.now - state.startTime,
        paused: true
      };

    case RESUME_TIMER:
      return {
        ...state,
        startTime: action.now - state.elapsedTime,
        paused: false
      };

    default:
      return state;
  }
}
