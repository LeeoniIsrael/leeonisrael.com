# Validation — October 2, 2026

- `npm run build`: passes; statically prerendered page, 196 kB first-load JavaScript. No Spline runtime or external 3D scene.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: all six suites pass. Covers all 14 project dialogs and focus restoration, category filters, all 10 career entries, preserved older stories, all 14 courses, resume response, five widths (320–1440px), mobile navigation, both themes, and reduced motion.
- Production-style 3D name: pointer movement changes perspective and depth shadows; reduced motion disables both. Touch-device emulation confirms a static name. Hero, About portrait, and mobile layouts visually reviewed.
- Scroll continuity: the Kavanah section uses relative positioning and content height; its position and the following projects advance by the actual scroll distance.
- Motion checks: wheel scrolling reaches its destination; screenshots visibly change position through the scroll range while the section itself moves with the page; hover preview transforms respond; all actual Kavanah screenshot assets load. Early/late desktop and mobile captures visually inspected.
- Keyboard takeover during wheel easing verified in Chrome; keyboard position remains stable afterward.
- axe WCAG 2 A/AA and 2.1 AA: zero automated violations in tested mobile light/dark states. This is an automated check, not comprehensive accessibility certification.
- Desktop hero, mobile hero, dark theme, career section, and Kavanah composition visually reviewed. Local QA captures are ignored under `tmp/qa/`.
- All three resume routes serve the exact user-supplied PDF; file hashes match the source.
- Project format checks confirm one full mobile preview, seven horizontal web previews, and six logo previews; mobile dialog images use contain rather than crop. Footer illustration, navigation, and back-to-top validated.
- Original New York footer illustration, desktop/footer mobile layouts, and project previews visually reviewed.
- `npm audit`: zero known vulnerabilities.
- `git diff --check`: passes.

Local preview runs at http://localhost:3000 on `codex/portfolio-refresh`. No remote push or deployment performed. Temporary Kavanah capture server stopped after capturing its unmodified onboarding UI.

Project-browsing refinement: the five existing suites passed, then the new end-to-end suite passed after fixing a hover/scroll event race. Checks cover desktop hover previews, sequential project navigation, arrow keys, screenshot expansion, all three Kavanah screen choices, Escape/back focus, returning to the originating row, mobile inspector width, and an axe scan of the focused viewer. Hover previews, desktop/phone viewer layouts, and navigation visually reviewed. Native light/dark crossfade manually verified in Chrome with no page errors.
