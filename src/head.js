import { SITE, routes } from "./routes";
import { faq, office, team } from "./content";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// JSON-LD is embedded in a script tag, so "<" must not appear literally.
const ld = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

const firmId = `${SITE}/#firm`;

function firm() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": firmId,
        name: office.name,
        url: `${SITE}/`,
        image: `${SITE}/og-image.jpg`,
        logo: `${SITE}/logo192.png`,
        telephone: team[0].phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: office.street,
          postalCode: office.postalCode,
          addressLocality: office.city,
          addressCountry: "RS",
        },
        geo: { "@type": "GeoCoordinates", ...office.geo },
        hasMap: office.mapUrl,
        areaServed: { "@type": "City", name: office.city },
        employee: team.map((m) => ({ "@id": `${SITE}/#${m.slug}` })),
      },
      ...team.map((m) => ({
        "@type": "Person",
        "@id": `${SITE}/#${m.slug}`,
        name: m.name,
        jobTitle: m.title,
        email: m.email,
        telephone: m.phone,
        worksFor: { "@id": firmId },
      })),
      { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: office.name, inLanguage: "sr-RS" },
    ],
  };
}

function breadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE}${path}`,
    })),
  };
}

const pageCrumbs = (route) => breadcrumbs([["Početna", "/"], [route.title.split(" | ")[0], route.path]]);

function structuredData(route, base) {
  if (route.page === "home") return [firm()];
  if (route.page === "contact") return [firm(), pageCrumbs(route)];
  if (route.page === "faq") {
    const text = (a) => a.map((p) => (Array.isArray(p) ? p.join(" ") : p)).join(" ");
    return [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "sr-RS",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: text(item.a) },
        })),
      },
      pageCrumbs(route),
    ];
  }
  if (route.page === "article") {
    const a = route.article;
    const firmRef = { "@type": "LegalService", "@id": firmId, name: office.name };
    return [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.title,
        description: a.lede,
        // Asset URLs carry the build base; canonical URLs never do.
        image: `${SITE}/${a.img.slice(base.length)}`,
        inLanguage: "sr-RS",
        mainEntityOfPage: `${SITE}${route.path}`,
        author: firmRef,
        publisher: firmRef,
      },
      breadcrumbs([["Početna", "/"], ["Stručni tekstovi", "/tekstovi/"], [a.title, route.path]]),
    ];
  }
  if (route.page === "notfound") return [];
  return [pageCrumbs(route)];
}

export function renderHead(route, { base, preview }) {
  const url = `${SITE}${route.path}`;
  const robots = preview || route.noindex ? "noindex,follow" : "index,follow";
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    route.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<link rel="icon" href="${base}favicon.ico" sizes="any" />`,
    `<link rel="apple-touch-icon" href="${base}logo192.png" />`,
    `<meta property="og:type" content="${route.page === "article" ? "article" : "website"}" />`,
    `<meta property="og:locale" content="sr_RS" />`,
    `<meta property="og:site_name" content="Advokati u Novom Sadu" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...structuredData(route, base).map(ld),
  ]
    .filter(Boolean)
    .join("\n    ");
}

export function renderSitemap() {
  const urls = routes.map((r) => `  <url><loc>${SITE}${r.path}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
