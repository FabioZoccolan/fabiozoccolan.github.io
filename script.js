/* Multi-page navigation and scientific-figure lightbox; no dependencies. */
(() => {
  const body = document.body;
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('menu-backdrop');
  const sidebar = document.getElementById('site-sidebar');

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
  document.querySelectorAll('.site-nav a').forEach(link =>
    link.addEventListener('click', () => setMenu(false))
  );
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });

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
  dialog?.addEventListener('close', () => dialogImage?.removeAttribute('src'));
})();
