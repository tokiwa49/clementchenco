(function () {
  var el = document.querySelector('.closing-cta-anim');
  if (!el || typeof fetch !== 'function' || typeof IntersectionObserver !== 'function') {
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var started = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !started) {
        started = true;
        io.disconnect();
        start();
      }
    });
  }, { rootMargin: '200px' });
  io.observe(el);

  function start() {
    fetch('/anim/blackcat.json')
      .then(function (res) { return res.json(); })
      .then(function (data) { run(data); })
      .catch(function () {});
  }

  function run(data) {
    var cols = data.cols;
    var rows = data.rows;
    var frames = data.frames;
    var frameDuration = 1000 / data.fps;

    // Recoloring the ink for light mode (tried a couple of variants)
    // kept fighting the source art itself — it was drawn as a dark-mode
    // image, and no palette remap fully fixed that. Simpler and more
    // reliable: give the canvas its own permanent dark backing,
    // regardless of the site's theme, and always render the original
    // palette unchanged — the same dark-mode card in both themes,
    // rather than trying to re-theme the artwork in place.
    var CANVAS_BG = '#131210';

    var canvas = document.createElement('canvas');
    el.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var size = el.clientWidth;
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
    }
    resize();
    window.addEventListener('resize', resize);

    function draw(index) {
      var size = el.clientWidth;
      if (!size) return;
      var cellW = size / cols;
      var cellH = size / rows;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, size, size);
      ctx.font = Math.ceil(cellH * 0.92) + 'px "JetBrains Mono", monospace';

      var palette = data.palette;
      var frame = frames[index];
      for (var r = 0; r < rows; r++) {
        var crow = frame.c[r];
        var prow = frame.p[r];
        var c = 0;
        while (c < cols) {
          var ch = crow[c];
          if (ch === ' ') { c++; continue; }
          var pi = prow[c];
          var start = c;
          c++;
          while (c < cols && crow[c] === ch && prow[c] === pi) { c++; }
          ctx.fillStyle = palette[Number(pi)];
          var run = '';
          for (var k = 0; k < c - start; k++) { run += ch; }
          ctx.fillText(run, start * cellW, r * cellH + cellH / 2);
        }
      }
    }

    var frameIndex = 0;
    var last = 0;

    function step(ts) {
      if (el.offsetParent === null) {
        requestAnimationFrame(step);
        return;
      }
      if (!last) { last = ts; }
      var delta = ts - last;
      if (delta >= frameDuration) {
        last = ts;
        draw(frameIndex);
        frameIndex = (frameIndex + 1) % frames.length;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
})();
