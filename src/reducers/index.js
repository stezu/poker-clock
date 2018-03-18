import { combineReducers } from 'redux';

import timer from './timer';
import levels from './levels';
import currentLevel from './currentLevel';

const rootReducer = combineReducers({
  timer,
  levels,
  currentLevel
});

export default rootReducer;
