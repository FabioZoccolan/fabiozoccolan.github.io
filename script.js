/* Lightweight, dependency-free navigation and image enlargement. */
(() => {
  const body = document.body;
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('menu-backdrop');
  const sidebar = document.getElementById('site-sidebar');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll('main > section[id]')];

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    if (overlay) overlay.hidden = !open;
  }
  toggle?.addEventListener('click', () => {
    const open = !body.classList.contains('menu-open');
    setMenu(open);
    if (open) sidebar?.querySelector('.site-nav a')?.focus();
  });
  overlay?.addEventListener('click', () => setMenu(false));
  navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });

  let tick = false;
  function updateActiveLink() {
    const cutoff = window.innerHeight * 0.33;
    let current = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= cutoff) current = section; });
    for (const link of navLinks) {
      const active = link.getAttribute('href') === `#${current.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    tick = false;
  }
  window.addEventListener('scroll', () => {
    if (tick) return;
    tick = true;
    window.requestAnimationFrame(updateActiveLink);
  }, {passive: true});
  updateActiveLink();

  const dialog = document.getElementById('image-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogCaption = document.getElementById('dialog-caption');
  document.querySelectorAll('.figure-open[data-full]').forEach(button => {
    button.addEventListener('click', () => {
      const thumb = button.querySelector('img');
      if (!dialog || typeof dialog.showModal !== 'function') {
        window.open(button.dataset.full, '_blank', 'noopener,noreferrer');
        return;
      }
      dialogImage.src = button.dataset.full;
      dialogImage.alt = thumb?.alt ?? 'Scientific figure';
      dialogCaption.textContent = button.dataset.caption ?? 'Scientific figure';
      dialog.showModal();
    });
  });
  document.getElementById('dialog-close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    dialogImage.removeAttribute('src');
  });
})();
