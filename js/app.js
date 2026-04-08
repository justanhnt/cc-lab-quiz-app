import { getCategories } from "./questions.js";
import { initQuiz } from "./quiz.js";
import { calculateAccuracy } from "./scoring.js";
import { getLeaderboard, saveScore } from "./leaderboard.js";
import { confetti } from "./animations.js";
import { playGameOver } from "./sounds.js";

const screens = ["start-screen", "quiz-screen", "results-screen", "leaderboard-screen"];

function showScreen(id) {
  screens.forEach(s => {
    document.getElementById(s).classList.toggle("screen--active", s === id);
  });
}

function initStartScreen() {
  const categorySelect = document.getElementById("category-select");
  categorySelect.innerHTML = "";
  getCategories().forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showResults(gameState) {
  const elapsed = Math.round((Date.now() - gameState.startTime) / 1000);
  const accuracy = calculateAccuracy(gameState.correct, gameState.totalQuestions);

  document.getElementById("results-score").textContent = gameState.score;
  document.getElementById("results-correct").textContent =
    `${gameState.correct} / ${gameState.totalQuestions}`;
  document.getElementById("results-accuracy").textContent = accuracy + "%";
  document.getElementById("results-time").textContent = formatTime(elapsed);
  document.getElementById("results-streak").textContent = gameState.bestStreak;

  // Store for leaderboard save
  document.getElementById("results-screen").dataset.score = gameState.score;
  document.getElementById("results-screen").dataset.accuracy = accuracy;
  document.getElementById("results-screen").dataset.category = gameState.category;

  showScreen("results-screen");
  playGameOver();

  if (accuracy === 100) {
    confetti(document.getElementById("results-screen"));
  }
}

function renderLeaderboard() {
  const board = getLeaderboard();
  const tbody = document.getElementById("leaderboard-body");
  tbody.innerHTML = "";

  if (board.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="5" class="leaderboard__empty">No scores yet. Play a game!</td>`;
    tbody.appendChild(tr);
    return;
  }

  board.forEach((entry, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="leaderboard__rank">${i + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score}</td>
      <td>${entry.accuracy}%</td>
      <td>${entry.date}</td>
    `;
    tbody.appendChild(tr);
  });
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  initStartScreen();
  showScreen("start-screen");

  // Start game
  document.getElementById("btn-start").addEventListener("click", () => {
    const category = document.getElementById("category-select").value;
    showScreen("quiz-screen");
    initQuiz(category, showResults);
  });

  // Save score
  document.getElementById("btn-save-score").addEventListener("click", () => {
    const nameInput = document.getElementById("player-name");
    const name = nameInput.value.trim() || "Anonymous";
    const resultsEl = document.getElementById("results-screen");
    saveScore(
      name,
      parseInt(resultsEl.dataset.score),
      parseInt(resultsEl.dataset.accuracy),
      resultsEl.dataset.category
    );
    nameInput.value = "";
    renderLeaderboard();
    showScreen("leaderboard-screen");
  });

  // Play again
  document.getElementById("btn-play-again").addEventListener("click", () => {
    showScreen("start-screen");
  });

  // View leaderboard from results
  document.getElementById("btn-view-leaderboard").addEventListener("click", () => {
    renderLeaderboard();
    showScreen("leaderboard-screen");
  });

  // View leaderboard from start
  document.getElementById("btn-leaderboard").addEventListener("click", () => {
    renderLeaderboard();
    showScreen("leaderboard-screen");
  });

  // Back to start from leaderboard
  document.getElementById("btn-back-start").addEventListener("click", () => {
    showScreen("start-screen");
  });
});
