import { combineReducers } from 'redux';
import timer from './timer';
import levels from './levels';

const rootReducer = combineReducers({
  timer,
  levels
});

export default rootReducer;
