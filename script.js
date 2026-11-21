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

  /* A visitor's theme choice applies to every page. Dark = Cobalt Blueprint. */
  const themeButtons = document.querySelectorAll('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme, remember = false) {
    const light = theme === 'light';
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    if (themeMeta) themeMeta.content = light ? '#f7f9fd' : '#12389b';
    themeButtons.forEach(button => {
      const label = button.querySelector('.theme-toggle-text');
      const icon = button.querySelector('.theme-toggle-icon');
      if (label) label.textContent = light ? 'Dark mode' : 'Light mode';
      if (icon) icon.textContent = light ? '\u263e' : '\u2600';
      button.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      button.setAttribute('aria-pressed', String(light));
    });
    if (remember) {
      try { localStorage.setItem('fabio-site-theme', light ? 'light' : 'dark'); }
      catch (error) { /* Storage can be disabled in private browsing. */ }
    }
  }

  setTheme(document.documentElement.dataset.theme);
  themeButtons.forEach(button => button.addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light', true);
  }));

  /* Copy the original entry from assets/publications.bib; no duplication. */
  let bibliographyPromise;
  function readBibEntries(source) {
    const entries = new Map();
    const entryStart = /@[a-zA-Z]+\s*\{\s*([^,\s]+)\s*,/g;
    let match;
    while ((match = entryStart.exec(source)) !== null) {
      const key = match[1];
      let depth = 1;
      let i = entryStart.lastIndex;
      while (i < source.length && depth > 0) {
        if (source[i] === '{' && source[i - 1] !== '\\') depth++;
        if (source[i] === '}' && source[i - 1] !== '\\') depth--;
        i++;
      }
      if (depth === 0) entries.set(key, source.slice(match.index, i).trim());
      entryStart.lastIndex = i;
    }
    return entries;
  }
  function getBibliography() {
    if (!bibliographyPromise) {
      bibliographyPromise = fetch('assets/publications.bib')
        .then(response => {
          if (!response.ok) throw new Error('BibTeX source not available');
          return response.text();
        })
        .then(readBibEntries)
        .catch(error => { bibliographyPromise = undefined; throw error; });
    }
    return bibliographyPromise;
  }
  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) { /* Use the fallback below. */ }
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try { copied = document.execCommand('copy'); }
    finally { textarea.remove(); }
    if (!copied) throw new Error('Clipboard unavailable');
  }
  document.querySelectorAll('.bibtex-copy[data-bibtex-key]').forEach(button => {
    let resetTimer;
    button.addEventListener('click', async () => {
      const label = button.querySelector('.bibtex-button-label');
      if (!label || button.disabled) return;
      button.disabled = true;
      label.textContent = 'Copying...';
      try {
        const entries = await getBibliography();
        const entry = entries.get(button.dataset.bibtexKey);
        if (!entry) throw new Error('Citation missing from publications.bib');
        await copyToClipboard(entry);
        label.textContent = 'Copied!';
        button.classList.add('copied');
      } catch (error) {
        label.textContent = 'Copy failed';
        button.classList.remove('copied');
        console.warn('BibTeX copy failed:', error);
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        label.textContent = 'Copy BibTeX';
        button.classList.remove('copied');
        button.disabled = false;
      }, 1900);
    });
  });

})();
