let timerId = null;
let startTime = 0;

export function startTimer(duration, onTick, onExpire) {
  stopTimer();
  let remaining = duration;
  startTime = Date.now();

  onTick(remaining, duration);

  timerId = setInterval(() => {
    remaining--;
    onTick(remaining, duration);

    if (remaining <= 0) {
      stopTimer();
      onExpire();
    }
  }, 1000);
}

export function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

export function getElapsedSince(since) {
  return Math.round((Date.now() - since) / 1000);
}
