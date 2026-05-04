const THEMES = ['campfire', 'forest', 'night'];
const STORAGE_KEY = 'dv-theme';
const DEFAULT = 'campfire';

function applyTheme(name) {
  const theme = THEMES.includes(name) ? name : DEFAULT;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  document.querySelectorAll('.dv-forecast-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT;
  applyTheme(saved);
}

/* Expose globally so nav.js buttons and any future code can call it */
window.dvSetTheme = applyTheme;

initTheme();
