import fs from "node:fs";
import { render } from "../dist-ssr/entry-server.js";

const pages = { "dist/index.html": undefined, "dist/tekstovi.html": "tekstovi" };
const root = '<div id="root"></div>';

for (const [file, page] of Object.entries(pages)) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes(root)) throw new Error(`${file}: missing ${root}`);
  fs.writeFileSync(file, html.replace(root, `<div id="root">${render(page)}</div>`));
}

fs.rmSync("dist-ssr", { recursive: true });
