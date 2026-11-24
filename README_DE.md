> Historischer Stand DEEP 8.0 oder V7. Aktuelle Änderungen und Prüfungen für 8.1 Fresh stehen in `RELEASE_REPORT.md`; die automatische Migration ist in Fresh deaktiviert.

> Historischer V7 / früherer FORM-Entwicklungsstand. Für dieses Paket gelten RELEASE_REPORT.md, PRODUCT_SPEC.md, TEST_MATRIX.md und BUILD_WINDOWS_TO_IPHONE.md.

# ATHLETE OS 7.0 – Native Gym Ultra Edition

**React Native + Expo SDK 58 · iOS-App-Quellcode · Entwicklung unter Windows · kostenloser Cloud-Build als Versuch über GitHub Actions.**

Dies ist ein **echtes natives React-Native-Projekt**: keine Unity-Oberfläche, keine Website in einer WebView. ATHLETE OS 7.0 verwendet ein helles, minimalistisches Design, grafische Auswertungen und – auf geeigneten iOS-Versionen – `expo-glass-effect` für native Glas-Elemente.

> **Teststatus:** Die mitgelieferten statischen Quellcode- und ausführbaren Logiktests sind erfolgreich; ein vollständiger `npm install`, Typecheck mit den *echten* Expo-Typen, Xcode-Build und Praxistest mit iPhone/Sideloadly konnten in dieser Umgebung nicht erfolgen. Die ZIP enthält **keine** fertig gebaute IPA. Der GitHub-Build muss erst erfolgreich laufen.

## 1. Umfang dieser Version

### Übungsbibliothek (gym)

- **233 zusätzliche kuratierte Offline-Übungen** (konventionelle Trainingsübungen, eigene Fallback-Liste), zusammen mit 12 bisherigen Startübungen. Der Fallback wurde lokal erstellt und **ist nicht** als offizieller Datenbankdump ausgegeben.
- Beim GitHub-iOS-Build wird die echte frei lizenzierte `yuhonas/free-exercise-db` (Unlicense) heruntergeladen und geprüft (**mindestens 700**, in der Quelle normalerweise **800+** Übungen). Bei Downloadausfall bleibt der lokale Offline-Fallback benutzbar, anstatt den Build allein deshalb abzubrechen. Die vollständige externe Datenbank ist **nicht schon im Source-ZIP** enthalten.
- Suche mit deutschen und englischen Begriffen, Muskel- und Gerätefilter, Level-Filter, Favoriten, Übungsbilder (nur online), Anleitungen (falls von der Datenquelle geliefert).
- Eigene Übungen erstellen, bearbeiten und mit Sicherheitsabfrage löschen; Übungen, auf die Trainingshistorie/Vorlage/Ziele verweisen, können nicht versehentlich gelöscht werden.

### Live-Gym und Trainingsplanung

- Eigene Trainingsvorlagen erstellen/ändern, Übungen in der Reihenfolge verschieben, Vorlagen duplizieren und löschen.
- **Wochenplan** für alle sieben Tage mit freien Trainingstagen oder Zuordnung zu Vorlagen. Kein starrer Pflichtplan.
- Freies Workout, beliebige Übungen während einer Session hinzufügen, Zeit seit Trainingsbeginn, sessionbezogene Notizen.
- Gewicht, Wiederholungen, RIR; Satztypen **Aufwärmsatz / Arbeitssatz / Dropsatz**; bestehende Sätze **bearbeiten und löschen**.
- Letzte Gewichte und Wiederholungen als **Vorwerte** aus derselben Übung; nach dem Satz startet der Pausentimer. Vorlagenabhängige Pausenzeiten, Verlängern und Überspringen, aktive Übung und noch nicht abgeschickte Satzeingaben bleiben über Tabwechsel erhalten.
- Satzübersicht, alte Sessions mit Satzdetails, komplette Trainingseinheit nur nach Bestätigung löschen.
- Persönliche Rekorde (Gewicht/Wiederholungen), Übungs-Verlaufsdiagramme und **geschätztes e1RM** (Schätzformel, keine echten 1RM-Testwerte); **Aufwärmsätze zählen nicht** zur Kraft-Prognose oder zum Arbeitsvolumen.

