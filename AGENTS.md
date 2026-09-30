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

## Adding an article
Lawyers write the articles themselves. Guide them to a finished article; do not supply the legal substance.

- Before editing, collect from the lawyer: the reader's question the article answers, the full text, the legal area and an image. Ask for anything missing.
- The lawyer owns the content. You may restructure, shorten and fix typos, but show every change for approval. Never add laws, article numbers, deadlines, amounts or cases that are not in their text. Ask them to confirm that cited law is still current.
- Add the article as the first entry of `articles` in `src/content.js`; the home page features the first three. Route, sitemap and JSON-LD follow automatically.
- `title`: the phrase a client would search for, such as "Razvod braka". Keep it short: search results cut titles at about 60 characters, including " | Advokati u Novom Sadu".
- `slug`: the title in lowercase ASCII with hyphens (č/ć→c, š→s, ž→z, đ→dj).
- `lede`: 120–160 characters that answer the question in plain words. It is also the Google snippet.
- `tag`: one of the tags in `src/content.test.js`. Add a new legal area there only on purpose.
- `body`: open with a paragraph that answers the question directly. Use paragraphs of 2–4 sentences, a `{ h2: "…" }` subheading every 3–5 paragraphs, phrased the way clients ask, and `{ ul: ["…"] }` lists for documents, steps and conditions. Plain text only: no HTML, bold or links. Cite laws by full name and article. Mention Novi Sad only where it is natural.
- `img`: a landscape photo the firm owns or has licensed, at least 1200px wide. Save it as `.webp` under about 100 KB in `src/assets/images/` and import it in `content.js`.
- `npm test` checks slug, tag, title and lede length and body format. Then check the article in `npm run preview` and publish through a PR as usual.

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
- [ ] After the Pages deploy, re-check the changed pages on the demo URL.

## Deployment
- Pull requests are built and tested. Pushes to `main` also deploy the demo to GitHub Pages (https://smartinov.github.io/advokatunovomsadu/). Every demo page is `noindex`, with its canonical pointing to production.
- Production (https://www.advokatunovomsadu.rs/) is a Plesk subscription on `webhosting15.oblaci.rs`. Deploy it only by running the `Deploy production over FTPS` workflow from `main`, after checking the change on the demo. The workflow mirrors `dist/` into `httpdocs` and deletes remote files missing from the build, except `.well-known/`.
- Credentials: the 1Password item `AdvokatUNovomSadu FTP github_publish` holds the FTP account; the Plesk panel login is in `AdvokatUNovomSadu`. The workflow reads `FTP_USERNAME` and `FTP_PASSWORD` from the `production` GitHub environment, which only `main` may deploy to.
- Rollback: revert the bad commit on `main`, then run the workflow again.
