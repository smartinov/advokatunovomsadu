import { positiveInt } from "./calc.js";

// APR registration fees under the APR fee decision published in Sl. glasnik RS 95/2025, applied from 1 January 2026.
// Amounts are indexed yearly by CPI (član 42), so recheck them after each published adjustment.

export const LAW = "Odluka o naknadama za poslove registracije i druge usluge koje pruža Agencija za privredne registre (Sl. glasnik RS 95/2025)";
export const VERIFIED_ON = "29. 9. 2026.";

export const SOURCES = [
  {
    label: "Odluka o naknadama za poslove registracije i druge usluge APR, Paragraf Lex",
    url: "https://www.paragraf.rs/propisi/odluka_o_naknadama_za_poslove_registracije_i_druge_usluge_koje_pruza_agencija_za_privredne_registre.html",
  },
  { label: "Naknade za privredna društva, APR", url: "https://www.apr.gov.rs/registri/privredna-drustva/naknade.2044.html" },
  { label: "Naknade za preduzetnike, APR", url: "https://www.apr.gov.rs/registri/preduzetnici/naknade.4864.html" },
  { label: "Naknade za založno pravo, APR", url: "https://www.apr.gov.rs/registri/založno-pravo/naknade.2193.html" },
];

const changes = (amount) => ({ key: "promene", label: "Broj promena u prijavi", amount, from: 1 });
// Član 16: each further subject or thing in one pledge filing adds 300 dinars to the fees from čl. 11–15.
const pledgeItems = { key: "stvari", label: "Broj subjekata ili stvari u prijavi", amount: 300, from: 1 };

export const SERVICES = [
  { id: "osnivanje-drustva", label: "Osnivanje DOO ili drugog privrednog društva", amount: 8_000, basis: "član 2" },
  { id: "osnivanje-udruzenja", label: "Osnivanje udruženja", amount: 8_000, basis: "član 2" },
  { id: "osnivanje-preduzetnika", label: "Osnivanje preduzetnika", amount: 2_500, basis: "član 8" },
  {
    id: "promena-drustva",
    label: "Promena podataka o privrednom društvu ili udruženju",
    amount: 4_000,
    basis: "član 3",
    extras: [
      changes(3_000),
      { key: "clanovi", label: "Članovi ili suvlasnici čiji se udeo upisuje", amount: 500, from: 0 },
    ],
    late: 6_260,
  },
  { id: "promena-preduzetnika", label: "Promena podataka o preduzetniku", amount: 1_400, basis: "član 9", extras: [changes(700)] },
  { id: "brisanje-drustva", label: "Brisanje privrednog društva ili udruženja", amount: 4_000, basis: "član 4 tač. 4" },
  { id: "brisanje-preduzetnika", label: "Brisanje preduzetnika", amount: 1_400, basis: "član 9" },
  { id: "naziv-drustva", label: "Rezervacija naziva privrednog društva", amount: 2_000, basis: "član 4" },
  { id: "naziv-preduzetnika", label: "Rezervacija naziva preduzetnika", amount: 1_400, basis: "član 9" },
  { id: "zaloga-10", label: "Upis zaloge, potraživanje do 10.000 evra", amount: 3_000, basis: "član 11", extras: [pledgeItems] },
  { id: "zaloga-200", label: "Upis zaloge, potraživanje preko 10.000 do 200.000 evra", amount: 7_000, basis: "član 11", extras: [pledgeItems] },
  { id: "zaloga-vise", label: "Upis zaloge, potraživanje preko 200.000 evra", amount: 14_000, basis: "član 11", extras: [pledgeItems] },
  { id: "zaloga-izmena", label: "Izmena upisane zaloge", amount: 3_000, basis: "član 15", extras: [pledgeItems] },
  { id: "zaloga-brisanje", label: "Brisanje zaloge", amount: 1_500, basis: "član 18" },
  { id: "izvod-drustva", label: "Izvod o privrednom društvu", amount: 2_500, basis: "član 7" },
  { id: "izvod-preduzetnika", label: "Izvod o preduzetniku", amount: 1_500, basis: "član 10" },
];

// counts: extra key → entered count; a missing or lower count means the included minimum.
export function aprFee({ service, counts = {}, late = false }) {
  const s = SERVICES.find((x) => x.id === service);
  if (!s) return null;
  const lines = [{ label: s.label, basis: s.basis, amount: s.amount }];
  for (const e of s.extras ?? []) {
    const extra = Math.max(0, (counts[e.key] ?? e.from) - e.from);
    if (extra) lines.push({ label: `${e.label}: još ${extra}`, amount: extra * e.amount });
  }
  if (late && s.late) lines.push({ label: "Prijava podneta posle roka od 15 dana", basis: "član 3", amount: s.late });
  return { service: s, lines, total: lines.reduce((sum, l) => sum + l.amount, 0) };
}

const EXTRA_KEYS = ["promene", "clanovi", "stvari"];

// Shareable calculation: ?usluga=promena-drustva&promene=2&kasno=1. Unknown or invalid params are ignored.
export function readQuery(search) {
  const q = new URLSearchParams(search);
  const out = { counts: {} };
  if (SERVICES.some((s) => s.id === q.get("usluga"))) out.service = q.get("usluga");
  for (const key of EXTRA_KEYS) {
    const n = positiveInt(q.get(key));
    if (n) out.counts[key] = n;
  }
  if (q.get("kasno") === "1") out.late = true;
  return out;
}

export function toParams({ service, counts = {}, late = false }) {
  const s = SERVICES.find((x) => x.id === service);
  const params = { usluga: service };
  for (const e of s?.extras ?? []) if (counts[e.key] > e.from) params[e.key] = counts[e.key];
  if (late && s?.late) params.kasno = 1;
  return params;
}
