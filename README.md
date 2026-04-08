# Quiz Arena

A fast-paced quiz web app with timed questions, streak bonuses, and a local leaderboard. Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- **Timed questions** — 15-second countdown per question with auto-skip
- **Streak bonuses** — 2x points after 3 correct in a row, 3x after 5
- **Leaderboard** — Top 10 scores saved in localStorage
- **Categories** — Claude Code, AI Concepts, Prompt Engineering (or play all)
- **Dark theme** — Custom dark UI with smooth animations
- **Sound effects** — Web Audio API beeps for correct, wrong, and timer
- **Results dashboard** — Score, accuracy %, time taken, best streak

## Quick Start

```bash
node server.js
```

Open http://localhost:6969 in your browser.

For development with auto-restart:

```bash
npm run dev
```

## How It Works

1. Pick a category (or "All") on the start screen
2. Answer 15 timed questions — faster answers earn a time bonus
3. Build streaks for multiplied points
4. Save your score to the leaderboard
5. Try to beat your high score

## Scoring

| Component | Points |
|-----------|--------|
| Correct answer (base) | 100 |
| Time bonus (scales with remaining time) | 0–50 |
| 3-streak multiplier | 2x |
| 5-streak multiplier | 3x |
| Wrong answer / timeout | 0 |

## Project Structure

```
quiz-app/
├── index.html          # Single-page app entry point
├── server.js           # Zero-dependency Node.js static server
├── css/styles.css      # Dark theme, BEM classes, animations
├── js/
│   ├── app.js          # Screen navigation and game lifecycle
│   ├── quiz.js         # Question flow and answer handling
│   ├── timer.js        # Countdown timer with auto-skip
│   ├── scoring.js      # Points calculation and streak logic
│   ├── leaderboard.js  # localStorage top 10 management
│   ├── questions.js    # Question bank (15+ questions, 3 categories)
│   ├── sounds.js       # Web Audio API sound effects
│   └── animations.js   # Answer feedback and confetti
└── tests/
    └── scoring.test.html  # In-browser scoring unit tests
```

## Tech

- Vanilla JS with ES modules
- Zero npm dependencies
- Node.js `http` module for serving (no Express needed)
- Web Audio API for sounds
- localStorage for leaderboard persistence

## Built With

All code written by [Claude Code](https://claude.ai/claude-code) as an agentic coding exercise.
