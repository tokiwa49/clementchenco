(function () {
  var row = document.querySelector('.closing-cta-row');
  var title = document.querySelector('.closing-cta-title');
  var content = document.querySelector('.closing-cta-content');
  var art = document.querySelector('.closing-cta-art');
  if (!row || !title || !content || !art) {
    return;
  }

  var mq = window.matchMedia('(min-width: 640px)');

  function measure() {
    var range = document.createRange();
    range.selectNodeContents(title);
    return {
      text: range.getBoundingClientRect(),
      row: row.getBoundingClientRect(),
      content: content.getBoundingClientRect()
    };
  }

  function align() {
    if (!mq.matches) {
      art.style.marginTop = '';
      art.style.width = '';
      art.style.height = '';
      return;
    }

    var rowGap = parseFloat(window.getComputedStyle(row).columnGap) || 0;
    // A fixed CSS length, not content-derived — safe to read once, no
    // reflow-per-guess needed the way content's rendered width is.
    var contentMinWidth = parseFloat(window.getComputedStyle(content).minWidth) || 0;

    // The cat should always be as tall as the title's own text, so it
    // reads as always spanning the heading's top-to-bottom rather than
    // floating short of one edge, at every width where it sits beside
    // the text at all. The only hard limit is the row running out of
    // room once content has shrunk to its own min-width floor — never a
    // guessed vw-based number. Growing the cat can narrow content
    // (flex-shrink: 1), which can wrap the title onto more lines, which
    // grows the text height the cat is chasing — so this settles over a
    // few passes rather than one: set a size, see how content actually
    // rendered in response, adjust, repeat until it stops moving.
    var size = 0;
    for (var i = 0; i < 6; i++) {
      art.style.width = size + 'px';
      art.style.height = size + 'px';
      var m = measure();
      var ceiling = Math.max(0, m.row.width - contentMinWidth - rowGap);
      var next = Math.max(0, Math.min(m.text.height, ceiling));
      if (Math.abs(next - size) < 0.5) {
        size = next;
        break;
      }
      size = next;
    }

    var m2 = measure();
    art.style.width = size + 'px';
    art.style.height = size + 'px';
    art.style.marginTop = (m2.text.top - m2.row.top + (m2.text.height - size) / 2) + 'px';
  }

  align();
  window.addEventListener('resize', align);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(align);
  }
})();
