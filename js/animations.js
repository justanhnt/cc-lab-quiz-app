export function flashCorrect(element) {
  element.classList.add("quiz__option--correct");
  setTimeout(() => element.classList.remove("quiz__option--correct"), 600);
}

export function flashWrong(element) {
  element.classList.add("quiz__option--wrong");
  setTimeout(() => element.classList.remove("quiz__option--wrong"), 600);
}

export function shakeElement(element) {
  element.classList.add("shake");
  setTimeout(() => element.classList.remove("shake"), 500);
}

export function showStreakBadge(container, multiplier) {
  const badge = document.createElement("div");
  badge.className = "streak-badge";
  badge.textContent = `${multiplier}x Streak!`;
  container.appendChild(badge);
  setTimeout(() => badge.remove(), 1200);
}

export function confetti(container) {
  const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + "s";
    piece.style.animationDuration = (Math.random() * 1 + 1) + "s";
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }
}
