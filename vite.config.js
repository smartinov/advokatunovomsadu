import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The GitHub Pages preview lives under a subpath; scripts/prerender.js marks it noindex.
const base = process.env.BASE_PATH || "/";

const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "script-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

// Fontsource ships font-display: swap, which repaints text on every page load; with the fonts preloaded,
// optional renders them directly and never swaps mid-read.
const fontDisplayOptional = {
  name: "font-display-optional",
  transform: (code, id) => (id.includes("@fontsource") ? code.replaceAll("font-display: swap", "font-display: optional") : null),
};

// Build-only: the dev server injects inline scripts that this CSP would block.
const cspMeta = {
  name: "csp-meta",
  apply: "build",
  transformIndexHtml: (html) =>
    html.replace('<meta charset="utf-8" />', `<meta charset="utf-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`),
};

export default defineConfig({
  base,
  plugins: [react(), cspMeta, fontDisplayOptional],
});
