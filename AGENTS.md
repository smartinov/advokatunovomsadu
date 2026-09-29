# AGENTS.md

## Repository Shape
- Vite + React source for the Marić, Nedić i Biro law firm site. Source under `src/` was recovered from the original CRA source maps.
- Two pages, each its own HTML entry: `index.html` (home) and `tekstovi.html` (articles, `<body data-page="tekstovi">`). There is no client router; pages link with plain `<a>` tags.
- Content is hard-coded in `src/context/GeneralContext.jsx` (team, practice areas, Latin sayings) and `src/context/ArticlesContext.jsx` (articles). SEO metadata and JSON-LD live in the two HTML entries.
- Static files served as-is live in `public/` (robots, sitemap, manifest, icons, `og-image.jpg`).

## Commands
- `npm ci`, `npm run dev`, `npm run build`, `npm run preview`. There is no lint or test config.
- `npm run build` runs a client build, an SSR build of `src/entry-server.jsx`, and `scripts/prerender.js`, which writes the rendered markup into `dist/*.html`. The client hydrates that markup.
- `BASE_PATH=/advokatunovomsadu/ npm run build` builds the GitHub Pages preview: subpath URLs and `noindex`. The default `/` build targets the production domain root.
- The local npm config uses a `before` release-age gate, so `npm install pkg@latest` may resolve older than the registry's latest.

## Deployment
- Pushes to `main` deploy the preview to GitHub Pages through `.github/workflows/pages.yml`.
- Production (www.advokatunovomsadu.rs) is a separate Plesk/nginx host. It is not deployed from this repository.

## Editing Guidance
- Keep the first rendered state deterministic (no `Math.random`, `window`, or `document` during render). Otherwise hydration of the prerendered HTML breaks.
- The CSP meta tag is injected at build time in `vite.config.js`. Loading a new third-party origin requires updating it.
- Components styled as cards use `clickable()` from `src/a11y.js` for keyboard access. Dialogs go through `Dialog` in `src/components/Modal/modal.jsx`.
- The global macOS `Icon?` gitignore pattern matches `src/components/Icons/`; the repo `.gitignore` re-includes it.
