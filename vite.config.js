import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The GitHub Pages preview lives under a subpath and must not compete with the production domain in search.
const base = process.env.BASE_PATH || "/";
const isPreview = base !== "/";

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

// Build-only: the dev server injects inline scripts that this CSP would block.
const hardenHtml = {
  name: "harden-html",
  apply: "build",
  transformIndexHtml: (html) => {
    const withCsp = html.replace(
      "<head>",
      `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`
    );
    return isPreview
      ? withCsp.replace('content="index,follow"', 'content="noindex,follow"')
      : withCsp;
  },
};

export default defineConfig({
  base,
  plugins: [react(), hardenHtml],
  build: {
    rollupOptions: {
      input: ["index.html", "tekstovi.html"],
    },
  },
});
