(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-navigation');
  if (toggle && nav) {
    toggle.hidden = false;
    const close = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = 'Menu'; };
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { close(); toggle.focus(); } });
    window.matchMedia('(min-width: 651px)').addEventListener('change', close);
  }
  const strip = document.getElementById('cc-investments');
  if (strip) {
    const group = strip.querySelector('[data-logo-row="rolling"]');
    const duplicate = strip.querySelector('.duplicate-group');
    const control = strip.querySelector('.motion-control');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let playing = !reduced.matches;
    for (const company of group.children) {
      const copy = document.createElement('span');
      copy.className = company.className;
      copy.dataset.company = company.dataset.company;
      for (const child of company.children) copy.append(child.cloneNode(true));
      copy.querySelectorAll('img').forEach(image => { image.alt = ''; });
      duplicate.append(copy);
    }
    const render = () => {
      strip.dataset.playing = String(playing && !reduced.matches);
      control.textContent = playing && !reduced.matches ? 'Pause motion' : 'Play motion';
      control.setAttribute('aria-pressed', String(playing && !reduced.matches));
      control.hidden = reduced.matches;
      strip.querySelector('.motion-status').textContent = reduced.matches ? 'All investments shown without animation.' : '';
    };
    control.addEventListener('click', () => { playing = !playing; render(); });
    reduced.addEventListener('change', () => { playing = !reduced.matches; render(); });
    render();
  }
})();
