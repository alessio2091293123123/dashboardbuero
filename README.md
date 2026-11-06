# STARK Agentur-Büro

Lokaler Entwurf einer Pixel-Art-Büroszene mit den fünf Bots STARK, PIXEL, FORGE, GUARD und ATLAS. Momentaufnahme 06.11.2026, Europe/Zurich. Keine Live-Verbindung und keine produktive Abnahme.

Das Repository enthielt vor diesem Entwurf nur die Überschrift in dieser Datei. Es lag kein fertiger Seiten-Code und keine Agenturdatei darin.

## Öffnen ohne Installation

1. Den Ordner so lassen, wie er ist. `index.html`, `css/`, `js/` und `data/` bleiben nebeneinander.
2. `index.html` im Browser öffnen, per Doppelklick oder über Datei öffnen.
3. Es ist kein Server, kein Paket und keine Schrift aus dem Netz nötig.

Chrome und Edge auf Windows können lokale Skripte neben der HTML-Datei laden. Diese Umgebung hat das mit Headless-Chrome über den lokalen Dateipfad geprüft, nicht auf dem Windows-PC.

## Bedienung

- Die grosse Mappenliste ist für Touch und Tastatur. Pfeiltasten bewegen die Auswahl, Enter öffnet.
- Jeder Arbeitsplatz in der Zeichnung ist zusätzlich in Mappen geteilt und anklickbar.
- Im Fenster: Mappe, Aufgabe, Ergebnis. Escape schliesst und setzt den Fokus auf die Liste zurück.
- Zoom ist eine CSS-Skalierung der 2D-Zeichnung, keine 3D-Ansicht.
- Animation ist dekorativ und pausierbar. Bei `prefers-reduced-motion` startet sie aus.

## Daten

Die belegten Stände stehen in `js/snapshot.js`. Dieselbe Struktur liegt in `data/snapshot.json`. Die Seite lädt die JSON-Datei nicht nach, damit das Öffnen ohne Server ausreicht.

Pfadangaben sind Text aus dem Auftrag vom 06.11.2026. Die genannten Originaldateien lagen in diesem Repository nicht und sind keine Links. Wo kein Dateiinhalt vorlag, steht nur der belegte Inhalt der Momentaufnahme, kein erfundener Text.

Das Demoprojekt DEMO-GASTRO-001 / GASTRO-TEST-001, Trattoria Demo in Olten, ist ausdrücklich fiktiv. Der Rechentest ATLAS-01 ist kein Agenturpreis. Die Primary-Bot-Zuweisung ist NICHT GEPRÜFT.

## Grafik

Die Büroszene ist eine eigene Pixelzeichnung auf einem 2D-Canvas in `js/scene.js`. Sie stammt nicht aus Figma oder Canva. Die beigefügte Screenshot-Referenz war nur die Stilvorlage und ist nicht eingebettet. Es gibt keine 3D-Engine.

## Prüfung in dieser Umgebung

Mit den vorhandenen Mitteln, ohne neue Pakete:

- `node tests/check-static.mjs` prüft Snapshot, JSON-Gleichstand und dass die Seitendateien keine externen Adressen enthalten.
- `node tests/browser-flow.mjs` öffnet `index.html` lokal in Headless-Chrome und prüft alle fünf Bots: Mappe, Aufgabe, Ergebnisvorschau, Aufgabenwechsel, Arbeitsplatz-Klick, Escape mit Fokusrückkehr, Pfeiltaste und Enter, Tab im Dialog, Zoom, Pause. Die Ressourcenliste der Seite enthielt keine http- oder https-Adresse.
- Ein zweiter Start mit `--force-prefers-reduced-motion` lässt die Animation aus.

Nicht geprüft: Chrome und Edge auf dem Windows-PC, echte Touch-Bedienung, Screenreader, und die Optik. Die Optik prüft Alessio. Das ist keine produktive Abnahme.

## Grenzen

- Keine Live-Daten, kein Tracking, keine Secrets.
- Verbundene Dienste und lokal installierte Programme sind nicht eingebunden.
- FORGE-HEAD und GUARD-Vorprüfung sind Angaben aus der Momentaufnahme, hier nicht erneut an einem anderen Repository nachgemessen.
