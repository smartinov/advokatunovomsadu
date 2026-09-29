import fs from "node:fs";
import path from "node:path";
import { notFound, render, renderHead, renderSitemap, routes } from "../dist-ssr/entry-server.js";

const base = process.env.BASE_PATH || "/";
const preview = base !== "/";
const template = fs.readFileSync("dist/index.html", "utf8");

for (const marker of ["<!--app-head-->", '<div id="root"></div>']) {
  if (!template.includes(marker)) throw new Error(`dist/index.html: missing ${marker}`);
}

const page = (route) =>
  template
    .replace("<!--app-head-->", renderHead(route, { base, preview }))
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`);

for (const route of routes) {
  const file = path.join("dist", route.path, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(route));
}
fs.writeFileSync("dist/404.html", page(notFound));
fs.writeFileSync("dist/sitemap.xml", renderSitemap());
fs.rmSync("dist-ssr", { recursive: true });
