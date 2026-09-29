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

## Checklist before merging
CI runs only `npm test` and the build, so layout and content problems pass it. Do the rest by hand.

- [ ] `npm test` and `npm run build` pass; for URL or asset changes, `BASE_PATH=/advokatunovomsadu/ npm run build` too.
- [ ] Every changed page checked in `npm run preview` at 375, 768, 1024, 1440 and 1920px.
- [ ] Positions measured, not eyeballed from scaled full-page screenshots: main content, lists and article text start at the H1's left edge; no horizontal scroll; header nav on one line or the menu button shown.
- [ ] Interactions still work: mobile menu (Escape closes it), lawyer dialogs (close button, Escape, focus returns), calculator (500.000 tužba = 21.000 RSD), contact form opens a `mailto:` to the chosen lawyer.
- [ ] No console errors, hydration warnings or requests to other origins.
- [ ] Redesign work compared side by side with the design, not only checked for breakage.
- [ ] Content changes: confirmed by the firm, no invented dates, stats, hours or promises.
- [ ] Merge only after the PR's `build` check has finished green; a pending check does not block the merge button.
- [ ] After the Pages deploy, re-check the changed pages on the live URL.

## Deployment
- Pull requests are built and tested. Pushes to `main` also deploy the preview to GitHub Pages.
- Production (www.advokatunovomsadu.rs) is hosted elsewhere and is not deployed from this repository.
