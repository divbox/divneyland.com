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

  /* Detect active page by matching the filename */
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = links.map(({ href, label }) => {
    const active = href === page ? ' active' : '';
    return `<li class="nav-item"><a class="nav-link${active}" href="${href}">${label}</a></li>`;
  }).join('\n          ');

  const forecastBtns = forecast.map(({ theme, emoji, label }) =>
    `<button class="dv-forecast-btn" data-theme="${theme}" title="${label}" aria-label="${label}">${emoji}</button>`
  ).join('\n        ');

  const html = `
<nav class="navbar navbar-expand-md navbar-dark dv-navbar">
  <div class="container">
    <a class="navbar-brand dv-brand" href="index.html">✨ Divneyland</a>
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

  const root = document.getElementById('site-nav');
  if (root) {
    root.outerHTML = html;
  }

  /* Wire up buttons — runs after nav is in the DOM */
  document.querySelectorAll('.dv-forecast-btn').forEach(btn => {
    btn.addEventListener('click', () => window.dvSetTheme(btn.dataset.theme));
  });

  /* Sync active button with current theme */
  const current = document.documentElement.getAttribute('data-theme') || 'campfire';
  document.querySelectorAll('.dv-forecast-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === current);
  });
})();
