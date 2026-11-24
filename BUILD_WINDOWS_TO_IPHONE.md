# Windows → GitHub Actions → iPhone

1. Optional: alte Daten als JSON exportieren, falls du sie doch behalten möchtest. FORM Fresh übernimmt sie nicht automatisch. Bestehendes Repo sichern (z.B. Branch/Tag vor V8). Keine privaten Backups oder Scans committen.
2. ZIP entpacken; **Inhalt** direkt in den bestehenden Repo-Hauptordner kopieren, inklusive `.github` und `modules`. Alte Workflow-Datei gleichen Namens ersetzen. GitHub Desktop: Änderungen prüfen, committen, pushen. Kein persönlicher Datensatz gehört in Git.
3. GitHub → Actions → FORM 8 – iOS IPA (unsigned). Push nach main oder Run workflow. Der Workflow nutzt den aus V7 übernommenen `xcode-27` Runner; nur wenn dieser im Repository tatsächlich verfügbar ist, kann er laufen. Gratis-Kontingent und Runner-Verfügbarkeit hängen vom GitHub-Konto/Repo ab.
4. Pipeline: npm ci mit Lockfile, sonst npm install; Expo config/check; Katalogabruf/Fallback; 14 Tests + Typecheck; Expo prebuild; pod install; OCR-Check; unsigned iphoneos Xcode Release; IPA + SHA256-Manifest. Bei Fehler den ersten roten Schritt prüfen. Kein `expo install --fix` ohne Review. Wenn erfolgreicher Lauf Lockfile erzeugt: herunterladen, prüfen, committen. Expo-Versions-/Runnerfehler erst anhand echter Logs beheben.
5. Nur bei grünem Lauf: Artifacts → `ATHLETE_OS_unsigned_IPA-<run_number>` → entpacken → `ATHLETE_OS_unsigned.ipa`. Manifest kontrollieren. In Sideloadly gleiche Apple-ID/Signierkonfiguration und Bundle-ID wie bei V7 verwenden. Eine Deinstallation ist nicht nötig. Die neue Datenbank startet auch bei Überinstallation leer. Eine Deinstallation kann den gesamten alten App-Speicher entfernen.
6. Erststart: vier Schritte der Einrichtung ausfüllen oder überspringen. Force Quit und Neustart, Profil, erste Messung, Satz und Timer testen. Bei Fehler Notfall-Backup exportieren.
7. Kostenlose persönliche Signierung ist typischerweise zeitlich begrenzt (oft 7 Tage); rechtzeitig dieselbe App erneut signieren, vorher Backup sichern. Kein Zwang zur Neuinstallation.

Kein CI-Lauf in diesem Arbeitsstand ausgeführt, keine IPA geliefert. Vollständige lokale Expo-Installation blockiert. Die App ist nicht als releasebereit abgenommen.
