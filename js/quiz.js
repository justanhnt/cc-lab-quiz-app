import { getQuestions } from "./questions.js";
import { calculatePoints } from "./scoring.js";
import { startTimer, stopTimer } from "./timer.js";
import { flashCorrect, flashWrong, shakeElement, showStreakBadge } from "./animations.js";
import { playCorrect, playWrong, playTick } from "./sounds.js";

const TIMER_DURATION = 15;
let questions = [];
let currentIndex = 0;
let gameState = null;
let onQuizEnd = null;

export function initQuiz(category, endCallback) {
  questions = getQuestions(category);
  shuffleArray(questions);
  currentIndex = 0;
  onQuizEnd = endCallback;
  gameState = {
    score: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
    totalQuestions: questions.length,
    startTime: Date.now(),
    category
  };
  showQuestion();
}

function showQuestion() {
  if (currentIndex >= questions.length) {
    stopTimer();
    onQuizEnd(gameState);
    return;
  }

  const q = questions[currentIndex];
  // Shuffle options while tracking the correct one
  const correctText = q.options[q.correct];
  const shuffledOptions = [...q.options];
  shuffleArray(shuffledOptions);
  const shuffledCorrectIndex = shuffledOptions.indexOf(correctText);

  const container = document.getElementById("quiz-screen");

  document.getElementById("quiz-question-num").textContent =
    `Question ${currentIndex + 1} / ${questions.length}`;
  document.getElementById("quiz-question-text").textContent = q.question;
  document.getElementById("quiz-score").textContent = `Score: ${gameState.score}`;
  document.getElementById("quiz-category-badge").textContent = q.category;

  // Progress bar
  const progress = ((currentIndex) / questions.length) * 100;
  document.getElementById("quiz-progress-fill").style.width = progress + "%";

  // Streak indicator
  const streakEl = document.getElementById("quiz-streak");
  if (gameState.streak >= 3) {
    const mult = gameState.streak >= 5 ? 3 : 2;
    streakEl.textContent = `🔥 ${mult}x Streak`;
    streakEl.classList.add("streak--active");
  } else {
    streakEl.textContent = "";
    streakEl.classList.remove("streak--active");
  }

  // Render options
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";
  shuffledOptions.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz__option";
    btn.textContent = opt;
    btn.addEventListener("click", () => handleAnswer(i, btn, shuffledCorrectIndex));
    optionsContainer.appendChild(btn);
  });

  // Start timer
  startTimer(
    TIMER_DURATION,
    (remaining, total) => {
      document.getElementById("timer-text").textContent = remaining + "s";
      const pct = (remaining / total) * 100;
      document.getElementById("timer-bar-fill").style.width = pct + "%";
      if (remaining <= 5 && remaining > 0) {
        document.getElementById("timer-bar-fill").classList.add("timer--warning");
        playTick();
      } else {
        document.getElementById("timer-bar-fill").classList.remove("timer--warning");
      }
    },
    () => {
      // Time expired
      disableOptions();
      highlightCorrect(shuffledCorrectIndex);
      playWrong();
      gameState.streak = 0;
      setTimeout(() => {
        currentIndex++;
        showQuestion();
      }, 1000);
    }
  );
}

function handleAnswer(selectedIndex, buttonEl, correctIndex) {
  stopTimer();
  disableOptions();

  const isCorrect = selectedIndex === correctIndex;
  const timeRemaining = parseInt(document.getElementById("timer-text").textContent);

  const result = calculatePoints(isCorrect, gameState.streak, timeRemaining, TIMER_DURATION);

  if (isCorrect) {
    flashCorrect(buttonEl);
    playCorrect();
    gameState.score += result.points;
    gameState.correct++;
    gameState.streak = result.newStreak;
    if (gameState.streak > gameState.bestStreak) {
      gameState.bestStreak = gameState.streak;
    }
    if (result.multiplier > 1) {
      showStreakBadge(document.getElementById("quiz-screen"), result.multiplier);
    }
  } else {
    flashWrong(buttonEl);
    shakeElement(buttonEl);
    playWrong();
    gameState.streak = 0;
    highlightCorrect(correctIndex);
  }

  setTimeout(() => {
    currentIndex++;
    showQuestion();
  }, 800);
}

function disableOptions() {
  document.querySelectorAll(".quiz__option").forEach(btn => {
    btn.disabled = true;
  });
}

function highlightCorrect(correctIdx) {
  const buttons = document.querySelectorAll(".quiz__option");
  if (buttons[correctIdx]) {
    buttons[correctIdx].classList.add("quiz__option--correct");
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
