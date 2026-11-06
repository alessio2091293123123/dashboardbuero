/* STARK Agentur-Büro — statische Momentaufnahme
   Stand: 06.11.2026, Europe/Zurich
   Keine Live-Daten. Wird lokal per script-Tag geladen, auch wenn index.html direkt geöffnet wird.
   Dieselbe Struktur liegt zusätzlich in data/snapshot.json. */
(function (root, factory) {
  var data = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = data;
  } else {
    root.STARK_SNAPSHOT = data;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var FILE_MISSING =
    "Im Auftrag genannter Pfad. Die Datei liegt in diesem Repository nicht, deshalb kein Link und kein nachgeladener Dateiinhalt.";

  return {
    meta: {
      title: "STARK Agentur-Büro",
      banner:
        "Lokaler Entwurf · Momentaufnahme 06.11.2026 · Europe/Zurich · keine Live-Verbindung",
      animationLabel: "Dekorative Animation — kein Live-Arbeitsnachweis",
      snapshotDate: "06.11.2026",
      timezone: "Europe/Zurich",
      graphics:
        "Eigenständige Pixelzeichnung auf einem 2D-Canvas in diesem Entwurf. Nicht aus Figma oder Canva. Die Screenshot-Referenz war nur die Stilvorlage und ist nicht eingebettet.",
      repoNote:
        "Das Repository dashboardbuero enthielt vor diesem Entwurf nur die Überschrift in README.md. Kein fertiger Claude-Code und keine Agenturdateien lagen vor.",
      acceptance:
        "Keine produktive Abnahme. Optik prüft Alessio. Dieser Entwurf ist kein Beleg, dass die Bots gerade arbeiten."
    },
    wall: {
      ziele: [
        "Visueller Entwurf STARK Agentur-Büro zur Freigabe. Keine Produktivumsetzung in dieser Momentaufnahme.",
        "Kontext laut Auftrag: Schweizer AI-Agentur für lokale KMU, zunächst Gastro.",
        "Dargestellt sind genau fünf Bots: STARK, PIXEL, FORGE, GUARD, ATLAS.",
        "Dieser Entwurf hat keine Live-Verbindung."
      ],
      projekte: [
        {
          title: "Setup (intern)",
          tag: "MIT EINSCHRÄNKUNGEN",
          tone: "limited",
          detail:
            "SETUP-001 und SETUP-002: Erledigt. SETUP-003: Eingang, echtes Kundenbriefing fehlt. Kein verbleibender festgestellter Dokumentmangel der Setup-Unterlagen. Primary-Bot-Zuweisung: NICHT GEPRÜFT."
        },
        {
          title: "DEMO-GASTRO-001 / GASTRO-TEST-001",
          tag: "FIKTIV",
          tone: "fictional",
          detail:
            "Trattoria Demo, Olten. Ausdrücklich fiktiv, kein realer Kunde. PIXEL-Paket v1 fertig. FORGE: lokale Demo gemeldet. GUARD: Vorprüfung mit Einschränkungen. Kein Versand, keine Reservation."
        },
        {
          title: "ATLAS Pakete v1.1 (intern)",
          tag: "Entwurf",
          tone: "draft",
          detail:
            "WP-01, WP-02, WA-01, WA-02. Interne Entwürfe in atlas-pakete-wartung.md v1.1 vom 06.11.2026. Keine freigegebenen Preise."
        }
      ],
      teamaufgaben: [
        {
          bot: "STARK",
          text: "Setup-Stand und offene Freigaben im Büro zeigen. Primary-Bot-Zuweisung ist NICHT GEPRÜFT."
        },
        {
          bot: "PIXEL",
          text: "Text- und Designpaket v1 ist fertig. Offen: Du/Sie, echte Stammdaten, Bildrechte, Allergene."
        },
        {
          bot: "FORGE",
          text: "Restaurantdemo lokal erstellt gemeldet. HEAD fca28146affe49a212def17450a8b94224901d32, 06.11.2026, 22:34 Europe/Zurich. Kein Versand, keine Reservation."
        },
        {
          bot: "GUARD",
          text: "Vorprüfung 06.11.2026, 22:42 Europe/Zurich: MIT EINSCHRÄNKUNGEN. Statischer Inhalt bestanden. Browserfunktionen unabhängig NICHT GEPRÜFT."
        },
        {
          bot: "ATLAS",
          text: "Interne Entwürfe v1.1 und fiktiver Rechentest ATLAS-01. Verrechnungssätze, Marge und Verträge offen. Keine Agenturpreise."
        }
      ],
      freigaben: [
        "Primary-Bot-Zuweisung: NICHT GEPRÜFT.",
        "SETUP-003: echtes Kundenbriefing fehlt.",
        "ATLAS: keine freigegebenen Preise. Verrechnungssätze, Marge und Vertragsbedingungen offen.",
        "PIXEL: Du/Sie, Stammdaten, Bildrechte und Allergene offen.",
        "GUARD: unabhängige Browserprüfung offen. Dokumentarische Versionszuordnung zum FORGE-Prüfbericht offen.",
        "FORGE: kein Versand und keine Reservation.",
        "Freigabe dieses visuellen Entwurfs durch Alessio: offen. Keine produktive Abnahme."
      ]
    },
    bots: [
      {
        id: "stark",
        name: "STARK",
        role: "Chef / zentrale Steuerung",
        place: "Hinten mittig, erhöht",
        traits: "Dunkles kurzes Haar mit grauen Schläfen, gepflegter Bart, anthrazitfarbener Zivilanzug, offener Kragen.",
        folders: [
          {
            id: "stark-setup",
            title: "SETUP-Übersicht",
            tasks: [
              {
                id: "setup-001",
                title: "SETUP-001",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order: "SETUP-001 im Setup-Stand führen.",
                status: "Erledigt",
                statusTone: "done",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Momentaufnahme; keine separate Uhrzeit für SETUP-001 belegt)",
                files: [],
                filesNote:
                  "Kein einzelner Dateipfad für SETUP-001 im Beleg genannt.",
                preview:
                  "SETUP-001\nBelegter Stand: Erledigt.\n\nAus der Momentaufnahme vom 06.11.2026:\nSETUP-001 und SETUP-002 sind erledigt.\nFür die Setup-Unterlagen ist kein verbleibender festgestellter Dokumentmangel genannt.\n\nEin Dateiinhalt zu SETUP-001 liegt in diesem Repository nicht vor.",
                openPoints: [
                  "Keine offenen Punkte an SETUP-001 selbst belegt."
                ],
                nextStep: "Kein weiterer Schritt an SETUP-001 belegt.",
                owner:
                  "Nicht einzeln belegt. Primary-Bot-Zuweisung ist NICHT GEPRÜFT."
              },
              {
                id: "setup-002",
                title: "SETUP-002",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order: "SETUP-002 im Setup-Stand führen.",
                status: "Erledigt",
                statusTone: "done",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Momentaufnahme; keine separate Uhrzeit für SETUP-002 belegt)",
                files: [],
                filesNote:
                  "Kein einzelner Dateipfad für SETUP-002 im Beleg genannt.",
                preview:
                  "SETUP-002\nBelegter Stand: Erledigt.\n\nAus der Momentaufnahme vom 06.11.2026:\nSETUP-002 ist zusammen mit SETUP-001 erledigt.\nFür die Setup-Unterlagen ist kein verbleibender festgestellter Dokumentmangel genannt.\n\nEin Dateiinhalt zu SETUP-002 liegt in diesem Repository nicht vor.",
                openPoints: [
                  "Keine offenen Punkte an SETUP-002 selbst belegt."
                ],
                nextStep: "Kein weiterer Schritt an SETUP-002 belegt.",
                owner:
                  "Nicht einzeln belegt. Primary-Bot-Zuweisung ist NICHT GEPRÜFT."
              },
              {
                id: "setup-003",
                title: "SETUP-003",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order: "Echtes Kundenbriefing aufnehmen.",
                status: "Eingang",
                statusTone: "open",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Momentaufnahme; keine separate Uhrzeit für SETUP-003 belegt)",
                files: [],
                filesNote:
                  "Kein Dateipfad für ein Kundenbriefing genannt, weil es fehlt.",
                preview:
                  "SETUP-003\nBelegter Stand: Eingang.\n\nEchtes Kundenbriefing fehlt.\nEs gibt dazu keinen eingebetteten Briefingtext, weil keines belegt und in diesem Repository keines vorhanden ist.",
                openPoints: ["Echtes Kundenbriefing fehlt."],
                nextStep:
                  "Kundenbriefing beschaffen. Wer es liefert, ist nicht belegt.",
                owner:
                  "Nicht belegt. Primary-Bot-Zuweisung ist NICHT GEPRÜFT."
              }
            ]
          },
          {
            id: "stark-freigaben",
            title: "Freigaben",
            tasks: [
              {
                id: "freigabe-primary",
                title: "Primary-Bot-Zuweisung",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order: "Primary-Bot-Zuweisung prüfen.",
                status: "NICHT GEPRÜFT",
                statusTone: "unchecked",
                updated: "06.11.2026, Europe/Zurich (Stand der Momentaufnahme)",
                files: [],
                filesNote: "Kein Prüfberichtspfad für die Zuweisung genannt.",
                preview:
                  "Primary-Bot-Zuweisung\nBelegter Stand: NICHT GEPRÜFT.\n\nDie Zuweisung bleibt offen. Dieser Entwurf weist die Setup-Punkte deshalb keinem Bot als geprüfte Verantwortung zu.",
                openPoints: ["Prüfung der Primary-Bot-Zuweisung ist offen."],
                nextStep: "Zuweisung prüfen. Prüfperson ist nicht belegt.",
                owner: "Nicht belegt."
              },
              {
                id: "freigabe-preise",
                title: "Preise, Sätze, Marge, Verträge",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order:
                  "Freigabe der ATLAS-Entwürfe zu Preisen, Verrechnungssätzen, Marge und Vertragsbedingungen.",
                status: "Offen, keine freigegebenen Preise",
                statusTone: "open",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Datei atlas-pakete-wartung.md v1.1; keine Uhrzeit belegt)",
                files: [
                  {
                    path: "/workspace/agentur/berichte/atlas-pakete-wartung.md",
                    note: FILE_MISSING + " Version 1.1, 06.11.2026."
                  }
                ],
                filesNote: "",
                preview:
                  "Preise und Verträge\nBelegter Stand: keine freigegebenen Preise.\n\nWP-01, WP-02, WA-01 und WA-02 sind interne Entwürfe.\nOffen: Verrechnungssätze, Marge, Vertragsbedingungen.\n\nDer Rechentest ATLAS-01 ist kein Preis der Agentur.",
                openPoints: [
                  "Keine freigegebenen Preise.",
                  "Verrechnungssätze offen.",
                  "Marge offen.",
                  "Vertragsbedingungen offen."
                ],
                nextStep:
                  "Keine Preisveröffentlichung. Freigabe ist nicht erteilt.",
                owner:
                  "ATLAS führt die Entwürfe. Freigabegeber ist nicht belegt."
              },
              {
                id: "freigabe-setup-urteil",
                title: "Gesamturteil Setup",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order: "Setup-Gesamturteil aus der Momentaufnahme ausweisen.",
                status: "MIT EINSCHRÄNKUNGEN",
                statusTone: "limited",
                updated: "06.11.2026, Europe/Zurich (Stand der Momentaufnahme)",
                files: [],
                filesNote: "Kein separater Dateipfad für das Gesamturteil genannt.",
                preview:
                  "Gesamturteil Setup: MIT EINSCHRÄNKUNGEN\n\nSETUP-001: Erledigt\nSETUP-002: Erledigt\nSETUP-003: Eingang, echtes Kundenbriefing fehlt\nSetup-Unterlagen: kein verbleibender festgestellter Dokumentmangel\nPrimary-Bot-Zuweisung: NICHT GEPRÜFT",
                openPoints: [
                  "SETUP-003: echtes Kundenbriefing fehlt.",
                  "Primary-Bot-Zuweisung: NICHT GEPRÜFT."
                ],
                nextStep:
                  "Einschränkungen sichtbar halten, bis Briefing und Zuweisungsprüfung belegt sind.",
                owner:
                  "Nicht belegt. Primary-Bot-Zuweisung ist NICHT GEPRÜFT."
              }
            ]
          },
          {
            id: "stark-team",
            title: "Teamkoordination",
            tasks: [
              {
                id: "team-demo",
                title: "Fiktives Demoprojekt im Blick",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order:
                  "Einzelstände von PIXEL, FORGE, GUARD und ATLAS zur fiktiven Trattoria Demo nebeneinander halten.",
                status: "Keine Sammelfreigabe belegt",
                statusTone: "info",
                updated:
                  "06.11.2026, 22:42 Europe/Zurich (jüngster belegter Zeitstempel in diesem Projekt: GUARD-Vorprüfung; FORGE-HEAD 22:34)",
                files: [],
                filesNote:
                  "Einzeldateien stehen in den Mappen von PIXEL, FORGE, GUARD und ATLAS. Hier kein zusätzlicher Pfad.",
                preview:
                  "Koordinationssicht, kein zweiter Bearbeitungsstand.\n\nPIXEL: Text- und Designpaket v1 fertig. Offen sind Du/Sie, Stammdaten, Bildrechte, Allergene.\nFORGE: lokale Restaurantdemo gemeldet, HEAD fca28146affe49a212def17450a8b94224901d32, 06.11.2026 22:34 Europe/Zurich. Kein Versand, keine Reservation.\nGUARD: Vorprüfung 06.11.2026 22:42 Europe/Zurich, MIT EINSCHRÄNKUNGEN. Browserfunktionen unabhängig NICHT GEPRÜFT. Kein belegter Formularfehler.\nATLAS: fiktiver Rechentest, keine Agenturpreise.\n\nEine Sammelfreigabe des Demoprojekts ist nicht belegt.",
                openPoints: [
                  "Keine Sammelfreigabe belegt.",
                  "Offene Punkte der einzelnen Bots bleiben in deren Mappen."
                ],
                nextStep:
                  "Keine zusätzliche Freigabe aus dieser Koordinationssicht ableiten.",
                owner:
                  "STARK zeigt die Sicht. Primary-Bot-Zuweisung ist NICHT GEPRÜFT."
              },
              {
                id: "team-entwurf",
                title: "Freigabe des visuellen Entwurfs",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order:
                  "Diesen lokalen Pixel-Entwurf Alessio zur Optikprüfung vorlegen.",
                status: "Offen, keine produktive Abnahme",
                statusTone: "open",
                updated: "06.11.2026, Europe/Zurich (Datum dieses Entwurfs)",
                files: [],
                filesNote:
                  "Der Entwurf liegt als index.html in diesem Repository, nicht als externer Link.",
                preview:
                  "Visueller Entwurf STARK Agentur-Büro.\nStatus: lokale Momentaufnahme zur Prüfung.\n\nKeine produktive Abnahme.\nOptik prüft Alessio.\nDie dekorative Animation ist kein Arbeitsnachweis.\nKeine Live-Verbindung.",
                openPoints: [
                  "Optikfreigabe durch Alessio offen.",
                  "Keine produktive Abnahme ausgesprochen."
                ],
                nextStep: "Alessio prüft die Optik.",
                owner: "Alessio für die Optikprüfung. Nicht als Bot-Zuweisung geprüft."
              }
            ]
          }
        ]
      },
      {
        id: "pixel",
        name: "PIXEL",
        role: "Webdesign",
        place: "Vorne, erster Platz von links",
        traits: "Platinblonder asymmetrischer Bob, schwarzer Rollkragen, Brille.",
        folders: [
          {
            id: "pixel-01",
            title: "PIXEL-01 Designpaket Trattoria Demo",
            tasks: [
              {
                id: "pixel-01-v1",
                title: "Text- und Designpaket v1",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order:
                  "Text- und Designpaket v1 für die fiktive Trattoria Demo.",
                status: "Fertig (Paket v1)",
                statusTone: "done",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Momentaufnahme; keine separate Uhrzeit für PIXEL-01 belegt)",
                files: [
                  {
                    path: "/workspace/agentur/kunden/DEMO-GASTRO-001/GASTRO-TEST-001/PIXEL-01-paket.md",
                    note: FILE_MISSING
                  },
                  {
                    path: "pixel-01-mockup.html",
                    note:
                      "Dateiname laut Beleg. Ein voller Pfad ist nicht separat genannt. Projektordner des Pakets: /workspace/agentur/kunden/DEMO-GASTRO-001/GASTRO-TEST-001/. Datei hier nicht vorhanden, kein Link."
                  },
                  {
                    path: "pixel-01-mockup.png",
                    note:
                      "Dateiname laut Beleg. Ein voller Pfad ist nicht separat genannt. Projektordner des Pakets: /workspace/agentur/kunden/DEMO-GASTRO-001/GASTRO-TEST-001/. Datei hier nicht vorhanden, kein Link."
                  }
                ],
                filesNote: "",
                preview:
                  "PIXEL-01 Paket v1\nKunde ausdrücklich FIKTIV: Trattoria Demo, Olten\nclient_id: DEMO-GASTRO-001\nproject_id: GASTRO-TEST-001\n\nBelegt: Text- und Designpaket v1 ist fertig.\nDas ist keine echte Kundenfreigabe.\n\nDer Originaltext der Paketdatei und die Mockups liegen in diesem Repository nicht.\nEingebettet ist nur der belegte Inhalt der Momentaufnahme, kein erfundener Webseitentext.\n\nOffen laut Beleg: Du/Sie, echte Stammdaten, Bildrechte, Allergene.",
                openPoints: [
                  "Anrede Du oder Sie ist offen.",
                  "Echte Stammdaten sind offen.",
                  "Bildrechte sind offen.",
                  "Allergene sind offen."
                ],
                nextStep:
                  "Die vier offenen Punkte klären. Eine Freigabe des Pakets als echter Kundenauftrag ist nicht belegt.",
                owner: "PIXEL für das Paket v1."
              }
            ]
          },
          {
            id: "pixel-01-offen",
            title: "PIXEL-01 offene Klärungen",
            tasks: [
              {
                id: "pixel-anrede",
                title: "Anrede Du oder Sie",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order: "Anrede Du oder Sie für die fiktive Trattoria Demo festlegen.",
                status: "Offen",
                statusTone: "open",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Momentaufnahme; keine Uhrzeit der Klärung, weil keine vorliegt)",
                files: [],
                filesNote: "Kein Ergebnisdokument zur Anrede genannt.",
                preview:
                  "Anrede Du oder Sie\nBelegter Stand: offen.\n\nKein entschiedenes Ergebnis.\nEs wird keine Anrede erfunden.",
                openPoints: ["Du oder Sie ist nicht festgelegt."],
                nextStep: "Anrede festlegen, bevor ein echter Text darauf aufbaut.",
                owner: "PIXEL führt den offenen Punkt. Entscheider ist nicht belegt."
              },
              {
                id: "pixel-stammdaten",
                title: "Echte Stammdaten",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order: "Echte Stammdaten klären. Die Trattoria bleibt ein fiktiver Demo-Kunde.",
                status: "Offen",
                statusTone: "open",
                updated: "06.11.2026, Europe/Zurich (Datum der Momentaufnahme)",
                files: [],
                filesNote: "Keine Stammdaten-Datei belegt.",
                preview:
                  "Echte Stammdaten\nBelegter Stand: offen.\n\nKeine Adresse, keine Telefonnummer und keine weiteren echten Betriebsdaten sind in der Momentaufnahme enthalten.\nTrattoria Demo, Olten bleibt ausdrücklich fiktiv.\nEs werden keine Stammdaten ergänzt.",
                openPoints: ["Echte Stammdaten fehlen."],
                nextStep: "Stammdaten nur aus einer echten Quelle übernehmen.",
                owner: "PIXEL führt den offenen Punkt."
              },
              {
                id: "pixel-bildrechte",
                title: "Bildrechte",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order: "Bildrechte für das Designpaket klären.",
                status: "Offen",
                statusTone: "open",
                updated: "06.11.2026, Europe/Zurich (Datum der Momentaufnahme)",
                files: [],
                filesNote: "Kein Rechte-Nachweis im Beleg genannt.",
                preview:
                  "Bildrechte\nBelegter Stand: offen.\n\nEin Rechte-Nachweis ist nicht belegt und hier nicht eingebettet.\nDie Pixelzeichnung dieses Büros ist ein eigener Entwurf und kein Kundenbild.",
                openPoints: ["Bildrechte sind nicht geklärt."],
                nextStep: "Rechte klären, bevor Bilder als freigegeben gelten.",
                owner: "PIXEL führt den offenen Punkt."
              },
              {
                id: "pixel-allergene",
                title: "Allergene",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order: "Allergen-Angaben für die fiktive Speisekarte klären.",
                status: "Offen",
                statusTone: "open",
                updated: "06.11.2026, Europe/Zurich (Datum der Momentaufnahme)",
                files: [],
                filesNote: "Keine Allergenliste im Beleg genannt.",
                preview:
                  "Allergene\nBelegter Stand: offen.\n\nKeine Allergenliste ist belegt.\nEs wird keine Allergen-Tabelle erfunden.\nGUARD hat statisch nur festgehalten: Margherita CHF 18. Das ist keine Allergen-Angabe.",
                openPoints: ["Allergene sind nicht belegt."],
                nextStep: "Allergenangaben aus einer echten Quelle klären.",
                owner: "PIXEL führt den offenen Punkt."
              }
            ]
          }
        ]
      },
      {
        id: "forge",
        name: "FORGE",
        role: "Entwicklung",
        place: "Vorne, zweiter Platz von links",
        traits: "Breitschultrig, dunkles Hemd, hochgekrempelte Ärmel, Lederschürze.",
        folders: [
          {
            id: "forge-01",
            title: "FORGE-01 lokale Demo GASTRO-TEST-001",
            tasks: [
              {
                id: "forge-01-demo",
                title: "Lokale Restaurantdemo",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order:
                  "Restaurantdemo GASTRO-TEST-001 lokal erstellen.",
                status: "Lokale Implementierung gemeldet",
                statusTone: "reported",
                updated: "06.11.2026, 22:34 Europe/Zurich (Zeitstempel des gemeldeten HEAD)",
                files: [
                  {
                    path: "/workspace/agentur/projekte/GASTRO-TEST-001/",
                    note:
                      FILE_MISSING +
                      " Ordner laut Beleg. HEAD wurde in diesem dashboardbuero-Repository nicht geprüft."
                  }
                ],
                filesNote: "",
                preview:
                  "FORGE-01 Restaurantdemo\nProjekt: GASTRO-TEST-001 (ausdrücklich fiktiv)\nOrt laut Beleg: /workspace/agentur/projekte/GASTRO-TEST-001/\n\nGemeldet: lokal erstellt.\nHEAD: fca28146affe49a212def17450a8b94224901d32\nZeit: 06.11.2026, 22:34 Europe/Zurich\n\nDieser HEAD ist eine Meldung aus der Momentaufnahme.\nEr wurde im Repository dashboardbuero nicht nachgeprüft.\n\nFORGEs eigene Browser-Tests sind nicht als unabhängige Abnahme zu lesen.\nKein Versand. Keine Reservation.\n\nDer Ordnerinhalt liegt hier nicht vor. Kein Quelltext wird nacherfunden.",
                openPoints: [
                  "Kein Versand.",
                  "Keine Reservation.",
                  "Unabhängige Abnahme ist mit dieser Meldung nicht erfolgt."
                ],
                nextStep:
                  "Kein Versand und keine Reservation. Ein nächster Entwicklungsschritt über die Meldung hinaus ist nicht belegt.",
                owner: "FORGE für die gemeldete lokale Umsetzung."
              }
            ]
          },
          {
            id: "forge-01-grenzen",
            title: "FORGE-01 Grenzen der Meldung",
            tasks: [
              {
                id: "forge-01-grenzen-task",
                title: "Was die Meldung nicht abdeckt",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order:
                  "Liefergrenzen der FORGE-Meldung festzuhalten.",
                status: "Grenzen belegt",
                statusTone: "limited",
                updated: "06.11.2026, 22:34 Europe/Zurich (HEAD) und 22:42 Europe/Zurich (GUARD-Vorprüfung)",
                files: [
                  {
                    path: "/workspace/agentur/projekte/GASTRO-TEST-001/",
                    note: FILE_MISSING
                  }
                ],
                filesNote: "",
                preview:
                  "Grenzen der FORGE-Meldung\n\nBelegt ist eine lokale Umsetzung, kein Versand und keine Reservation.\nEigene Browser-Tests von FORGE gelten nicht als unabhängige Abnahme.\n\nGUARD hat danach, 06.11.2026 um 22:42 Europe/Zurich, eine Vorprüfung mit Einschränkungen gemacht.\nStatisch bestanden laut GUARD: Öffnungszeiten Di–Sa 17–22, So/Mo zu; Margherita CHF 18; Demohinweis ohne Versand und ohne Reservation.\nBrowserfunktionen blieben unabhängig NICHT GEPRÜFT.\n\nDie dokumentarische Versionszuordnung zwischen FORGE-Prüfbericht und dieser Meldung ist offen.",
                openPoints: [
                  "Versionszuordnung zum FORGE-Prüfbericht ist offen.",
                  "Browserfunktionen sind von GUARD unabhängig NICHT GEPRÜFT.",
                  "Kein Versand, keine Reservation."
                ],
                nextStep:
                  "Keine Ausweitung der Meldung auf Versand, Reservation oder unabhängige Abnahme.",
                owner: "FORGE für die Meldung. GUARD für die separate Vorprüfung."
              }
            ]
          }
        ]
      },
      {
        id: "guard",
        name: "GUARD",
        role: "Qualität",
        place: "Vorne, dritter Platz von links",
        traits: "Schwarze zurückgebundene Haare, dunkelblaue Jacke, kleines Scanvisier.",
        folders: [
          {
            id: "guard-01",
            title: "GUARD-01 Vorprüfung Demo",
            tasks: [
              {
                id: "guard-01-vorpruefung",
                title: "Inhalts- und Artefaktvorprüfung",
                customer:
                  "DEMO-GASTRO-001 · Trattoria Demo, Olten · Projekt GASTRO-TEST-001 · ausdrücklich FIKTIV",
                fictional: true,
                order:
                  "Unabhängige Vorprüfung des statischen Demo-Inhalts und der Artefakte.",
                status: "MIT EINSCHRÄNKUNGEN",
                statusTone: "limited",
                updated: "06.11.2026, 22:42 Europe/Zurich",
                files: [],
                filesNote:
                  "Kein Dateipfad für den GUARD-Bericht im Beleg genannt. Es wird keiner erfunden.",
                preview:
                  "GUARD-01 Vorprüfung Restaurantdemo\n06.11.2026, 22:42 Europe/Zurich\nUrteil: MIT EINSCHRÄNKUNGEN\n\nStatisch bestanden:\n- Öffnungszeiten: Di–Sa 17–22, So/Mo zu\n- Margherita: CHF 18\n- Demohinweis ohne Versand und ohne Reservation\n\nBrowserfunktionen: unabhängig NICHT GEPRÜFT\nGrund: blockierter Browserzugriff\nBelegter Formularfehler: keiner\n\nDiese Vorprüfung gilt der Restaurantdemo, nicht der Abnahme dieses Büro-Entwurfs.\nDokumentarische Versionszuordnung zum FORGE-Prüfbericht: offen.\n\nEin Berichtstext über diese Sätze hinaus liegt hier nicht vor.",
                openPoints: [
                  "Browserfunktionen unabhängig NICHT GEPRÜFT (blockierter Browserzugriff).",
                  "Dokumentarische Versionszuordnung zum FORGE-Prüfbericht offen.",
                  "Kein belegter Formularfehler. Das ist keine Aussage, dass Formulare geprüft wurden."
                ],
                nextStep:
                  "Browserfunktionen unabhängig prüfen, sobald ein Zugriff besteht. Versionszuordnung dokumentieren.",
                owner: "GUARD für diese Vorprüfung."
              }
            ]
          },
          {
            id: "guard-setup",
            title: "Setup-Nachprüfung",
            tasks: [
              {
                id: "guard-setup-nachpruefung",
                title: "Setup-Unterlagen laut Momentaufnahme",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order:
                  "Den belegten Setup-Stand als Nachprüfungssicht zeigen.",
                status: "MIT EINSCHRÄNKUNGEN",
                statusTone: "limited",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Momentaufnahme). Ein separater GUARD-Zeitstempel nur für das Setup ist nicht belegt, anders als 22:42 für die Demo-Vorprüfung.",
                files: [],
                filesNote:
                  "Kein Dateipfad einer Setup-Nachprüfung genannt.",
                preview:
                  "Setup-Nachprüfung\nUrteil laut Momentaufnahme: MIT EINSCHRÄNKUNGEN\n\nSETUP-001: Erledigt\nSETUP-002: Erledigt\nSETUP-003: Eingang, echtes Kundenbriefing fehlt\nSetup-Unterlagen: kein verbleibender festgestellter Dokumentmangel\nPrimary-Bot-Zuweisung: NICHT GEPRÜFT\n\nDiese Mappe übernimmt den belegten Setup-Stand.\nSie behauptet keine zweite, zeitgestempelte GUARD-Prüfung des Setups, weil dafür kein eigener Zeitstempel belegt ist.",
                openPoints: [
                  "Echtes Kundenbriefing zu SETUP-003 fehlt.",
                  "Primary-Bot-Zuweisung ist NICHT GEPRÜFT.",
                  "Eigener GUARD-Zeitstempel für das Setup ist nicht belegt."
                ],
                nextStep:
                  "Keine zusätzliche Setup-Freigabe aus dieser Mappe ableiten.",
                owner:
                  "Nicht als geprüfte GUARD-Abnahme des Setups belegt. Primary-Bot-Zuweisung ist NICHT GEPRÜFT."
              }
            ]
          }
        ]
      },
      {
        id: "atlas",
        name: "ATLAS",
        role: "Business",
        place: "Vorne, vierter Platz von links",
        traits: "Silbernes Haar, dunkelgrüner Blazer.",
        folders: [
          {
            id: "atlas-pakete",
            title: "atlas-pakete-wartung v1.1",
            tasks: [
              {
                id: "atlas-pakete-v11",
                title: "Interne Entwürfe WP-01, WP-02, WA-01, WA-02",
                customer: "Intern / kein echter Kunde",
                fictional: false,
                order:
                  "Interne Paketentwürfe WP-01, WP-02, WA-01 und WA-02 in Version 1.1 führen.",
                status: "Interner Entwurf, keine freigegebenen Preise",
                statusTone: "draft",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Datei v1.1; keine Uhrzeit belegt)",
                files: [
                  {
                    path: "/workspace/agentur/berichte/atlas-pakete-wartung.md",
                    note: FILE_MISSING + " Version 1.1, 06.11.2026."
                  }
                ],
                filesNote: "",
                preview:
                  "atlas-pakete-wartung.md\nVersion: 1.1\nDatum: 06.11.2026\nPfad: /workspace/agentur/berichte/atlas-pakete-wartung.md\n\nEnthalten: WP-01, WP-02, WA-01, WA-02.\nStatus: interne Entwürfe.\nFreigegebene Preise: keine.\nOffen: Verrechnungssätze, Marge, Vertragsbedingungen.\n\nDer Dateiinhalt lag in diesem Repository nicht vor.\nGezeigt werden nur die im Auftrag belegten Angaben, keine Preistabellen.",
                openPoints: [
                  "Keine freigegebenen Preise.",
                  "Verrechnungssätze offen.",
                  "Marge offen.",
                  "Vertragsbedingungen offen."
                ],
                nextStep:
                  "Entwürfe nicht als Preise veröffentlichen. Freigabe einholen, Freigabegeber ist nicht belegt.",
                owner: "ATLAS für die Entwürfe v1.1."
              }
            ]
          },
          {
            id: "atlas-01",
            title: "ATLAS-01 fiktiver Rechentest",
            tasks: [
              {
                id: "atlas-01-rechentest",
                title: "Rechenbeispiel Kosten und Testpreis",
                customer:
                  "Intern / kein echter Kunde · fiktives Rechenbeispiel, keine Agenturpreise",
                fictional: true,
                order:
                  "Den belegten fiktiven Rechentest ATLAS-01 sichtbar machen.",
                status: "Rechentest belegt, keine Agenturpreise",
                statusTone: "info",
                updated:
                  "06.11.2026, Europe/Zurich (Datum der Momentaufnahme; keine separate Uhrzeit für ATLAS-01 belegt)",
                files: [],
                filesNote:
                  "Kein separater Dateipfad nur für ATLAS-01 im Beleg genannt.",
                preview:
                  "ATLAS-01 Rechentest\nNur fiktives Rechenbeispiel. Keine Agenturpreise. Keine Freigabe.\n\nKosten: CHF 44 pro Monat\nKosten: CHF 528 pro Jahr\nAngenommene Umsatzmarge: 40 %\nMindestpreis bei 40 % Marge: CHF 73.34 pro Monat\nTestpreis: CHF 79\nÜberschuss: CHF 420 pro Jahr\nMarge beim Testpreis: ca. 44.30 %\n\nDie Zahlen sind aus der Momentaufnahme übernommen, nicht neu kalkuliert und nicht als Angebot zu lesen.",
                openPoints: [
                  "Keine Übertragung auf WP-01, WP-02, WA-01 oder WA-02.",
                  "Verrechnungssätze, Marge und Verträge der Pakete bleiben offen."
                ],
                nextStep:
                  "Rechentest nicht als Preis verwenden.",
                owner: "ATLAS für den ausgewiesenen Rechentest."
              }
            ]
          }
        ]
      }
    ]
  };
});
