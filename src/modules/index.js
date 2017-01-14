
// Get the previous, current and next levels
export function getLevelsForDisplay(levels, currentLevel) {

  if (currentLevel === 0) {
    return {
      previous: undefined,
      current: undefined,
      next: undefined
    };
  }

  return {
    previous: levels[currentLevel - 1],
    current: levels[currentLevel],
    next: levels[currentLevel + 1]
  };
}
