const BASE_POINTS = 100;

export function calculatePoints(isCorrect, streak, timeRemaining, maxTime) {
  if (!isCorrect) return { points: 0, newStreak: 0, multiplier: 1 };

  const newStreak = streak + 1;
  let multiplier = 1;
  if (newStreak >= 5) multiplier = 3;
  else if (newStreak >= 3) multiplier = 2;

  const timeBonus = Math.round((timeRemaining / maxTime) * 50);
  const points = (BASE_POINTS + timeBonus) * multiplier;

  return { points, newStreak, multiplier };
}

export function calculateAccuracy(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}
