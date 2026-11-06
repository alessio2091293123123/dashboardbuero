import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const PORT = 9333;
const ART = "/opt/cursor/artifacts";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PAGE = pathToFileURL(path.join(ROOT, "index.html")).href;
fs.mkdirSync(ART, { recursive: true });
fs.rmSync("/tmp/chrome-stark-flow", { recursive: true, force: true });

const chrome = spawn("google-chrome", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--disable-background-networking",
  "--disable-component-update",
  "--no-first-run",
  `--remote-debugging-port=${PORT}`,
  "--user-data-dir=/tmp/chrome-stark-flow",
  "about:blank"
], { stdio: "ignore" });

const failures = [];
const notes = [];
let ws;

function fail(message) {
  failures.push(message);
  console.error("FAIL " + message);
}

function sleep(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

async function waitForPort() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      if (response.ok) return response.json();
    } catch (error) {
      await sleep(200);
    }
  }
  throw new Error("Chrome-Debugging nicht erreichbar");
}

function connect(url) {
  return new Promise(function (resolve, reject) {
    const socket = new WebSocket(url);
    const pending = new Map();
    let seq = 0;
    socket.addEventListener("open", function () { resolve(api); });
    socket.addEventListener("error", function () { reject(new Error("WebSocket fehlgeschlagen")); });
    socket.addEventListener("message", function (event) {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const item = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) item.reject(new Error(JSON.stringify(message.error)));
        else item.resolve(message.result);
      }
    });
    function send(method, params) {
      const id = ++seq;
      return new Promise(function (resolveSend, rejectSend) {
        pending.set(id, { resolve: resolveSend, reject: rejectSend });
        socket.send(JSON.stringify({ id: id, method: method, params: params || {} }));
      });
    }
    const api = { send: send, socket: socket };
  });
}

async function evaluate(expression) {
  const result = await ws.send("Runtime.evaluate", {
    expression: expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text + " " + (result.exceptionDetails.exception && result.exceptionDetails.exception.description || ""));
  }
  return result.result.value;
}

async function shot(name, width, height) {
  await ws.send("Emulation.setDeviceMetricsOverride", {
    width: width,
    height: height,
    deviceScaleFactor: 1,
    mobile: width < 700
  });
  await sleep(150);
  const image = await ws.send("Page.captureScreenshot", { format: "png" });
  const file = path.join(ART, name);
  fs.writeFileSync(file, Buffer.from(image.data, "base64"));
  notes.push(file + " " + width + "x" + height);
}

async function key(name, code, keyCode) {
  const down = {
    type: "keyDown",
    key: name,
    code: code,
    windowsVirtualKeyCode: keyCode,
    nativeVirtualKeyCode: keyCode
  };
  if (name === "Enter") down.text = "\r";
  await ws.send("Input.dispatchKeyEvent", down);
  await ws.send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: name,
    code: code,
    windowsVirtualKeyCode: keyCode,
    nativeVirtualKeyCode: keyCode
  });
}

const flows = [
  ["mappe-stark-setup", "STARK", "SETUP-001", "Erledigt", "SETUP-001"],
  ["mappe-pixel-01", "PIXEL", "DEMO-GASTRO-001", "Paket v1", "FIKTIV"],
  ["mappe-forge-01", "FORGE", "fca28146affe49a212def17450a8b94224901d32", "22:34", "Keine Reservation"],
  ["mappe-guard-01", "GUARD", "22:42", "MIT EINSCHRÄNKUNGEN", "Margherita"],
  ["mappe-atlas-pakete", "ATLAS", "WP-01", "WA-02", "keine freigegebenen Preise"]
];

