import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";

// content.js imports images, which only Vite can load.
registerHooks({
  load: (url, context, next) =>
    url.endsWith(".webp") ? { format: "module", source: `export default ${JSON.stringify(url)}`, shortCircuit: true } : next(url, context),
});
const { articles } = await import("./content.js");

// Extend deliberately: every tag becomes a breadcrumb and a card label.
const TAGS = ["Krivično pravo", "Nasledno pravo", "Porodično pravo", "Privredno pravo", "Radno pravo"];

for (const a of articles) {
  test(`article ${a.slug} follows the AGENTS.md article rules`, () => {
    assert.match(a.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, "slug: lowercase ASCII words joined by hyphens");
    assert.ok(TAGS.includes(a.tag), `tag must be one of: ${TAGS.join(", ")}`);
    assert.ok(`${a.title} | Advokati u Novom Sadu`.length <= 70, "title too long for search results");
    assert.ok(a.lede.length >= 50 && a.lede.length <= 160, `lede is ${a.lede.length} characters, expected 50-160`);
    assert.match(a.img, /\.webp$/, "img: import a .webp from src/assets/images");
    assert.equal(typeof a.body[0], "string", "body starts with a paragraph");
    for (const b of a.body) {
      const ok =
        (typeof b === "string" && b.trim().length > 0) ||
        (typeof b?.h2 === "string" && b.h2.length > 0) ||
        (Array.isArray(b?.ul) && b.ul.length > 0 && b.ul.every((li) => typeof li === "string"));
      assert.ok(ok, `body item must be a paragraph, { h2 } or { ul: [...] }: ${JSON.stringify(b).slice(0, 80)}`);
    }
  });
}

test("article slugs are unique", () => {
  const slugs = articles.map((a) => a.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});
