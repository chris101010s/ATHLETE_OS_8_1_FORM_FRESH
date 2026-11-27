> [!NOTE]
> **Legacy milestone · FORM 8.1.** Kept for development history. The newer public FORM development line is [FORM 15](https://github.com/chris101010s/FORM_10_LIVING_WORKOUT1).

---

# FORM 8.1 Fresh Start

Aktueller Stand: eigenständige leere Datenbank, vierstufige Einrichtung, keine automatische Übernahme alter Daten. Siehe `RELEASE_REPORT.md` und `BUILD_WINDOWS_TO_IPHONE.md`.

# FORM 8.0 – ATHLETE OS

Echter Expo-/React-Native-Quellcode auf Basis von ATHLETE OS 7. Entwicklungsstand, nicht als iOS-Release abgenommen.

- `RELEASE_REPORT.md`: Änderungen, Grenzen und echte Tests.
- `BUILD_WINDOWS_TO_IPHONE.md`: GitHub Actions / unsigned IPA / Sideloadly.
- `PRODUCT_SPEC.md`, `TEST_MATRIX.md`: Implementierungs- und Abnahmestand.
- `MIGRATION_V7_TO_V8.md`: Fresh-Start und optionaler manueller Import.
- `docs/MASTER_PROMPT_DE.md`: vollständige ursprüngliche Spezifikation.

Nach npm-Installation: `npm run check` für Tests und vollständigen Typecheck. `npm start` für Expo (native OCR benötigt einen nativen Build). Keine persönliche Daten in Git committen. Altes Backup nur bei Bedarf extern sichern. Native CI und Gerätetest sind noch offen.
