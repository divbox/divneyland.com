const CLOUDINARY_BASE = 'https://res.cloudinary.com/dckuzho0v/image/upload';

const grid = document.getElementById('photoGrid');
const filterBar = document.getElementById('filterBar');
const lightbox = new bootstrap.Modal(document.getElementById('lightbox'));
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

let allPhotos = [];
let activeFilter = null; // { type, value }

async function init() {
  const res = await fetch('data/photos.json');
  allPhotos = await res.json();
  buildFilters();
  renderGrid(allPhotos);
}

function buildFilters() {
  const years = [...new Set(allPhotos.map(p => p.year).filter(Boolean))].sort();
  const people = [...new Set(allPhotos.flatMap(p => p.people ?? []))].sort();
  const tags = [...new Set(allPhotos.flatMap(p => p.tags ?? []))].sort();

  const groups = [
    { label: 'Year', type: 'year', values: years },
    { label: 'People', type: 'person', values: people },
    { label: 'Tag', type: 'tag', values: tags },
  ];

  groups.forEach(({ type, values }) => {
    values.forEach(val => {
      const btn = document.createElement('button');
      btn.className = 'dv-filter-btn';
      btn.textContent = val;
      btn.dataset.type = type;
      btn.dataset.value = val;
      btn.addEventListener('click', () => toggleFilter(btn, type, val));
      filterBar.appendChild(btn);
    });
  });
}

function toggleFilter(btn, type, value) {
  const isSame = activeFilter?.type === type && activeFilter?.value === value;
  document.querySelectorAll('.dv-filter-btn').forEach(b => b.classList.remove('active'));

  if (isSame) {
    activeFilter = null;
    renderGrid(allPhotos);
  } else {
    activeFilter = { type, value };
    btn.classList.add('active');
    renderGrid(filtered());
  }
}

function filtered() {
  const { type, value } = activeFilter;
  return allPhotos.filter(p => {
    if (type === 'year') return p.year === value;
    if (type === 'person') return p.people?.includes(value);
    if (type === 'tag') return p.tags?.includes(value);
    return true;
  });
}

function thumbUrl(cloudinaryId) {
  return `${CLOUDINARY_BASE}/w_600,h_450,c_fill,q_auto,f_auto/${cloudinaryId}`;
}

function fullUrl(cloudinaryId) {
  return `${CLOUDINARY_BASE}/w_1200,q_auto,f_auto/${cloudinaryId}`;
}

function renderGrid(photos) {
  grid.innerHTML = '';

  if (!photos.length) {
    grid.innerHTML = '<p class="text-muted">No photos match this filter.</p>';
    return;
  }

  photos.forEach(photo => {
    const div = document.createElement('div');
    div.className = 'dv-thumb';

    const img = document.createElement('img');
    img.src = thumbUrl(photo.cloudinary_id);
    img.alt = photo.caption || photo.file;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'dv-thumb-overlay';

    const cap = document.createElement('div');
    cap.className = 'dv-thumb-caption';
    cap.textContent = [photo.caption, photo.year, photo.location].filter(Boolean).join(' · ');

    overlay.appendChild(cap);
    div.appendChild(img);
    div.appendChild(overlay);

    div.addEventListener('click', () => openLightbox(photo));
    grid.appendChild(div);
  });
}

function openLightbox(photo) {
  lightboxImg.src = fullUrl(photo.cloudinary_id);
  lightboxImg.alt = photo.caption || photo.file;
  lightboxCaption.textContent = [photo.caption, photo.year, photo.location]
    .filter(Boolean).join(' · ');
  lightbox.show();
}

init().catch(err => {
  grid.innerHTML = `<p class="text-danger">Could not load photos: ${err.message}</p>`;
});
