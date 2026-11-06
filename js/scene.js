/* Eigenständige 2D-Pixelzeichnung. Keine 3D-Engine, kein Fremdbild.
   Logisches Raster 720×248, auf dem Canvas 2× dargestellt. */
(function (root) {
  "use strict";

  var GW = 720;
  var GH = 248;
  var PX = 2;

  var GLYPH = {
    " ": [0, 0, 0, 0, 0],
    "-": [0, 0, 7, 0, 0],
    A: [2, 5, 7, 5, 5],
    B: [6, 5, 6, 5, 6],
    C: [3, 4, 4, 4, 3],
    D: [6, 5, 5, 5, 6],
    E: [7, 4, 6, 4, 7],
    F: [7, 4, 6, 4, 4],
    G: [3, 4, 5, 5, 3],
    H: [5, 5, 7, 5, 5],
    I: [7, 2, 2, 2, 7],
    J: [1, 1, 1, 5, 2],
    K: [5, 6, 4, 6, 5],
    L: [4, 4, 4, 4, 7],
    M: [5, 7, 7, 5, 5],
    N: [5, 7, 7, 5, 5],
    O: [2, 5, 5, 5, 2],
    P: [6, 5, 6, 4, 4],
    R: [6, 5, 6, 5, 5],
    S: [3, 4, 2, 1, 6],
    T: [7, 2, 2, 2, 2],
    U: [5, 5, 5, 5, 7],
    V: [5, 5, 5, 5, 2],
    W: [5, 5, 7, 7, 5],
    X: [5, 5, 2, 5, 5],
    Y: [5, 5, 2, 2, 2],
    Z: [7, 1, 2, 4, 7]
  };

  var chief = { x: 206, y: 28, w: 168 };
  var desks = [
    { id: "pixel", x: 16, w: 128 },
    { id: "forge", x: 156, w: 128 },
    { id: "guard", x: 296, w: 128 },
    { id: "atlas", x: 436, w: 128 }
  ];

  var canvas;
  var ctx;
  var paused = false;
  var timer = 0;
  var tick = 0;

  function rect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function text(x, y, str, scale, color) {
    var cx = x;
    var i;
    var row;
    var col;
    var glyph;
    var ch;
    for (i = 0; i < str.length; i += 1) {
      ch = str.charAt(i);
      glyph = GLYPH[ch] || GLYPH[" "];
      for (row = 0; row < 5; row += 1) {
        for (col = 0; col < 3; col += 1) {
          if (glyph[row] & (1 << (2 - col))) {
            rect(cx + col * scale, y + row * scale, scale, scale, color);
          }
        }
      }
      cx += 4 * scale;
    }
  }

  function plate(x, y, label) {
    var w = label.length * 8 + 6;
    rect(x, y, w, 16, "#ff3d8b");
    rect(x, y, w, 1, "#ffd0e6");
    text(x + 3, y + 3, label, 2, "#1a0610");
  }

  function glow(x, y, w, h, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    rect(x, y, w, h, "#1a7c8c");
    ctx.restore();
  }

  function monitor(x, y, w, h, kind) {
    rect(x + (w / 2 - 1), y + h, 2, 3, "#12141c");
    rect(x, y, w, h, "#07080e");
    rect(x + 1, y + 1, w - 2, h - 2, "#06262c");
    if (kind === "code") {
      rect(x + 2, y + 3, w - 6, 1, "#7ef6ff");
      rect(x + 4, y + 5, w - 8, 1, "#3d7380");
      rect(x + 2, y + 7, Math.max(4, (w / 2) | 0), 1, "#7ef6ff");
      rect(x + 3, y + 9, w - 7, 1, "#3d7380");
    } else if (kind === "swatch") {
      rect(x + 2, y + 3, 4, 4, "#ff3d8b");
      rect(x + 7, y + 3, 4, 4, "#3de4ff");
      rect(x + 12, y + 3, 4, 4, "#e2ecf4");
      rect(x + 2, y + 9, w - 4, 1, "#1a4a52");
    } else if (kind === "check") {
      rect(x + 2, y + 3, 2, 2, "#9dfff0");
      rect(x + 6, y + 3, w - 9, 1, "#c6f6ff");
      rect(x + 2, y + 7, 2, 2, "#0c3038");
      rect(x + 6, y + 7, w - 10, 1, "#5a9098");
      rect(x + 2, y + 10, 2, 2, "#0c3038");
      rect(x + 6, y + 10, w - 8, 1, "#5a9098");
    } else if (kind === "sheet") {
      rect(x + 2, y + 3, w - 4, 1, "#9eb0c4");
      rect(x + 2, y + 5, w - 5, 1, "#3d4e60");
      rect(x + 2, y + 7, w - 6, 1, "#3d4e60");
      rect(x + 2, y + 9, w - 4, 1, "#3d4e60");
    } else {
      rect(x + 2, y + 3, w - 4, 2, "#10383e");
      rect(x + 2, y + 7, Math.max(4, (w * 0.6) | 0), 1, "#7ef6ff");
      rect(x + 2, y + 9, w - 6, 1, "#3d7380");
    }
  }

  function plant(x, y, scale) {
    var s = scale || 1;
    rect(x + 2 * s, y, 3 * s, 3 * s, "#1d6a42");
    rect(x, y + 2 * s, 3 * s, 4 * s, "#2f8f5b");
    rect(x + 4 * s, y + 2 * s, 3 * s, 5 * s, "#174d32");
    rect(x + 3 * s, y + 6 * s, s, 4 * s, "#245c38");
    rect(x + s, y + 10 * s, 6 * s, 4 * s, "#6b442c");
    rect(x + 2 * s, y + 11 * s, 4 * s, 2 * s, "#8a5a38");
  }

  function books(x, y, count) {
    var colors = ["#ff3d8b", "#8a93ad", "#c4553a", "#e2ecf4", "#3a6ea5", "#6b442c", "#2f6b4f", "#d2b15a", "#6a3a78"];
    var i;
    var h;
    for (i = 0; i < count; i += 1) {
      h = 8 + ((i * 3) % 5);
      rect(x + i * 3, y - h, 2, h, colors[i % colors.length]);
    }
  }

  function shelf(x, y, w, h) {
    rect(x, y, w, h, "#141022");
    rect(x, y, 2, h, "#2a2044");
    rect(x + w - 2, y, 2, h, "#2a2044");
    var rows = 3;
    var gap = Math.floor((h - 8) / rows);
    var i;
    var sy;
    for (i = 0; i < rows; i += 1) {
      sy = y + 6 + gap + i * gap;
      rect(x + 2, sy, w - 4, 2, "#3a3058");
      books(x + 4, sy, Math.max(4, Math.floor((w - 10) / 3)));
    }
  }

  function drawWindow() {
    rect(6, 8, 112, 66, "#120818");
    rect(10, 12, 104, 58, "#1a1030");
    rect(10, 12, 104, 16, "#321850");
    rect(10, 12, 104, 7, "#4a2070");
    rect(78, 16, 5, 5, "#e2ecf4");
    rect(80, 16, 3, 2, "#321850");
    var stars = [[18, 16], [28, 18], [44, 15], [60, 20], [36, 24], [90, 18]];
    var i;
    for (i = 0; i < stars.length; i += 1) {
      rect(stars[i][0], stars[i][1], 1, 1, "#e2ecf4");
    }
    building(14, 34, 16, 36, 3);
    building(32, 40, 14, 30, 5);
    building(48, 28, 20, 42, 2);
    building(70, 38, 16, 32, 7);
    building(88, 32, 18, 38, 4);
    rect(6, 8, 112, 3, "#241432");
    rect(6, 71, 112, 3, "#241432");
    rect(6, 8, 4, 66, "#241432");
    rect(114, 8, 4, 66, "#241432");
    rect(58, 12, 2, 58, "#241432");
    plant(96, 62, 1);
  }

  function building(x, y, w, h, seed) {
    rect(x, y, w, h, "#120814");
    rect(x, y, 1, h, "#2c1848");
    var row;
    var col;
    for (row = 3; row < h - 3; row += 5) {
      for (col = 2; col < w - 2; col += 4) {
        if (((col * 3 + row * 5 + seed) % 5) <= 1) {
          continue;
        }
        rect(x + col, y + row, 2, 2, ((col + row + seed) % 6 === 0) ? "#ff3d8b" : "#e6c56a");
      }
    }
  }

  function drawWall() {
    rect(0, 0, GW, 100, "#0d1020");
    var x;
    for (x = 0; x < GW; x += 24) {
      rect(x, 0, 1, 100, "#14182e");
    }
    rect(0, 0, GW, 4, "#080a14");
    var tubes = [140, 250, 360, 470, 590];
    for (x = 0; x < tubes.length; x += 1) {
      rect(tubes[x], 2, 36, 1, "#ffd0e6");
      rect(tubes[x], 3, 36, 2, "#ff3d8b");
    }
    rect(0, 98, GW, 2, "#ff3d8b");
    rect(0, 100, GW, 2, "#4a1234");
  }

  function drawSign() {
    rect(498, 12, 206, 46, "#140810");
    rect(498, 12, 206, 2, "#ff3d8b");
    rect(498, 56, 206, 2, "#ff3d8b");
    rect(498, 12, 2, 46, "#ff3d8b");
    rect(702, 12, 2, 46, "#ff3d8b");
    rect(500, 14, 202, 1, "#ffd0e6");
    text(512, 20, "STARK", 2, "#ff3d8b");
    text(512, 36, "AGENTUR", 2, "#e2ecf4");
    text(612, 36, "BUERO", 2, "#ffd0e6");
  }

  function drawFloor() {
    var y = 102;
    var rowH = 6;
    var i = 0;
    var x;
    var shade;
    while (y < GH) {
      for (x = 0; x < GW; x += 18) {
        shade = ((Math.floor(x / 18) + i) % 2 === 0) ? "#141028" : "#1b1534";
        rect(x, y, 18, Math.max(1, rowH - 1), shade);
      }
      rect(0, y + rowH - 1, GW, 1, "#0b0914");
      y += rowH;
      rowH = Math.min(16, rowH + 1);
      i += 1;
    }
  }

  function cableSegment(x0, y0, x1, y1, phase) {
    var steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    var s;
    var t;
    var x;
    var y;
    var lit;
    if (steps < 1) {
      steps = 1;
    }
    for (s = 0; s <= steps; s += 1) {
      t = s / steps;
      x = Math.round(x0 + (x1 - x0) * t);
      y = Math.round(y0 + (y1 - y0) * t);
      lit = !paused && ((s + phase) % 14 === (tick % 14));
      rect(x, y + 2, 3, 3, "#6a1244");
      rect(x, y, 3, 2, lit ? "#ffd0e6" : "#ff3d8b");
    }
  }

  function node(x, y) {
    rect(x - 1, y - 1, 5, 5, "#ff3d8b");
    rect(x, y, 3, 3, "#ffd0e6");
  }

  function drawCables() {
    var hubX = chief.x + (chief.w / 2);
    var trunkY = 152;
    var i;
    var dx;
    cableSegment(hubX, 128, hubX, trunkY, 0);
    node(hubX, 126);
    cableSegment(desks[0].x + 64, trunkY, desks[3].x + 64, trunkY, 2);
    for (i = 0; i < desks.length; i += 1) {
      dx = desks[i].x + 28;
      node(dx, trunkY);
      cableSegment(dx, trunkY, dx, 174, 4 + i * 3);
      node(dx, 172);
    }
  }

  function drawPerson(x, y, kind, frame) {
    var skin = "#e0b08a";
    var hand = frame ? 2 : 0;
    if (kind === "stark") {
      rect(x + 5, y, 16, 4, "#1a1422");
      rect(x + 4, y + 3, 4, 5, "#9aa3b5");
      rect(x + 18, y + 3, 4, 5, "#9aa3b5");
      rect(x + 7, y + 4, 12, 10, skin);
      rect(x + 9, y + 8, 2, 2, "#1a120c");
      rect(x + 15, y + 8, 2, 2, "#1a120c");
      rect(x + 8, y + 13, 10, 5, "#3a2a28");
      rect(x + 10, y + 13, 6, 2, "#5a4038");
      rect(x + 3, y + 18, 20, 12, "#2c3444");
      rect(x + 10, y + 18, 6, 4, skin);
      rect(x + 1, y + 22, 6, 8, "#2c3444");
      rect(x + 19, y + 22, 6, 8, "#2c3444");
      rect(x + 1 + hand, y + 29, 5, 3, skin);
      rect(x + 20 - hand, y + 29, 5, 3, skin);
    } else if (kind === "pixel") {
      rect(x + 4, y, 16, 7, "#f4ecd4");
      rect(x + 18, y + 5, 5, 14, "#e7d7ae");
      rect(x + 6, y + 6, 12, 9, skin);
      rect(x + 6, y + 8, 12, 1, "#9fdfff");
      rect(x + 6, y + 8, 5, 4, "#9fdfff");
      rect(x + 13, y + 8, 5, 4, "#9fdfff");
      rect(x + 8, y + 9, 2, 2, "#1a120c");
      rect(x + 14, y + 9, 2, 2, "#1a120c");
      rect(x + 4, y + 16, 16, 12, "#141418");
      rect(x + 9, y + 16, 6, 3, "#2c2c34");
      rect(x + 1, y + 20, 5, 8, "#141418");
      rect(x + 18, y + 20, 5, 8, "#141418");
      rect(x + 1 + hand, y + 27, 4, 3, skin);
      rect(x + 19 - hand, y + 27, 4, 3, skin);
    } else if (kind === "forge") {
      rect(x + 2, y, 22, 5, "#161018");
      rect(x + 6, y + 4, 14, 10, skin);
      rect(x + 9, y + 8, 2, 2, "#1a120c");
      rect(x + 15, y + 8, 2, 2, "#1a120c");
      rect(x - 1, y + 14, 28, 8, "#1a2030");
      rect(x + 4, y + 18, 18, 12, "#7a4630");
      rect(x + 6, y + 18, 14, 1, "#a86a48");
      rect(x + 8, y + 22, 5, 4, "#4a2818");
      rect(x - 1, y + 16, 6, 4, "#1a2030");
      rect(x + 21, y + 16, 6, 4, "#1a2030");
      rect(x - 2, y + 20, 6, 8, skin);
      rect(x + 22, y + 20, 6, 8, skin);
      rect(x - 1 + hand, y + 28, 5, 3, skin);
      rect(x + 22 - hand, y + 28, 5, 3, skin);
    } else if (kind === "guard") {
      rect(x + 6, y + 1, 14, 4, "#100c12");
      rect(x + 19, y + 4, 3, 10, "#100c12");
      rect(x + 20, y + 13, 5, 4, "#100c12");
      rect(x + 7, y + 4, 12, 9, skin);
      rect(x + 6, y + 8, 14, 2, "#9dfff0");
      rect(x + 9, y + 8, 2, 2, "#102428");
      rect(x + 14, y + 8, 2, 2, "#102428");
      rect(x + 4, y + 14, 18, 14, "#1d3d78");
      rect(x + 9, y + 15, 8, 2, "#2f5ea8");
      rect(x + 1, y + 20, 5, 8, "#1d3d78");
      rect(x + 20, y + 20, 5, 8, "#1d3d78");
      rect(x + 1 + hand, y + 27, 4, 3, skin);
      rect(x + 20 - hand, y + 27, 4, 3, skin);
    } else if (kind === "atlas") {
      rect(x + 4, y, 18, 7, "#e4ebf4");
      rect(x + 5, y + 2, 4, 4, "#b7c2d2");
      rect(x + 16, y + 2, 4, 4, "#b7c2d2");
      rect(x + 7, y + 6, 12, 9, skin);
      rect(x + 9, y + 9, 2, 2, "#1a120c");
      rect(x + 15, y + 9, 2, 2, "#1a120c");
      rect(x + 3, y + 15, 20, 14, "#1f6a52");
      rect(x + 10, y + 16, 6, 5, "#e2ecf4");
      rect(x + 1, y + 20, 5, 8, "#1f6a52");
      rect(x + 20, y + 20, 5, 8, "#1f6a52");
      rect(x + 1 + hand, y + 27, 4, 3, skin);
      rect(x + 20 - hand, y + 27, 4, 3, skin);
    }
  }

  function chair(x, y) {
    rect(x + 2, y, 16, 16, "#241433");
    rect(x + 3, y + 2, 14, 5, "#3a2048");
    rect(x, y + 8, 3, 14, "#1a1024");
    rect(x + 18, y + 8, 3, 14, "#1a1024");
  }

  function desk(x, y, w) {
    rect(x, y, w, 10, "#24365c");
    rect(x, y, w, 2, "#3d5a8a");
    rect(x + 4, y + 10, w - 8, 26, "#12182a");
    rect(x + 4, y + 10, w - 8, 1, "#243044");
    rect(x + 8, y + 36, 4, 14, "#0c1018");
    rect(x + w - 12, y + 36, 4, 14, "#0c1018");
  }

  function mug(x, y, color) {
    rect(x, y, 5, 5, color);
    rect(x + 1, y + 1, 3, 2, "#f4f7fb");
    rect(x + 5, y + 1, 2, 3, color);
  }

  function keyboard(x, y) {
    rect(x, y, 14, 4, "#0c0e16");
    rect(x + 1, y + 1, 12, 1, "#8a93ad");
  }

  function papers(x, y) {
    rect(x + 2, y + 1, 8, 6, "#d5deea");
    rect(x, y, 8, 6, "#ffd0e4");
    rect(x + 1, y + 2, 5, 1, "#ff3d8b");
  }

function drawDeskStation(spec, frame) {
    var x = spec.x;
    var top = 176;
    var label = spec.id === "pixel" ? "PIXEL" : spec.id === "forge" ? "FORGE" : spec.id === "guard" ? "GUARD" : "ATLAS";
    chair(x + 52, 150);
    var glowA = paused ? 0.28 : 0.18 + ((tick % 16) < 8 ? 0.12 : 0.04);
    glow(x + 6, 154, 36, 26, glowA);
    glow(x + 86, 154, 36, 26, glowA);
    if (spec.id === "forge") {
      drawPerson(x + 46, 144, spec.id, frame);
    } else {
      drawPerson(x + 50, 146, spec.id, frame);
    }
    desk(x, top, spec.w);
    if (spec.id === "pixel") {
      monitor(x + 8, 156, 32, 18, "swatch");
      monitor(x + 88, 156, 32, 18, "swatch");
      mug(x + 62, 168, "#ff3d8b");
    } else if (spec.id === "forge") {
      monitor(x + 8, 156, 32, 18, "code");
      monitor(x + 88, 156, 32, 18, "code");
      rect(x + 70, 170, 9, 2, "#c2c8d4");
      rect(x + 76, 166, 2, 6, "#6b442c");
      mug(x + 108, 168, "#2a3144");
    } else if (spec.id === "guard") {
      monitor(x + 8, 156, 32, 18, "check");
      monitor(x + 88, 156, 32, 18, "check");
      mug(x + 62, 168, "#1d3d78");
    } else {
      monitor(x + 8, 156, 32, 18, "sheet");
      monitor(x + 88, 156, 32, 18, "sheet");
      mug(x + 62, 168, "#1f6a52");
    }
    keyboard(x + 54, 172);
    papers(x + 6, 168);
    plate(x + 8, 192, label);
    if (spec.id === "pixel" || spec.id === "atlas") {
      plant(x + spec.w - 18, 160, 1);
    }
  }

  function drawChief(frame) {
    var x = chief.x;
    rect(x - 16, 124, chief.w + 32, 10, "#16122c");
    rect(x - 8, 114, chief.w + 16, 12, "#221840");
    rect(x, 104, chief.w, 12, "#2a1c48");
    chair(x + 70, 48);
    var glowA = paused ? 0.3 : 0.2 + ((tick % 20) < 10 ? 0.12 : 0.03);
    glow(x + 8, 52, 32, 28, glowA);
    glow(x + 44, 46, 30, 32, glowA);
    glow(x + 118, 52, 32, 28, glowA);
    drawPerson(x + 68, 44, "stark", frame);
    rect(x + 6, 82, chief.w - 12, 14, "#24365c");
    rect(x + 6, 82, chief.w - 12, 2, "#3d5a8a");
    rect(x + 12, 96, chief.w - 24, 16, "#12182a");
    monitor(x + 8, 58, 28, 20, "sheet");
    monitor(x + 40, 52, 24, 24, "code");
    monitor(x + 122, 58, 28, 20, "sheet");
    mug(x + 148, 84, "#e2ecf4");
    plate(x + 16, 100, "STARK");
    plant(x + 150, 70, 1);
  }

  function drawLounge() {
    var x = 576;
    var y = 168;
    rect(x, y + 8, 78, 28, "#2a1438");
    rect(x + 4, y + 12, 70, 8, "#3a1c4c");
    rect(x - 4, y + 28, 88, 16, "#241030");
    rect(x + 4, y + 30, 16, 8, "#ff3d8b");
    rect(x + 24, y + 30, 16, 8, "#8a93ad");
    rect(x - 8, y + 18, 8, 26, "#1a0c24");
    rect(x + 74, y + 18, 8, 26, "#1a0c24");
    rect(x + 36, y + 8, 2, 30, "#2a3148");
    rect(x + 30, y + 4, 14, 5, "#c8f8ff");
    glow(x + 26, y + 8, 22, 12, paused ? 0.12 : 0.18);
    plant(x + 112, y + 20, 2);
    rect(x + 8, y + 48, 30, 8, "#6a2048");
    rect(x + 10, y + 46, 26, 8, "#a12860");
    rect(x + 14, y + 44, 16, 6, "#f0d8b0");
    rect(x + 16, y + 45, 6, 3, "#d08a48");
    rect(x + 28, y + 41, 8, 7, "#f0d8b0");
    rect(x + 28, y + 39, 2, 3, "#f0d8b0");
    rect(x + 33, y + 39, 2, 3, "#f0d8b0");
    rect(x + 30, y + 44, 3, 1, "#1a120c");
    rect(x + 34, y + 45, 2, 1, "#e08090");
    rect(x + 12, y + 46, 4, 2, "#d08a48");
  }

  function drawForeground() {
    plant(8, 200, 2);
    plant(688, 188, 2);
    rect(688, 214, 14, 10, "#3a2a18");
    rect(690, 210, 10, 6, "#6b442c");
    rect(150, 220, 12, 8, "#2a3144");
    rect(152, 218, 8, 3, "#8a93ad");
  }

  function draw(frameTick) {
    tick = frameTick;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#05060d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(PX, 0, 0, PX, 0, 0);
    drawWall();
    drawWindow();
    shelf(124, 12, 74, 60);
    plant(126, 2, 1);
    shelf(386, 12, 104, 60);
    plant(470, 2, 1);
    drawSign();
    drawFloor();
    drawCables();
    drawChief(paused ? 0 : (Math.floor(tick / 4) % 2));
    desks.forEach(function (spec) {
      drawDeskStation(spec, paused ? 0 : (Math.floor(tick / 4) % 2));
    });
    drawLounge();
    drawForeground();
    rect(18, 124, 12, 16, "#6b442c");
    rect(20, 116, 8, 10, "#2f8f5b");
    rect(14, 126, 6, 8, "#1d6a42");
  }

  function stopTimer() {
    if (timer) {
      window.clearTimeout(timer);
      timer = 0;
    }
  }

  function loop() {
    if (paused) {
      return;
    }
    tick += 1;
    draw(tick);
    timer = window.setTimeout(loop, 160);
  }

  function zones() {
    function pct(x, y, w, h, botId) {
      return {
        botId: botId,
        left: (x / GW) * 100,
        top: (y / GH) * 100,
        width: (w / GW) * 100,
        height: (h / GH) * 100
      };
    }
    return [
      pct(chief.x, 40, chief.w, 90, "stark")
    ].concat(desks.map(function (spec) {
      return pct(spec.x, 140, spec.w, 100, spec.id);
    }));
  }

  root.StarkScene = {
    start: function (target, options) {
      canvas = target;
      ctx = canvas.getContext("2d");
      canvas.width = GW * PX;
      canvas.height = GH * PX;
      paused = !!(options && options.paused);
      stopTimer();
      draw(0);
      if (!paused) {
        loop();
      }
    },
    setPaused: function (next) {
      paused = !!next;
      stopTimer();
      draw(paused ? 0 : tick);
      if (!paused) {
        loop();
      }
    },
    zones: zones
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