### Progress und Athletic Performance

- Gewichtsdiagramme und 7-Tage-Trends, frei eingegebenes Start-/Zielgewicht, ohne automatische persönliche Werte.
- Körperumfang von Taille, Brust, Hüfte, Oberarm, Oberschenkel und Hals, einschließlich datierter Messung, Diagramm und Löschfunktion.
- Eigenständige frei definierbare Ziele: Liegestütze, Klimmzüge, Plank, Trainingseinheiten, Gewicht, 5-km-Lauf und ausgewählte Kraftübungen.
- **Performance+** mit Übungsrekorden, 28-Tage-Überblick und Cardio-Minuten.
- Cardio mit Art, Datum, Minuten und Distanz; **vergangene Einheiten bearbeiten/löschen**. Ebenso Leistungstests mit Datum, Wert und Einheit nachträglich korrigieren.
- Erholung/Schlaf als freiwilliges Journal: Schlafstunden, Energie, Muskelgefühl, Notizen und Trenddiagramm.
- Freie Gewohnheiten/XP, Ernährungskcal und Makros, CSV-Import, FITINN-Scan-Erfassung und 9:16-Social-Story (freiwillig teilen).

### Datensicherheit und Privatsphäre

- Kein vorgefüllter Benutzername, kein voreingestelltes Anfangs-/Zielgewicht, keine Demodaten in persönlichen Mess-/Trainingslisten.
- Lokale Speicherung, JSON-Backup/Import, strengere Eingabe- und Sicherungsvalidierung, separate lokale Recovery-Kopie, serialisierte Schreibvorgänge.
- **Kompatibilität mit früheren Versionen 4/5/6**: Bundle-ID `app.athleteos.personal`, Speicherkey `athlete-os-v4-data`, `schema: 4` bleiben erhalten. Alte Backups ohne neue Felder werden mit leeren Listen ergänzt.
- Backup **vor jedem Update** extern sichern. **Nicht vorher deinstallieren**, da dies lokale App-Daten löschen kann. Ein In-Place-Update per Sideloadly ist nicht garantiert datenverlustfrei.

## 2. Quellen und Beschränkungen

