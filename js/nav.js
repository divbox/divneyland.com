(() => {
  const links = [
    { href: 'index.html',   label: 'Home' },
    { href: 'gallery.html', label: 'Gallery' },
    { href: 'about.html',   label: 'About' },
  ];

  const forecast = [
    { theme: 'campfire', emoji: '🔥', label: 'Campfire' },
    { theme: 'forest',   emoji: '🌲', label: 'Forest Trail' },
    { theme: 'night',    emoji: '🌙', label: 'Night Camp' },
  ];

  const page = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = links.map(({ href, label }) => {
    const active = href === page ? ' active' : '';
    return `<li class="nav-item"><a class="nav-link${active}" href="${href}">${label}</a></li>`;
  }).join('\n          ');

  const forecastBtns = forecast.map(({ theme, emoji, label }) =>
    `<button class="dv-forecast-btn" data-theme="${theme}" title="${label}" aria-label="${label}">${emoji}</button>`
  ).join('\n        ');

  /* ── Nav ─────────────────────────────────────────────────── */
  const navHtml = `
<nav class="navbar navbar-expand-md navbar-dark dv-navbar">
  <div class="container">
    <a class="navbar-brand dv-brand" href="index.html"><span class="dv-brand-icon">🎡</span> Divneyland</a>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#mainNav"
            aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav ms-auto gap-2">
        ${navLinks}
      </ul>
      <div class="dv-forecast ms-3">
        <span class="dv-forecast-label">The Forecast</span>
        ${forecastBtns}
      </div>
    </div>
  </div>
</nav>`.trim();

  const navRoot = document.getElementById('site-nav');
  if (navRoot) navRoot.outerHTML = navHtml;

  document.querySelectorAll('.dv-forecast-btn').forEach(btn => {
    btn.addEventListener('click', () => window.dvSetTheme(btn.dataset.theme));
  });

  const current = document.documentElement.getAttribute('data-theme') || 'campfire';
  document.querySelectorAll('.dv-forecast-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === current);
  });

  /* ── Footer ──────────────────────────────────────────────── */
  const year = new Date().getFullYear();
  const footerHtml = `
<footer class="dv-footer text-center py-4">
  <p class="mb-0">Made with ❤️ by Claude</p>
  <p class="mb-0 dv-footer-copy">© ${year} Divneyland</p>
</footer>`.trim();

  const footerRoot = document.getElementById('site-footer');
  if (footerRoot) footerRoot.outerHTML = footerHtml;
})();
