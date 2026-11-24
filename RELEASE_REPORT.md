# FORM 8.1 — FRESH START

## Current release scope
This package extends the actual FORM 8.0 DEEP source. At the user's request, it deliberately starts with an empty, independent data store. It is not necessary to migrate anything from V7 or DEEP 8.0. Existing app sandbox data is not deleted by this code. Bundle ID `app.athleteos.personal` remains unchanged; SQLite filename `form-v8-fresh.db` and import-undo key `form-v8-fresh-before-restore` are distinct. Old database and KV records are not automatically read by the current repository. Explicit JSON import remains available after setup.

Implemented: four-step optional onboarding (name, training priority, current and target weight, preferred workout days, rest preset, coach style and Easter Eggs). No default personal values. A manually entered current weight becomes one dated measurement; skipping creates none. Selected days become free-workout plan days, not completed workouts. Onboarding completion and choices use the same validated SQLite store and JSON export as all other features. Coach and Easter Eggs are off until selected. Priority is editable in More, goal in Progress, training days in More > Wochenplan; coach and rest presets remain editable. All prior DEEP functionality stays in the codebase.

## Tests executed for 8.1
`NODE_PATH=$(npm root -g) npm run test:all` — 14 of 14 suites passed. 41 additional fresh-start checks include empty defaults, skip, explicit first measurement, duplicate day handling, repeat submission protection, invalid input rejection, JSON roundtrip, separate database contract and actual Node SQLite reopen. 22 previous SQLite integration checks and all prior logic suites also passed. See `docs/qa/fresh-8.1-tests.log` (also shipped as TXT for Git tracking).

Native Expo typecheck, iOS CI, IPA, Sideloadly and iPhone UI/runtime have not been executed for this release. Native dependency installation was blocked in the preceding DEEP environment. The existing GitHub workflow is provided, not represented as a successful build. No screenshots fabricated. Open requirements from the DEEP report (fonts, Health, Watch, widgets, full multi-block editor, all Easter Eggs, encrypted backups, device QA) remain open.

## Installation
See BUILD_WINDOWS_TO_IPHONE.md. First startup is a new setup, even when upgrading in place. Uninstalling is optional and deletes the old app sandbox; not required to get empty data. If installing on top, sign with the same Apple ID and bundle ID. Keep the ZIP out of the repo, copy its contents instead. If you want to retain an old backup, export it beforehand, but the user has explicitly said it is unnecessary. Never upload personal JSON to GitHub.
