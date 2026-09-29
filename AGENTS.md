# AGENTS.md

Vite + React site for the law firm Marić, Nedić i Biro. Serbian interface. Every route is prerendered to static HTML.

## Commands
- `npm ci`, `npm test`, `npm run dev`, `npm run build`
- `BASE_PATH=/advokatunovomsadu/ npm run build` builds the GitHub Pages preview: subpath URLs and `noindex`.

## Where things live
- Content: `src/content.js`. Add only facts the firm has confirmed; no invented dates, stats, hours or promises.
- Routes: `src/routes.js`, which drives prerendering and `sitemap.xml`. `<head>` and JSON-LD: `src/head.js`.
- Court-fee calculator: `src/taksa.js`. Change amounts only against the published tariff, and update `VERIFIED_ON` and `src/taksa.test.js`.

## Rules
- Build internal links with `href()` from `src/components/Layout.jsx` so the Pages subpath works. External, `mailto:`, `tel:` and `#` links bypass it.
- The first render must be deterministic (no `Math.random`, `window` or `document`), or hydration breaks.
- Never mutate classes or attributes on elements React renders.
- Loading images, fonts or scripts from a new origin requires a change to the build-time CSP in `vite.config.js`.

## Deployment
- Pull requests are built and tested. Pushes to `main` also deploy the preview to GitHub Pages.
- Production (www.advokatunovomsadu.rs) is hosted elsewhere and is not deployed from this repository.
