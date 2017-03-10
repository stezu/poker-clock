import * as types from '../constants/actionTypes';

// Timer Actions
export const resetTimer = () => ({
  type: types.RESET_TIMER
});
export const startTimer = ({ duration }) => ({
  type: types.START_TIMER,
  now: Date.now(),
  duration
});
export const pauseTimer = () => ({
  type: types.PAUSE_TIMER,
  now: Date.now()
});
export const resumeTimer = () => ({
  type: types.RESUME_TIMER,
  now: Date.now()
});

// Level Actions
export const resetLevels = () => ({
  type: types.RESET_LEVELS
});
export const editDuration = (id, duration) => ({
  type: types.EDIT_DURATION,
  id,
  duration: Number(duration) || null
});
export const editAnte = (id, ante) => ({
  type: types.EDIT_ANTE,
  id,
  ante: Number(ante) || null
});
export const editBigBlind = (id, bigBlind) => ({
  type: types.EDIT_BIG_BLIND,
  id,
  bigBlind: Number(bigBlind) || null
});
export const editSmallBlind = (id, smallBlind) => ({
  type: types.EDIT_SMALL_BLIND,
  id,
  smallBlind: Number(smallBlind) || null
});
export const editPosition = (oldIndex, newIndex) => ({
  type: types.EDIT_POSITION,
  oldIndex,
  newIndex
});
export const removeLevel = (id) => ({
  type: types.REMOVE_LEVEL,
  id
});
export const addLevel = () => ({
  type: types.ADD_LEVEL
});
export const addBreak = () => ({
  type: types.ADD_BREAK
});

// Current Level
export const incrementLevel = () => ({
  type: types.INCREMENT_CURRENT_LEVEL
});
export const decrementLevel = () => ({
  type: types.DECREMENT_CURRENT_LEVEL
});
