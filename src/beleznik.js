import { positiveInt } from "./calc.js";

// Notary fees under the Javnobeležnička tarifa as amended by Sl. glasnik RS 59/2025: points times član 10, plus PDV.
// The estate tariff (ostavina) has its own brackets and deducts debts from the base, so it is not mixed in here.

export const LAW = "Javnobeležnička tarifa (Sl. glasnik RS 91/2014 … 36/2021 i 59/2025)";
export const VERIFIED_ON = "2026-10-28";

export const SOURCES = [
  {
    label: "Javnobeležnička tarifa, prečišćen tekst, Javnobeležnička komora Srbije",
    url: "https://beleznik.org/tarife",
  },
  {
    label: "Javnobeležnička tarifa, prečišćen tekst, Pravno-informacioni sistem RS (zvanični)",
    url: "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/ministarstva/ostalo/2014/91/1/reg",
  },
  { label: "Javnobeležnička tarifa, prečišćen tekst, Paragraf Lex", url: "https://www.paragraf.rs/propisi/javnobeleznicka_tarifa.html" },
];

export const POINT = 180; // Član 10, bez PDV-a.
const VAT_RATE = 0.2;

// Tarifni broj 1: [vrednost do, bodovi], upper bound inclusive. The tariff prints 10.000.000 in two rows;
// we take the lower one, as član 3 calls for the reading most favorable to the client.
const BRACKETS = [
  [600_000, 60],
  [2_500_000, 100],
  [5_000_000, 140],
  [7_000_000, 200],
  [10_000_000, 240],
  [14_000_000, 280],
];

export function deedPoints(value) {
  const row = BRACKETS.find(([upTo]) => value <= upTo);
  return row ? row[1] : Math.min(280 + 10 * Math.ceil((value - 14_000_000) / 1_000_000), 4_000);
}

const copies = { key: "primerci", label: "Broj primeraka", from: 1 };

// points(value, count) is the nagrada; costs are the material costs in points (član 14, TB 8 and TB 10).
export const SERVICES = [
  {
    id: "solemnizacija",
    label: "Solemnizacija ugovora (kupoprodaja stana ili kuće)",
    basis: "TB 1 i TB 9",
    tiers: BRACKETS,
    points: (value) => (deedPoints(value) * 60) / 100,
    costs: 8,
  },
  {
    id: "zapis",
    label: "Ugovor sastavljen kao javnobeležnički zapis",
    basis: "TB 1",
    tiers: BRACKETS,
    points: (value) => deedPoints(value),
    costs: 8,
  },
  {
    id: "potpis",
    label: "Overa potpisa fizičkog lica",
    basis: "TB 8 st. 1",
    points: (_, n) => n,
    costs: 2,
    costsBasis: "TB 8 st. 2",
    extras: [copies],
  },
  {
    id: "potpis-zastupnik",
    // TB 8 st. 3 adds 2 points "po svakom takvom potpisu" without saying whether each copy counts, so one copy only.
    label: "Overa potpisa zastupnika pravnog lica ili preduzetnika, jedan primerak",
    basis: "TB 8 st. 1 i 3",
    points: () => 3,
    costs: 7,
    costsBasis: "TB 8 st. 4",
  },
  {
    id: "prepis",
    label: "Overa prepisa ili fotokopije jedne isprave",
    basis: "TB 10",
    points: (_, n) => n,
    costs: 2,
    costsBasis: "TB 10 st. 2",
    extras: [{ key: "stranice", label: "Broj stranica", from: 1 }],
  },
  {
    id: "punomocje",
    label: "Solemnizacija punomoćja, saglasnosti supružnika ili intabulacione dozvole",
    basis: "TB 4 st. 2",
    points: () => 20,
    costs: 4,
  },
  {
    id: "punomocje-zapis",
    label: "Punomoćje, saglasnost supružnika ili intabulaciona dozvola kao javnobeležnički zapis",
    basis: "TB 4 st. 1",
    points: () => 30,
    costs: 4,
  },
  // Član 14 does not say whether a will counts as a legal transaction (8) or another statement (4), so no costs.
  { id: "testament", label: "Sastavljanje testamenta", basis: "TB 3", points: () => 100, costs: 0 },
];

// counts: extra key → entered count; value: the transaction value in dinars, used only by TB 1 services.
export function notaryFee({ service, counts = {}, value }) {
  const s = SERVICES.find((x) => x.id === service);
  if (!s) return null;
  if (s.tiers && !(value > 0)) return null;
  const n = s.extras ? Math.max(counts[s.extras[0].key] ?? 1, 1) : 1;
  const reward = s.points(value, n) * POINT;
  const costs = s.costs * POINT;
  const tax = Math.round((reward + costs) * VAT_RATE);
  const lines = [{ label: "Nagrada javnog beležnika", basis: s.basis, amount: reward }];
  if (costs) lines.push({ label: "Materijalni troškovi", basis: s.costsBasis ?? "član 14", amount: costs });
  lines.push({ label: "PDV 20%", amount: tax });
  return { service: s, lines, total: reward + costs + tax };
}

const EXTRA_KEYS = ["primerci", "stranice"];

// Shareable calculation: ?usluga=solemnizacija&vrednost=10000000. Unknown or invalid params are ignored.
export function readQuery(search) {
  const q = new URLSearchParams(search);
  const out = { counts: {} };
  if (SERVICES.some((s) => s.id === q.get("usluga"))) out.service = q.get("usluga");
  for (const key of EXTRA_KEYS) {
    const n = positiveInt(q.get(key));
    if (n) out.counts[key] = n;
  }
  const value = positiveInt(q.get("vrednost"));
  if (value) out.value = value;
  return out;
}

export function toParams({ service, counts = {}, value }) {
  const s = SERVICES.find((x) => x.id === service);
  const params = { usluga: service };
  for (const e of s?.extras ?? []) if (counts[e.key] > e.from) params[e.key] = counts[e.key];
  if (s?.tiers && value > 0) params.vrednost = value;
  return params;
}
