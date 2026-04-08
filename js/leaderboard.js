const STORAGE_KEY = "quizArenaLeaderboard";
const MAX_ENTRIES = 10;

export function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveScore(name, score, accuracy, category) {
  const board = getLeaderboard();
  board.push({
    name,
    score,
    accuracy,
    category,
    date: new Date().toLocaleDateString()
  });
  board.sort((a, b) => b.score - a.score);
  const trimmed = board.slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  return trimmed;
}

export function clearLeaderboard() {
  localStorage.removeItem(STORAGE_KEY);
}
