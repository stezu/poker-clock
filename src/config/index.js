
export function getLevelConfiguration() {

  return {
    numberOfLevels: 20,
    breakEveryXLevels: 5,
    breakDuration: 5 * 60, // 5 minutes in seconds
    levelDuration: 15 * 60, // 15 minutes in seconds
    firstBigBlind: 200
  };
}
