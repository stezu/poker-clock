
// Get the total number of levels including breaks
function getTotalNumberOfLevels(numberOfPlayLevels, breakAfterXPlayLevels) {
  const lastLevelIsABreak = numberOfPlayLevels % breakAfterXPlayLevels === 0;
  let numberOfLevels = Math.floor(numberOfPlayLevels + (numberOfPlayLevels / breakAfterXPlayLevels));

  // We should never end on a break
  if (lastLevelIsABreak) {
    numberOfLevels -= 1;
  }

  return numberOfLevels;
}

export function getLevelConfiguration() {
  const numberOfPlayLevels = 120;
  const breakAfterXPlayLevels = 4;

  return {
    numberOfLevels: getTotalNumberOfLevels(numberOfPlayLevels, breakAfterXPlayLevels),
    breakEveryXLevels: breakAfterXPlayLevels + 1,
    breakDuration: 5 * 60, // 5 minutes in seconds
    levelDuration: 15 * 60, // 15 minutes in seconds
    firstBigBlind: 200
  };
}
