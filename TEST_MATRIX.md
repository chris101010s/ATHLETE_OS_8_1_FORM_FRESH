> Historischer Stand DEEP 8.0 oder V7. Aktuelle Änderungen und Prüfungen für 8.1 Fresh stehen in `RELEASE_REPORT.md`; die automatische Migration ist in Fresh deaktiviert.

# Testmatrix – tatsächlicher Stand

| Suite | Ergebnis | Inhalt |
|---|---|---|
| preflight | PASS | Struktur, Swift, Podspec, Git-Tracking-Contract |
| syntax | PASS | 30 TS/TSX, 174 Importpfade |
| logic | PASS 17 | Parser, Datum, Trends, Cardio |
| catalog | PASS | Suche, Filter, Validator |
| csv | PASS | CSV-Parser, Grenzen |
| validation | PASS 22 | Schema, Legacy-Import, ungültige Werte |
| workout | PASS 12 | Historie, Progression |
| compat | PASS 14 | native Build-Contracts, bekannte Regressionen |
| storage | PASS 10 | KV-Recovery und Schreibfehler mit Mock |
| advanced | PASS 32 | Recovery, Maße, Ziele, Plan, PR |
| form | PASS 17 | Journal, Settings, Timer, Migration |
| deep | PASS 62 | Satztypen, Gruppen, Pause, Snapshot, Sollvorgaben, PR, Story, Habit, Coach, große Daten |
| sqlite | PASS 22 | reale SQLite-Datei, Commit/Rollback, Restart, Diff, große Migration |
| YAML / Shell | PASS | Workflow parse / bash -n |
| npm install offline | BLOCKED | ENOTCACHED |
| vollständiger Typecheck | FAIL/BLOCKED | fehlende Abhängigkeiten/Expo-Basiskonfiguration |
| CI / Xcode / IPA | NICHT AUSGEFÜHRT | kein Zugang/macOS |

## Native Abnahme (alle offen)
- Erststart, alle optionalen Angaben überspringen; leere Profile und Logs.
- V7 mit anonymisiertem Testbestand installieren, externes Backup, gleich signiertes V8 überinstallieren; alle IDs, Sätze, Scans und Ziele prüfen; Neustart.
- Live-Workout mit 5 Sätzen, wechselnden Satztypen, RIR, Gruppen und per-Übung-Rest; Tab wechseln, Force Quit, Neustart; laufende Entwürfe und Uhr prüfen. 90s Rest, 40s Hintergrund, korrekte Restzeit. Pause/Resume, Abschluss, historische Korrektur und Löschung.
- Fehlerhafte/zu große Backups, Restore, Undo, Force Quit bei SQLite-Write, Recovery und Originalexport. Niemals echte persönliche Daten für QA verwenden.
- OCR-PDF/JPEG/HEIC, Abbruch, fehlende Werte, Korrektur, Scanvergleich und Rechteverweigerung.
- Story ohne Gewichts-/Namensdaten, PNG tatsächlich 1080x1920, Share cancel. Alle Themes und optionalen Extras.
- Kleine/große iPhones, Dynamic Type, VoiceOver, Reduce Motion, Tastatur, Safe Areas; Offline, große Daten, Zeitzonenwechsel.
- Xcode Release Device Build, signiertes Sideloadly-Update, erneutes Signieren nach Ablauf. Keine Freigabe, bevor diese Kernfälle geprüft sind.

Logs in `docs/qa/`. Keine Coverage-Prozentzahl oder Geräteperformance behauptet.
