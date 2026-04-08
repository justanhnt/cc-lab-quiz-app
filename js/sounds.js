let audioCtx = null;

function getContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(frequency, duration, type = "sine") {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = 0.15;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function playCorrect() {
  playTone(523, 0.15);
  setTimeout(() => playTone(659, 0.15), 100);
  setTimeout(() => playTone(784, 0.2), 200);
}

export function playWrong() {
  playTone(200, 0.3, "square");
}

export function playTick() {
  playTone(800, 0.05, "sine");
}

export function playGameOver() {
  playTone(523, 0.2);
  setTimeout(() => playTone(392, 0.2), 200);
  setTimeout(() => playTone(330, 0.3), 400);
}
