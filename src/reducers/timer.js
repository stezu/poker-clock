import {
  START_TIMER,
  PAUSE_TIMER,
  RESUME_TIMER
} from '../constants/ActionTypes';

const initialState = {
  paused: true,
  startTime: null,
  duration: null
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        startTime: action.now,
        duration: action.duration,
        paused: false
      };

    case PAUSE_TIMER:
      return {
        ...state,
        paused: true
      };

    case RESUME_TIMER:
      return {
        ...state,
        paused: false
      };

    default:
      return state;
  }
}
