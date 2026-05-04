# divneyland.com

Family photo archive. Static site — HTML/CSS/JS, Bootstrap, Cloudinary for images.

## Structure

```
/
├── index.html          Home page
├── gallery.html        Photo gallery (driven by data/photos.json)
├── about.html          About page
├── css/
│   ├── theme.css       Global theme (tokens, navbar, hero, cards, footer)
│   └── gallery.css     Gallery grid + lightbox styles
├── js/
│   └── gallery.js      Loads photos.json, renders grid + filters + lightbox
├── data/
│   └── photos.json     Photo manifest — one entry per image
└── tools/
    └── upload/         Node upload script (converts, uploads, appends manifest)
```

## Adding photos

Use the upload tool in `tools/upload/`. It handles HEIC→JPG conversion, resizing,
Cloudinary upload, and appending the manifest entry.

## Deploying

Push to `main` — GitHub Pages deploys automatically.
All changes go through a PR; no direct commits to `main`.

## Cloudinary

Cloudinary cloud name: `dckuzho0v` (set in `js/gallery.js`).
