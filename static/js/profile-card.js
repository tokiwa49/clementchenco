(function () {
  "use strict";

  var wrap = document.querySelector(".pc-card-wrapper");
  if (!wrap) return;
  var shell = wrap.querySelector(".pc-card-shell");
  if (!shell) return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var DEFAULT_TAU = 0.14;
  var INITIAL_TAU = 0.6;
  var INITIAL_DURATION = 1200;
  var INITIAL_X_OFFSET = 70;
  var INITIAL_Y_OFFSET = 60;
  var ENTER_TRANSITION_MS = 180;

  var clamp = function (v, min, max) {
    if (min === undefined) min = 0;
    if (max === undefined) max = 100;
    return Math.min(Math.max(v, min), max);
  };
  var round = function (v, precision) {
    if (precision === undefined) precision = 3;
    return parseFloat(v.toFixed(precision));
  };
  var adjust = function (v, fMin, fMax, tMin, tMax) {
    return round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));
  };

  var rafId = null;
  var running = false;
  var lastTs = 0;
  var currentX = 0;
  var currentY = 0;
  var targetX = 0;
  var targetY = 0;
  var initialUntil = 0;

  function setVarsFromXY(x, y) {
    var width = shell.clientWidth || 1;
    var height = shell.clientHeight || 1;

    var percentX = clamp((100 / width) * x);
    var percentY = clamp((100 / height) * y);

    var centerX = percentX - 50;
    var centerY = percentY - 50;

    var properties = {
      "--pointer-x": percentX + "%",
      "--pointer-y": percentY + "%",
      "--background-x": adjust(percentX, 0, 100, 35, 65) + "%",
      "--background-y": adjust(percentY, 0, 100, 35, 65) + "%",
      "--pointer-from-center": clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1),
      "--pointer-from-top": percentY / 100,
      "--pointer-from-left": percentX / 100,
      "--rotate-x": round(-(centerX / 5)) + "deg",
      "--rotate-y": round(centerY / 4) + "deg"
    };

    for (var key in properties) {
      wrap.style.setProperty(key, properties[key]);
    }
  }

  function step(ts) {
    if (!running) return;
    if (lastTs === 0) lastTs = ts;
    var dt = (ts - lastTs) / 1000;
    lastTs = ts;

    var tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
    var k = 1 - Math.exp(-dt / tau);

    currentX += (targetX - currentX) * k;
    currentY += (targetY - currentY) * k;

    setVarsFromXY(currentX, currentY);

    var stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

    if (stillFar || document.hasFocus()) {
      rafId = requestAnimationFrame(step);
    } else {
      running = false;
      lastTs = 0;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  }

  function start() {
    if (running) return;
    running = true;
    lastTs = 0;
    rafId = requestAnimationFrame(step);
  }

  function setImmediate(x, y) {
    currentX = x;
    currentY = y;
    setVarsFromXY(currentX, currentY);
  }

  function setTarget(x, y) {
    targetX = x;
    targetY = y;
    start();
  }

  function toCenter() {
    setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
  }

  function beginInitial(durationMs) {
    initialUntil = performance.now() + durationMs;
    start();
  }

  function getOffsets(evt) {
    var rect = shell.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  }

  var hasFinePointer =
    window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hasFinePointer) {
    var enterTimer = null;
    var leaveRaf = null;

    shell.addEventListener("pointerenter", function (evt) {
      shell.classList.add("active");
      shell.classList.add("entering");
      if (enterTimer) window.clearTimeout(enterTimer);
      enterTimer = window.setTimeout(function () {
        shell.classList.remove("entering");
      }, ENTER_TRANSITION_MS);

      var off = getOffsets(evt);
      setTarget(off.x, off.y);
    });

    shell.addEventListener("pointermove", function (evt) {
      var off = getOffsets(evt);
      setTarget(off.x, off.y);
    });

    shell.addEventListener("pointerleave", function () {
      toCenter();

      function checkSettle() {
        var settled = Math.hypot(targetX - currentX, targetY - currentY) < 0.6;
        if (settled) {
          shell.classList.remove("active");
          leaveRaf = null;
        } else {
          leaveRaf = requestAnimationFrame(checkSettle);
        }
      }
      if (leaveRaf) cancelAnimationFrame(leaveRaf);
      leaveRaf = requestAnimationFrame(checkSettle);
    });
  }

  function startEntrance() {
    if (!shell.clientWidth || !shell.clientHeight) {
      // Layout isn't settled yet (e.g. avatar image still resolving on a
      // slow connection) — reading 0 here would send the resting mask
      // position to a wild percentage via the width||1 fallback in
      // setVarsFromXY, pushing the /C pattern off-frame instead of
      // centered. Wait a frame and try again rather than proceed on a
      // bogus size.
      requestAnimationFrame(startEntrance);
      return;
    }
    var initialX = shell.clientWidth - INITIAL_X_OFFSET;
    var initialY = INITIAL_Y_OFFSET;
    setImmediate(initialX, initialY);
    toCenter();
    beginInitial(INITIAL_DURATION);
  }
  startEntrance();
})();
