import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const data = require(path.join(root, "js/snapshot.js"));
const json = JSON.parse(fs.readFileSync(path.join(root, "data/snapshot.json"), "utf8"));
const errors = [];

if (JSON.stringify(data) !== JSON.stringify(json)) {
  errors.push("data/snapshot.json weicht von js/snapshot.js ab");
}

if (data.bots.length !== 5) errors.push("nicht genau fünf Bots");
const names = data.bots.map(function (bot) { return bot.name; }).join(",");
if (names !== "STARK,PIXEL,FORGE,GUARD,ATLAS") errors.push("Bot-Reihenfolge " + names);

let folders = 0;
let tasks = 0;
data.bots.forEach(function (bot) {
  if (bot.folders.length < 2) errors.push(bot.name + " hat weniger als zwei Mappen");
  bot.folders.forEach(function (folder) {
    folders += 1;
    if (!folder.tasks.length) errors.push("leere Mappe " + folder.id);
    folder.tasks.forEach(function (task) {
      tasks += 1;
      ["customer", "order", "status", "updated", "preview", "nextStep", "owner"].forEach(function (key) {
        if (!String(task[key] || "").trim()) errors.push(task.id + " ohne " + key);
      });
      if (!task.openPoints.length) errors.push(task.id + " ohne offene Punkte");
      if (task.updated.indexOf("Europe/Zurich") < 0) errors.push(task.id + " ohne Europe/Zurich");
    });
  });
});

const blob = JSON.stringify(data);
[
  "DEMO-GASTRO-001",
  "GASTRO-TEST-001",
  "Trattoria Demo",
  "fca28146affe49a212def17450a8b94224901d32",
  "22:34",
  "22:42",
  "CHF 44",
  "CHF 73.34",
  "44.30",
  "WP-01",
  "WP-02",
  "WA-01",
  "WA-02",
  "NICHT GEPRÜFT",
  "MIT EINSCHRÄNKUNGEN",
  "SETUP-001",
  "SETUP-003",
  "Margherita",
  "CHF 18",
  "Lokaler Entwurf · Momentaufnahme 06.11.2026 · Europe/Zurich · keine Live-Verbindung",
  "Dekorative Animation — kein Live-Arbeitsnachweis"
].forEach(function (needle) {
  if (blob.indexOf(needle) < 0) errors.push("fehlt im Snapshot: " + needle);
});

const files = ["index.html", "css/office.css", "js/app.js", "js/scene.js", "js/snapshot.js", "data/snapshot.json"];
const forbidden = [
  /ß/,
  /grok/i,
  /trading/i,
  /profit/i,
  /file:\/\//i,
  /https?:\/\//i,
  /fonts\.google/i,
  /cdn\./i,
  /math\.random/i,
  /\bfetch\s*\(/i,
  /xmlhttprequest/i,
  /websocket/i,
  /sendbeacon/i,
  /\bscout\b/i,
  /\bnexus\b/i,
  /\becho\b/i,
  /\bpulse\b/i
];
files.forEach(function (file) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  forbidden.forEach(function (pattern) {
    if (pattern.test(text)) errors.push(file + " enthält " + pattern);
  });
});

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("static ok: " + folders + " Mappen, " + tasks + " Aufgaben");