- **Übungen:** [free-exercise-db auf GitHub](https://github.com/yuhonas/free-exercise-db), Lizenz *The Unlicense*. `docs/EXERCISE_DATA_LICENSE.md` beachten. Standard-Fallback hat eigene Bezeichnungen und ggf. keine Übungsbilder/Anleitungen.
- **FITINN / vicoach:** Import von PDF oder Bild **über lokale Apple Vision/PDFKit-Texterkennung** ist in der iOS-Modulquelle vorgesehen; Werte sind vor dem Speichern zu prüfen. Keine direkte FITINN- oder vicoach-Konto-Verbindung, kein bestätigter Test mit realem FITINN-Bericht.
- **YAZIO:** Nur Link und allgemeiner CSV-Import. **Keine offizielle direkte YAZIO-API-Verbindung**; CSV-Dateien müssen ein unterstütztes Datenformat haben.
- **Social Media:** Lokale Story-Grafik über iOS-Share-Sheet, **kein automatisches Instagram-/TikTok-Posting**, kein Zugriff auf Social-Media-Accounts.
- **Coach:** Abschaltbare, motivierende Hinweise ohne persönliche Beschämung.
- **Liquid Glass:** Native Glasdarstellung nur auf kompatibler iOS-Hardware/Version, sonst helle Standardoberfläche.
- **Pausentimer:** Countdown rechnet beim Zurückkehren anhand echter Zeit korrekt, aber **kein zuverlässiger Alarm im gesperrten Hintergrund** vorgesehen.

## 3. Kostenloser Build auf Windows OHNE eigenen Mac

Das Projekt enthält einen GitHub-Actions-Workflow unter `.github/workflows/ios-unsigned.yml`. Der Runner `xcode-27` erstellt **geplant** eine unsigned IPA. **Ob der konkrete Build durchläuft, ist noch unbestätigt.** Öffentliche Repositories nutzen bei GitHub Standardrunner derzeit kostenlos; eine Änderung der GitHub-Preise oder Runner-Verfügbarkeit ist möglich.

1. `ATHLETE_OS_7_PRO` aus der ZIP entpacken.
2. Alle Dateien **im Projektordner** zu einem neuen **öffentlichen** GitHub-Repository hochladen. Im Repository-Root müssen `App.tsx`, `app.json`, `package.json`, `.github/workflows/ios-unsigned.yml` erscheinen. **Keine privaten Backups/Scans hochladen.**
3. GitHub → Repository → **Actions** → **ATHLETE OS 7 – iOS IPA (unsigned)** → **Run workflow** (`main`). Ein Push auf `main` löst ebenfalls einen Build aus.
4. Workflow führt `npm install`, Expo-Paketabgleich, Übungsdatenbank-Abruf/Fallback, `npm run check`, iOS-Prebuild, CocoaPods und `xcodebuild` aus.
5. **Nur wenn grün:** Unter **Artifacts** die ZIP `ATHLETE_OS_unsigned_IPA` herunterladen, entpacken. Darin sollte `ATHLETE_OS_unsigned.ipa` liegen.
6. [Sideloadly](https://sideloadly.io/) auf deinem Windows-PC installieren (Apple-Treiber gemäß Sideloadly-Anleitung), iPhone per USB verbinden, Trust bestätigen, IPA auswählen, mit kostenloser Apple-ID signieren und installieren.
7. Auf dem iPhone falls nötig Einstellungen → Allgemein → VPN & Geräteverwaltung → Entwickler vertrauen; ggf. Entwickler-Modus unter Datenschutz & Sicherheit aktivieren.
8. Bei kostenloser Apple-ID nach ca. sieben Tagen wieder signieren; die App muss dafür nicht neu programmiert werden, solange dieselbe IPA verwendet wird.

> **Wenn GitHub ein rotes X zeigt:** Öffne den ersten fehlgeschlagenen Schritt, kopiere Fehlermeldung und Jobnamen. Das ist die notwendige Grundlage für weitere echte iOS-Bugfixes. Ein erfolgreiches GitHub-Artefakt wurde hier **nicht erzeugt**.

### Entwicklung unter Windows (optional)

Node.js 22+, VS Code und Git. In PowerShell oder Terminal:

```powershell
npm install --no-audit --no-fund
npx expo install --fix --npm
npm run catalog:fetch
npm run check
npx expo start
```

Lokaler Test mit Node.js ohne Expo-Installation (wenn `typescript` im System vorhanden):

```powershell
npm run test:syntax
npm run test:logic
npm run test:catalog
npm run test:csv
npm run test:validation
npm run test:workout
npm run test:compat
npm run test:storage
npm run test:advanced
```

Einige native Funktionen (insbesondere das Swift-OCR-Modul) können nicht innerhalb von Expo Go geprüft werden; dafür ist ein echter iOS-Build erforderlich.

## 4. Aktualisierung von ATHLETE OS 6

* Vor dem Update über **Mehr → Einstellungen → JSON-Backup exportieren** eine vollständige Kopie auf iCloud Drive, Windows oder einem anderen sicheren Ort ablegen.
* Bundle-ID und Speicherkey bleiben gleich. Trotzdem ist nicht verifiziert, ob Sideloadly die bisherige Installation in jedem Fall ohne Datenverlust aktualisieren kann.
* Bei der allerersten Version erst mit **frei erfundenen Testwerten** ausprobieren; private Daten erst nach bestandenem iPhone-Test verwenden.

## 5. Echte QA-Ergebnisse und offene Risiken

Die beigefügte `QA_REPORT_DE.md` führt die erfolgreich gelaufenen Skripte und verbleibenden Risiken getrennt auf. **Syntax- und Logiktests sind nicht gleichbedeutend mit einem vollständig gebauten iPhone-Release.**
