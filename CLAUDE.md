# Quiz Arena - CLAUDE.md

## Project Overview
An interactive quiz web app with timed questions, scoring, gamification, and a polished UI. Built as a single-page application with vanilla HTML/CSS/JS (no frameworks).

## Tech Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES modules)
- **Storage:** localStorage for leaderboard persistence
- **Audio:** Web Audio API for sound effects
- **Build:** No build step — open `index.html` directly or serve with any static server

## Project Structure
```
quiz-app/
├── CLAUDE.md
├── index.html          # Single entry point
├── css/
│   └── styles.css      # All styles (responsive, animations)
├── js/
│   ├── app.js          # Main app controller, screen navigation
│   ├── quiz.js         # Quiz engine: question flow, answer handling
│   ├── timer.js        # Countdown timer with auto-skip
│   ├── scoring.js      # Points, streak bonuses, multipliers
│   ├── leaderboard.js  # Top 10 scores, localStorage CRUD
│   ├── sounds.js       # Web Audio API sound effects
│   ├── animations.js   # Answer feedback, transitions, confetti
│   └── questions.js    # Question bank (10+ questions, categorized)
├── assets/             # Static assets (images, icons if needed)
└── tests/
    └── scoring.test.html  # In-browser test page for scoring logic
```

## Commands
- **Run:** `npx serve quiz-app/` or open `quiz-app/index.html` in browser
- **Test:** Open `quiz-app/tests/scoring.test.html` in browser
- **Lint:** `npx eslint quiz-app/js/`

## Conventions
- Use ES modules (`import`/`export`) for all JS files
- CSS: BEM naming for component classes (e.g., `.quiz__option--correct`)
- All state lives in a single `gameState` object managed by `app.js`
- No global variables — everything scoped to modules
- Mobile-first responsive design (min-width breakpoints)

## NEVER
- Never use `var` — always `const` or `let`
- Never use inline styles in HTML — all styling in CSS
- Never use `document.write()`
- Never use `eval()` or `innerHTML` with user input
- Never hardcode question data in logic files — keep in `questions.js`
- Never use `alert()`, `confirm()`, or `prompt()` — use in-app UI
- Never add external CDN dependencies — keep it self-contained