try {
  await waitForPort();
  const pages = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = pages.find(function (item) { return item.type === "page"; });
  ws = await connect(page.webSocketDebuggerUrl);
  await ws.send("Page.enable");
  await ws.send("Runtime.enable");
  await ws.send("Page.navigate", { url: PAGE });
  let ready = false;
  for (let i = 0; i < 30; i += 1) {
    await sleep(200);
    const banner = await evaluate("document.getElementById('banner') ? document.getElementById('banner').textContent : ''");
    if (banner && banner.indexOf("Lokaler Entwurf") === 0) {
      ready = true;
      break;
    }
  }
  if (!ready) fail("Seite nicht geladen");

  const resources = await evaluate("performance.getEntriesByType('resource').map(function (entry) { return entry.name; })");
  notes.push("Ressourcen: " + JSON.stringify(resources));
  resources.forEach(function (name) {
    if (/^https?:/i.test(name)) fail("externer Request " + name);
  });

  const banner = await evaluate("document.getElementById('banner').textContent");
  if (banner !== "Lokaler Entwurf · Momentaufnahme 06.11.2026 · Europe/Zurich · keine Live-Verbindung") {
    fail("Banner falsch: " + banner);
  }
  const anim = await evaluate("document.getElementById('anim-note').textContent");
  if (anim !== "Dekorative Animation — kein Live-Arbeitsnachweis") fail("Animationstext falsch");
  const errorText = await evaluate("document.getElementById('datenfehler').textContent");
  if (errorText) fail("Datenfehler: " + errorText);

  for (const flow of flows) {
    await evaluate("document.getElementById('" + flow[0] + "').click()");
    await sleep(50);
    const state = await evaluate(`(function () {
      var dialog = document.getElementById("dialog");
      var preview = document.getElementById("dlg-ergebnis");
      var html = dialog.innerHTML;
      return {
        open: dialog.open,
        text: dialog.innerText,
        preview: preview ? preview.textContent : "",
        links: html.indexOf("<a ") >= 0 || html.toLowerCase().indexOf("file:") >= 0,
        crumb: document.getElementById("dlg-breadcrumb") ? document.getElementById("dlg-breadcrumb").textContent : "",
        focus: document.activeElement ? document.activeElement.id : ""
      };
    })()`);
    if (!state.open) fail(flow[0] + " Dialog nicht offen");
    ["Mappe", "Aufgabe", "Ergebnis", flow[1], flow[2], flow[3], flow[4], "Europe/Zurich", "Nächster Schritt", "Besitzer"].forEach(function (needle) {
      if ((state.text + state.preview + state.crumb).indexOf(needle) < 0) fail(flow[0] + " ohne " + needle);
    });
    if (!state.preview || state.preview.length < 40) fail(flow[0] + " Ergebnisvorschau leer");
    if (state.links) fail(flow[0] + " enthält einen Link");
    if (state.crumb.indexOf("Mappe:") < 0 || state.crumb.indexOf("Aufgabe:") < 0 || state.crumb.indexOf("Ergebnis:") < 0) {
      fail(flow[0] + " Brotkrumen unvollständig");
    }
    await key("Escape", "Escape", 27);
    await sleep(50);
    const closed = await evaluate(`(function () {
      return { open: document.getElementById("dialog").open, focus: document.activeElement ? document.activeElement.id : "" };
    })()`);
    if (closed.open) fail(flow[0] + " Escape schliesst nicht");
    if (closed.focus !== flow[0]) fail(flow[0] + " Fokus nach Escape ist " + closed.focus);
  }

  await evaluate("document.getElementById('mappe-stark-setup').click()");
  await evaluate("document.getElementById('aufgabe-setup-003').click()");
  const setup = await evaluate("document.getElementById('dlg-ergebnis').textContent");
  if (setup.indexOf("Eingang") < 0 || setup.indexOf("Kundenbriefing") < 0) fail("SETUP-003 Ergebnis fehlt");
  await evaluate("document.getElementById('dlg-mappe-stark-freigaben').click()");
  await evaluate("document.getElementById('aufgabe-freigabe-preise').click()");
  const prices = await evaluate("document.getElementById('dlg-ergebnis').textContent");
  if (prices.indexOf("keine freigegebenen Preise") < 0) fail("Freigaben-Ergebnis fehlt: " + prices.slice(0, 180));
  await key("Escape", "Escape", 27);

  await evaluate("document.getElementById('mappe-pixel-01-offen').click()");
  await evaluate("document.getElementById('aufgabe-pixel-anrede').click()");
  const anrede = await evaluate("document.getElementById('dlg-ergebnis').textContent");
  if (anrede.indexOf("offen") < 0) fail("Anrede-Ergebnis fehlt");
  await evaluate("document.getElementById('aufgabe-pixel-allergene').click()");
  const allergene = await evaluate("(document.getElementById('dlg-breadcrumb') || {}).textContent + ' || ' + (document.getElementById('dlg-ergebnis') || {}).textContent");
  if (!allergene || allergene.indexOf("Allergene") < 0 || allergene.indexOf("erfunden") < 0) fail("Allergene-Ergebnis fehlt: " + allergene);
  await key("Escape", "Escape", 27);

  await evaluate("document.querySelector('.hotspot').click()");
  const hotspot = await evaluate("document.getElementById('dialog').open && document.getElementById('dlg-title').textContent");
  if (!hotspot || hotspot.indexOf("STARK") < 0) fail("Arbeitsplatz-Klick öffnet nicht STARK: " + hotspot);
  await evaluate("document.getElementById('dlg-close').click()");
  await sleep(100);

  await evaluate("document.addEventListener('keydown', function (event) { window.__k = (window.__k || []).concat(event.key + '@' + (document.activeElement && document.activeElement.id) + '/open=' + document.getElementById('dialog').open); }, true); var button = document.getElementById('mappe-stark-setup'); button.focus(); button.id");
  await sleep(50);
  await key("ArrowDown", "ArrowDown", 40);
  const moved = await evaluate("JSON.stringify({ id: document.activeElement.id, keys: window.__k, inert: document.getElementById('app').inert, open: document.getElementById('dialog').open })");
  if (moved.indexOf("mappe-stark-freigaben") < 0) fail("Pfeiltaste: " + moved);
  await key("Enter", "Enter", 13);
  await sleep(50);
  const viaKey = await evaluate("document.getElementById('dialog').open && document.getElementById('dlg-breadcrumb').textContent");
  if (!viaKey || viaKey.indexOf("Freigaben") < 0) fail("Enter öffnet nicht die Freigaben: " + viaKey);
  const inside = await evaluate(`(function () {
    var nodes = [];
    var current = document.activeElement;
    for (var i = 0; i < 6; i += 1) {
      nodes.push(current ? current.id || current.tagName : "");
      current = current ? current.parentElement : null;
    }
    return document.getElementById("dialog").contains(document.activeElement);
  })()`);
  if (!inside) fail("Fokus liegt ausserhalb des Dialogs");
  await key("Tab", "Tab", 9);
  const still = await evaluate("document.getElementById('dialog').contains(document.activeElement)");
  if (!still) fail("Tab verlässt den Dialog");
  await key("Escape", "Escape", 27);

  const before = await evaluate("document.getElementById('stage').style.width");
  await evaluate("document.getElementById('zoom-in').click()");
  const after = await evaluate("document.getElementById('stage').style.width");
  if (before === after) fail("Zoom ändert die Breite nicht");
  const zoomText = await evaluate("document.getElementById('zoom-label').textContent");
  if (zoomText.indexOf("keine 3D-Ansicht") < 0) fail("Zoom-Text ohne 3D-Hinweis");
  await evaluate("document.getElementById('zoom-reset').click()");

  const running = await evaluate("document.body.dataset.animation");
  if (running !== "running") fail("Animation sollte ohne reduced-motion laufen, ist " + running);
  await evaluate("document.getElementById('anim-toggle').click()");
  const paused = await evaluate("document.body.dataset.animation");
  if (paused !== "paused") fail("Pause setzt nicht aus");
  const pressed = await evaluate("document.getElementById('anim-toggle').getAttribute('aria-pressed')");
  if (pressed !== "true") fail("aria-pressed nach Pause ist " + pressed);

  await ws.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  await evaluate("window.scrollTo(0, 0)");
  await shot("desktop-buero.png", 1440, 1100);
  await evaluate("document.getElementById('mappe-pixel-01').click()");
  await evaluate("document.getElementById('dlg-ergebnis').scrollIntoView({ block: 'center' })");
  await shot("dialog-pixel-ergebnis.png", 1440, 1100);
  await evaluate("document.getElementById('mappe-stark-setup').click()");
  await shot("dialog-stark.png", 1440, 1000);
  await evaluate("document.getElementById('mappe-forge-01').click()");
  await shot("dialog-forge.png", 1440, 1000);
  await evaluate("document.getElementById('mappe-guard-01').click()");
  await shot("dialog-guard.png", 1440, 1000);
  await evaluate("document.getElementById('mappe-atlas-01').click()");
  await shot("dialog-atlas.png", 1440, 1000);
  await key("Escape", "Escape", 27);
  await evaluate("document.getElementById('mappen').scrollIntoView({ block: 'start' })");
  await shot("desktop-mappen.png", 1440, 1000);

  await evaluate("window.scrollTo(0, 0)");
  await shot("mobile-buero.png", 390, 844);
  await evaluate("document.getElementById('mappe-guard-01').click()");
  await shot("mobile-dialog.png", 390, 844);
  await key("Escape", "Escape", 27);

  const counts = await evaluate(`(function () {
    return {
      bots: document.querySelectorAll(".bot-card").length,
      mappen: document.querySelectorAll(".mappe").length,
      hotspots: document.querySelectorAll(".hotspot").length
    };
  })()`);
  notes.push("Zähler " + JSON.stringify(counts));
  if (counts.bots !== 5) fail("Bot-Karten " + counts.bots);
  if (counts.mappen < 10) fail("zu wenige Mappen " + counts.mappen);
} catch (error) {
  fail(error && error.stack ? error.stack : String(error));
} finally {
  try { if (ws) ws.socket.close(); } catch (error) { /* bereits zu */ }
  chrome.kill("SIGKILL");
}

console.log(notes.join("\n"));
if (failures.length) {
  console.error(failures.length + " Fehler");
  process.exit(1);
}
console.log("browser ok");
