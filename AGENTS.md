# AGENTS.md

## Repository Shape
- This checkout is a built Create React App static site, not the editable source tree: there is no `package.json`, lockfile, test config, lint config, or CI workflow here.
- Treat `index.html`, `asset-manifest.json`, and the hashed files under `static/` as deployable artifacts. Do not invent npm/yarn/pnpm commands for this repo.
- The bundled app still includes source maps. Use `static/js/main.c4f006a1.js.map` and `static/css/main.35d6a87b.css.map` for reconstruction/context before touching minified assets.

## Local Verification
- Static smoke check from the repo root: `python3 -m http.server 8000`, then open `http://localhost:8000/`.
- Do not report build, lint, typecheck, or test success unless source files and tool config are added or restored.
- The app uses React Router `BrowserRouter` with routes `/` and `/tekstovi`; a plain static server will not handle a direct refresh on `/tekstovi` unless the host rewrites unknown paths to `/index.html`.

## App Facts
- Runtime entrypoints are `index.html` -> `/static/js/main.c4f006a1.js` and `/static/css/main.35d6a87b.css`.
- Reconstructed source entrypoints are `index.js` and `App.js`; app content is hard-coded in `context/GeneralContext.js` and `context/ArticlesContext.js` inside the JS source map.
- There is no backend/API/env loading, service worker, or browser storage use visible in this build; contact/team/article data is bundled client-side.
- Asset URLs are root-relative (`/static/...`, `/manifest.json`, `/favicon.ico`), so the site expects to be hosted at a domain root unless paths are rebuilt or patched consistently.

## Editing Guidance
- Prefer obtaining/restoring the original React source and rebuilding over editing `static/js/main.c4f006a1.js` or `static/css/main.35d6a87b.css` directly.
- If making an emergency artifact-only patch, keep references consistent across `index.html`, `asset-manifest.json`, hashed asset filenames, and any published `sourceMappingURL` comments.
