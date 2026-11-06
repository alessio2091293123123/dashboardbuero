(function () {
  "use strict";

  var data = window.STARK_SNAPSHOT;
  var dialog = document.getElementById("dialog");
  var app = document.getElementById("app");
  var roster = document.getElementById("roster");
  var current = null;
  var scale = 1;
  var reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = reducedQuery.matches;
  var paused = true;
  var userSetPause = false;

  function el(tag, attrs) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "class") node.className = attrs[key];
        else if (attrs[key] !== undefined && attrs[key] !== null) node.setAttribute(key, String(attrs[key]));
      });
    }
    return node;
  }

  function add(parent, node) {
    parent.appendChild(node);
    return node;
  }

  function findBot(id) {
    return data.bots.find(function (bot) { return bot.id === id; }) || null;
  }

  function findFolder(bot, id) {
    return bot.folders.find(function (folder) { return folder.id === id; }) || null;
  }

  function findTask(folder, id) {
    return folder.tasks.find(function (task) { return task.id === id; }) || null;
  }

  function toneClass(tone) {
    if (tone === "done") return "tag tag-done";
    if (tone === "limited") return "tag tag-limited";
    if (tone === "open") return "tag tag-open";
    if (tone === "unchecked") return "tag tag-unchecked";
    if (tone === "reported") return "tag tag-reported";
    if (tone === "draft") return "tag tag-draft";
    if (tone === "fictional") return "tag tag-fictional";
    return "tag tag-info";
  }

  function renderWall() {
    var root = document.getElementById("wand-body");
    var blocks = [
      ["Ziele", data.wall.ziele],
      ["Aktive Projekte", null],
      ["Teamaufgaben", null],
      ["Offene Freigaben", data.wall.freigaben]
    ];
    blocks.forEach(function (block) {
      var section = el("section");
      add(section, el("h3")).textContent = block[0];
      if (block[1]) {
        var ul = el("ul");
        block[1].forEach(function (line) {
          add(ul, el("li")).textContent = line;
        });
        section.appendChild(ul);
      }
      root.appendChild(section);
    });

    var projects = root.children[1];
    data.wall.projekte.forEach(function (project) {
      var article = el("article");
      var tag = el("span", { class: toneClass(project.tone) });
      tag.textContent = project.tag;
      article.appendChild(tag);
      var title = el("strong");
      title.textContent = project.title;
      article.appendChild(title);
      var detail = el("p");
      detail.textContent = project.detail;
      article.appendChild(detail);
      projects.appendChild(article);
    });

    var team = root.children[2];
    var teamList = el("ul");
    data.wall.teamaufgaben.forEach(function (item) {
      var li = el("li");
      var name = el("strong");
      name.textContent = item.bot + ": ";
      li.appendChild(name);
      li.appendChild(document.createTextNode(item.text));
      teamList.appendChild(li);
    });
    team.appendChild(teamList);
  }

  function renderRoster() {
    data.bots.forEach(function (bot, botIndex) {
      var card = el("section", { class: "bot-card" });
      var heading = el("h3", { id: "bot-" + bot.id });
      heading.textContent = bot.name;
      card.appendChild(heading);
      var role = el("p", { class: "place" });
      role.textContent = bot.role + " · " + bot.place;
      card.appendChild(role);
      var traits = el("p", { class: "traits" });
      traits.textContent = bot.traits;
      card.appendChild(traits);
      bot.folders.forEach(function (folder, folderIndex) {
        var button = el("button", {
          type: "button",
          class: "mappe",
          id: "mappe-" + folder.id
        });
        button.tabIndex = botIndex === 0 && folderIndex === 0 ? 0 : -1;
        var title = el("span", { class: "folder-title" });
        title.textContent = folder.title;
        var meta = el("span", { class: "folder-meta" });
        meta.textContent = folder.tasks.length + (folder.tasks.length === 1 ? " Aufgabe" : " Aufgaben");
        button.appendChild(title);
        button.appendChild(meta);
        button.addEventListener("click", function () {
          openDialog(bot.id, folder.id, folder.tasks[0].id, button);
        });
        card.appendChild(button);
      });
      roster.appendChild(card);
    });

    roster.addEventListener("keydown", function (event) {
      var buttons = Array.prototype.slice.call(roster.querySelectorAll(".mappe"));
      var index = buttons.indexOf(document.activeElement);
      if (index < 0) return;
      var next = index;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = Math.min(buttons.length - 1, index + 1);
      else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = Math.max(0, index - 1);
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = buttons.length - 1;
      else return;
      event.preventDefault();
      buttons[index].tabIndex = -1;
      buttons[next].tabIndex = 0;
      buttons[next].focus();
    });
  }

  function renderHotspots() {
    var host = document.getElementById("hotspots");
    window.StarkScene.zones().forEach(function (zone) {
      var bot = findBot(zone.botId);
      if (!bot) return;
      bot.folders.forEach(function (folder, index) {
        var button = el("button", {
          type: "button",
          class: "hotspot",
          tabindex: "-1",
          "data-label": folder.title,
          title: bot.name + ": " + folder.title
        });
        var slice = zone.width / bot.folders.length;
        button.style.left = (zone.left + slice * index) + "%";
        button.style.top = zone.top + "%";
        button.style.width = slice + "%";
        button.style.height = zone.height + "%";
        button.addEventListener("click", function () {
          var opener = document.getElementById("mappe-" + folder.id);
          openDialog(bot.id, folder.id, folder.tasks[0].id, opener);
        });
        host.appendChild(button);
      });
    });
  }

  function renderLimits() {
    var root = document.getElementById("limits");
    [
      data.meta.graphics,
      data.meta.repoNote,
      data.meta.acceptance,
      "Pfadangaben sind Text aus der Momentaufnahme, keine Links. Originaldateien lagen in diesem Repository nicht vor.",
      "Verbundene Dienste und lokal installierte Programme sind hier nicht eingebunden. Keine neuen Pakete, keine externe Schrift, kein Tracking."
    ].forEach(function (line) {
      var p = el("p");
      p.textContent = line;
      root.appendChild(p);
    });
  }

  function fillList(parent, items) {
    var ul = el("ul");
    items.forEach(function (item) {
      add(ul, el("li")).textContent = item;
    });
    parent.appendChild(ul);
  }

  function renderDialog() {
    var bot = findBot(current.botId);
    var folder = findFolder(bot, current.folderId);
    var task = findTask(folder, current.taskId);
    var scroll = dialog.scrollTop;
    dialog.replaceChildren();

    var head = el("div", { class: "dlg-head" });
    var row = el("div", { class: "dlg-head-row" });
    var title = el("h2", { id: "dlg-title", class: "dlg-title" });
    title.textContent = bot.name + " · " + folder.title;
    var close = el("button", { type: "button", id: "dlg-close" });
    close.textContent = "Schliessen";
    close.addEventListener("click", closeDialog);
    row.appendChild(title);
    row.appendChild(close);
    head.appendChild(row);

    var steps = el("ol", { class: "steps" });
    ["Mappe", "Aufgabe", "Ergebnis"].forEach(function (label, index) {
      var li = el("li");
      li.textContent = label;
      if (index === 2) li.setAttribute("aria-current", "step");
      steps.appendChild(li);
    });
    head.appendChild(steps);

    var crumb = el("p", { id: "dlg-breadcrumb" });
    crumb.textContent = "Mappe: " + folder.title + " > Aufgabe: " + task.title + " > Ergebnis: Vorschau sichtbar";
    head.appendChild(crumb);
    if (task.fictional) {
      var flag = el("p", { class: "fiktiv" });
      flag.textContent = "Ausdrücklich FIKTIV. Kein realer Kunde.";
      head.appendChild(flag);
    }
    var keys = el("p", { class: "keys" });
    keys.textContent = "Pfeiltasten wechseln Mappe oder Aufgabe. Escape schliesst. Fokus kehrt zur Liste zurück.";
    head.appendChild(keys);
    dialog.appendChild(head);

    var body = el("div", { class: "dlg-body" });
    var cols = el("div", { class: "dlg-cols" });

    var folderCol = el("div");
    add(folderCol, el("h3")).textContent = "Mappe";
    bot.folders.forEach(function (item) {
      var button = el("button", { type: "button", class: "choice", id: "dlg-mappe-" + item.id });
      button.textContent = item.title;
      if (item.id === folder.id) button.setAttribute("aria-current", "true");
      button.addEventListener("click", function () {
        if (!current) return;
        current.folderId = item.id;
        current.taskId = item.tasks[0].id;
        writeHash();
        renderDialog();
        var next = document.getElementById("aufgabe-" + current.taskId);
        if (next) next.focus();
      });
      folderCol.appendChild(button);
    });

    var taskCol = el("div", { class: "dlg-tasks" });
    add(taskCol, el("h3")).textContent = "Aufgabe";
    folder.tasks.forEach(function (item) {
      var button = el("button", { type: "button", class: "choice", id: "aufgabe-" + item.id });
      button.textContent = item.title;
      if (item.id === task.id) button.setAttribute("aria-current", "true");
      button.addEventListener("click", function () {
        if (!current) return;
        current.taskId = item.id;
        writeHash();
        renderDialog();
        var next = document.getElementById("aufgabe-" + item.id);
        if (next) next.focus();
      });
      taskCol.appendChild(button);
    });

    var detail = el("div");
    add(detail, el("h3")).textContent = "Ergebnis";
    var dl = el("dl", { class: "fields" });
    function pair(label, id, node) {
      var dt = el("dt");
      dt.textContent = label;
      var dd = el("dd", { id: id });
      dd.appendChild(node);
      dl.appendChild(dt);
      dl.appendChild(dd);
    }
    pair("Bot", "dlg-bot", document.createTextNode(bot.name + " · " + bot.role));
    pair("Kunde / ID", "dlg-kunde", document.createTextNode(task.customer));
    pair("Auftrag", "dlg-auftrag", document.createTextNode(task.order));
    var badge = el("span", { class: toneClass(task.statusTone), id: "dlg-stand" });
    badge.textContent = task.status;
    var standWrap = el("span");
    standWrap.appendChild(badge);
    pair("Belegter Stand", "dlg-stand-wrap", standWrap);
    pair("Letztes belegtes Update", "dlg-update", document.createTextNode(task.updated));

    var files = el("div", { id: "dlg-dateien" });
    if (!task.files.length) {
      files.textContent = task.filesNote || "Kein Dateipfad im Beleg genannt.";
    } else {
      task.files.forEach(function (file) {
        var code = el("code", { class: "path" });
        code.textContent = file.path;
        var note = el("span", { class: "file-note" });
        note.textContent = file.note;
        files.appendChild(code);
        files.appendChild(note);
      });
      if (task.filesNote) {
        var extra = el("span", { class: "file-note" });
        extra.textContent = task.filesNote;
        files.appendChild(extra);
      }
    }
    pair("Dateien", "dlg-dateien-wrap", files);

    var preview = el("pre", { class: "preview", id: "dlg-ergebnis" });
    preview.textContent = task.preview;
    pair("Ergebnisvorschau", "dlg-ergebnis-wrap", preview);

    var openWrap = el("div", { id: "dlg-offen" });
    fillList(openWrap, task.openPoints);
    pair("Offene Punkte", "dlg-offen-wrap", openWrap);
    pair("Nächster Schritt", "dlg-naechster", document.createTextNode(task.nextStep));
    pair("Besitzer", "dlg-besitzer", document.createTextNode(task.owner));
    detail.appendChild(dl);

    cols.appendChild(folderCol);
    cols.appendChild(taskCol);
    cols.appendChild(detail);
    body.appendChild(cols);
    var live = el("p", { id: "dlg-live", class: "sr", "aria-live": "polite" });
    live.textContent = bot.name + ", Mappe " + folder.title + ", Aufgabe " + task.title + ", Ergebnisvorschau sichtbar.";
    body.appendChild(live);
    dialog.appendChild(body);
    dialog.scrollTop = scroll;
  }

  function writeHash() {
    var next = "#/" + current.botId + "/" + current.folderId + "/" + current.taskId;
    if (location.hash !== next) history.replaceState(null, "", next);
  }

  function openDialog(botId, folderId, taskId, opener) {
    var bot = findBot(botId);
    var folder = bot && findFolder(bot, folderId);
    var task = folder && (taskId ? findTask(folder, taskId) : folder.tasks[0]);
    var note = document.getElementById("hash-note");
    if (!bot || !folder || !task) {
      note.textContent = "Diese Adresse nennt keine vorhandene Mappe.";
      return;
    }
    note.textContent = "";
    current = {
      botId: bot.id,
      folderId: folder.id,
      taskId: task.id,
      opener: opener || document.getElementById("mappe-" + folder.id)
    };
    renderDialog();
    writeHash();
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    app.inert = true;
    var focusTarget = document.getElementById("aufgabe-" + task.id);
    if (focusTarget) focusTarget.focus();
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

  dialog.addEventListener("close", function () {
    var opener = current && current.opener;
    document.body.style.overflow = "";
    app.inert = false;
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    current = null;
    if (opener && document.contains(opener)) opener.focus();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("keydown", function (event) {
    if (!dialog.open || !current) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    var bot = findBot(current.botId);
    var folder = findFolder(bot, current.folderId);
    var folders = Array.prototype.slice.call(dialog.querySelectorAll("[id^='dlg-mappe-']"));
    var tasks = Array.prototype.slice.call(dialog.querySelectorAll("[id^='aufgabe-']"));
    var inFolders = folders.indexOf(document.activeElement);
    var inTasks = tasks.indexOf(document.activeElement);
    if (inFolders < 0 && inTasks < 0) return;
    event.preventDefault();
    var delta = event.key === "ArrowDown" ? 1 : -1;
    if (inFolders >= 0) {
      var folderIndex = Math.max(0, Math.min(bot.folders.length - 1, inFolders + delta));
      current.folderId = bot.folders[folderIndex].id;
      current.taskId = bot.folders[folderIndex].tasks[0].id;
    } else {
      var taskIndex = Math.max(0, Math.min(folder.tasks.length - 1, inTasks + delta));
      current.taskId = folder.tasks[taskIndex].id;
    }
    writeHash();
    renderDialog();
    var focusId = inFolders >= 0 ? "dlg-mappe-" + current.folderId : "aufgabe-" + current.taskId;
    var node = document.getElementById(focusId);
    if (node) node.focus();
  });

  function parseHash() {
    var parts = location.hash.replace(/^#/, "").split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { botId: parts[0], folderId: parts[1], taskId: parts[2] || null };
  }

  function syncFromHash() {
    var parsed = parseHash();
    if (!parsed) {
      if (dialog.open) closeDialog();
      return;
    }
    if (current && current.botId === parsed.botId && current.folderId === parsed.folderId && current.taskId === parsed.taskId) return;
    openDialog(parsed.botId, parsed.folderId, parsed.taskId, document.getElementById("mappe-" + parsed.folderId));
  }

  function applyZoom() {
    var scroll = document.getElementById("stage-scroll");
    var stage = document.getElementById("stage");
    var base = Math.min(scroll.clientWidth, 1440);
    if (base < 280) base = scroll.clientWidth || 280;
    stage.style.width = Math.round(base * scale) + "px";
    document.getElementById("zoom-label").textContent =
      "Darstellung " + Math.round(scale * 100) + " Prozent. CSS-Skalierung der 2D-Szene, keine 3D-Ansicht.";
  }

  function syncAnimation() {
    var button = document.getElementById("anim-toggle");
    var state = document.getElementById("anim-state");
    button.setAttribute("aria-pressed", paused ? "true" : "false");
    button.textContent = paused ? "Animation fortsetzen" : "Animation pausieren";
    document.body.dataset.animation = paused ? "paused" : "running";
    document.body.dataset.reduced = reduced ? "true" : "false";
    if (paused && reduced && !userSetPause) {
      state.textContent = "Animation aus, weil prefers-reduced-motion gesetzt ist.";
    } else if (paused) {
      state.textContent = "Animation aus.";
    } else if (reduced) {
      state.textContent = "Animation läuft auf Wunsch, obwohl reduced-motion aktiv ist. Weiterhin nur dekorativ.";
    } else {
      state.textContent = "Animation an, nur dekorativ.";
    }
    if (window.StarkScene) window.StarkScene.setPaused(paused);
  }

  function init() {
    var error = document.getElementById("datenfehler");
    if (!data || !window.StarkScene) {
      error.textContent = "Snapshot oder Szene wurde nicht geladen. Es wird nichts nachgeladen.";
      return;
    }
    if (document.getElementById("banner").textContent !== data.meta.banner) {
      error.textContent = "Der sichtbare Bannertext weicht von den Snapshot-Daten ab.";
    }
    if (document.getElementById("anim-note").textContent !== data.meta.animationLabel) {
      error.textContent = "Der Animationstext weicht von den Snapshot-Daten ab.";
    }
    renderWall();
    renderRoster();
    renderLimits();
    paused = true;
    if (!reduced) paused = false;
    window.StarkScene.start(document.getElementById("office"), { paused: paused });
    renderHotspots();
    syncAnimation();
    applyZoom();

    document.getElementById("anim-toggle").addEventListener("click", function () {
      userSetPause = true;
      paused = !paused;
      syncAnimation();
    });
    document.getElementById("zoom-in").addEventListener("click", function () {
      scale = Math.min(1.6, Math.round((scale + 0.2) * 10) / 10);
      applyZoom();
    });
    document.getElementById("zoom-out").addEventListener("click", function () {
      scale = Math.max(0.8, Math.round((scale - 0.2) * 10) / 10);
      applyZoom();
    });
    document.getElementById("zoom-reset").addEventListener("click", function () {
      scale = 1;
      applyZoom();
    });
    window.addEventListener("resize", applyZoom);
    window.addEventListener("hashchange", syncFromHash);
    if (typeof reducedQuery.addEventListener === "function") {
      reducedQuery.addEventListener("change", function () {
        reduced = reducedQuery.matches;
        if (!userSetPause) paused = reduced;
        syncAnimation();
      });
    }
    syncFromHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
