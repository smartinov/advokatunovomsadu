# AGENTS.md

Vite + React site for the law firm Marić, Nedić i Biro. Serbian only. Every route is prerendered to static HTML.

## Commands
- `npm ci`, `npm test`, `npm run dev`, `npm run build`
- `BASE_PATH=/advokatunovomsadu/ npm run build` builds the GitHub Pages preview: subpath URLs and `noindex`.
- The local npm config has a `before` release-age gate, so `@latest` can resolve to an older version.

## Where things live
- Content: `src/content.js`. Add only facts the firm has confirmed; no dates, stats, hours or promises.
- Routes: `src/routes.js`, which drives prerendering and `sitemap.xml`. `<head>` and JSON-LD: `src/head.js`.
- Court-fee calculator: `src/taksa.js` (Zakon o sudskim taksama, Sl. glasnik RS 91/2025). Change amounts only against the published tariff, and update `VERIFIED_ON` and `src/taksa.test.js`.
- CSP: injected at build time by `vite.config.js`. A new third-party origin needs a CSP change.

## Rules
- Link with `href()` from `src/components/Layout.jsx` so the Pages subpath works.
- The first render must be deterministic (no `Math.random`, `window` or `document`), or hydration breaks.
- Never mutate classes or attributes on elements React renders.

## Deployment
- Pushes to `main` deploy the preview to GitHub Pages (`.github/workflows/pages.yml`).
- Production (www.advokatunovomsadu.rs) is a separate Plesk host and is not deployed from here.
