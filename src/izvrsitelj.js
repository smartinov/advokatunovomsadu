import { positiveInt } from "./calc.js";

// Public enforcement officer fees for a money claim under the Javnoizvršiteljska tarifa (93/2019, 15/2023).
// Fixed rows are points; percentage rows add a share of the amount above the previous bound, in dinars.

export const LAW = "Javnoizvršiteljska tarifa (Sl. glasnik RS 93/2019 i 15/2023)";
export const VERIFIED_ON = "29. 9. 2026.";

export const SOURCES = [
  { label: "Javnoizvršiteljska tarifa, prečišćen tekst, Pravno-informacioni sistem RS (zvanični)", url: "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/ministarstva/drugiakt/2019/93/1/reg" },
  {
    label: "Javnoizvršiteljska tarifa, prečišćen tekst, Paragraf Lex",
    url: "https://www.paragraf.rs/propisi/javnoizvrsiteljska_tarifa.html",
  },
  {
    label: "Zakon o porezu na dodatu vrednost, član 23 (opšta stopa 20%), Paragraf Lex",
    url: "https://www.paragraf.rs/propisi/zakon_o_porezu_na_dodatu_vrednost.html",
  },
];

// Član 18.
const POINT = 150;
const VAT_RATE = 0.2;

// [upper bound of the claim, points, share of the amount above the previous bound]
// Tarifni broj 1: pripremanje, vođenje i arhiviranje predmeta, najviše 250.000 dinara.
const PREPARATION = [
  [6_000, 8, 0],
  [12_000, 12, 0],
  [30_000, 20, 0],
  [120_000, 22, 0.02],
  [600_000, 45, 0.01],
  [3_000_000, 95, 0.005],
  [12_000_000, 200, 0.002],
  [Infinity, 395, 0.001],
];
const PREPARATION_MAX = 250_000;

// Tarifni broj 3: naknada za uspešnost, najviše 2.000.000 dinara.
const SUCCESS = [
  [6_000, 8, 0],
  [12_000, 12, 0],
  [30_000, 20, 0],
  [120_000, 22, 0.06],
  [600_000, 80, 0.05],
  [3_000_000, 335, 0.04],
  [12_000_000, 1200, 0.02],
  [Infinity, 3135, 0.01],
];
const SUCCESS_MAX = 2_000_000;

function byBrackets(table, value) {
  const i = table.findIndex(([upTo]) => value <= upTo);
  const [, points, share] = table[i];
  const from = i ? table[i - 1][0] : 0;
  return points * POINT + share * (value - from);
}

// Članovi 14 i 15.
export const COLLECTIONS = [
  { id: "redovno", label: "Izvršitelj sprovede izvršenje", factor: 1, note: "Tarifni broj 3" },
  { id: "racun", label: "Naplata prenosom sa računa dužnika", factor: 0.7, note: "umanjenje 30%, član 14" },
  {
    id: "posle-resenja",
    label: "Dužnik plati po prijemu rešenja na osnovu verodostojne isprave, pre prve radnje izvršitelja",
    factor: 0.4,
    note: "umanjenje 60%, član 14",
  },
  { id: "pre-resenja", label: "Dužnik plati pre nego što primi rešenje o izvršenju", factor: 0, note: "bez nagrade, član 15" },
];

// Članovi 10 i 13: caps in points.
export const SUBJECTS = [
  { id: "ostalo", label: "Račun, pokretne stvari ili nepokretnost dužnika" },
  { id: "zarada", label: "Zarada, penzija ili drugo stalno primanje", successCap: 415 },
  { id: "budzet", label: "Račun izvršenja budžeta ili indirektnog korisnika", preparationCap: 200, successCap: 200 },
];

export const VAT = [
  { id: "ne", label: "Bez PDV-a" },
  { id: "da", label: "Sa PDV-om 20%" },
];

export function enforcementFee({ value, collection, subject, vat }) {
  const c = COLLECTIONS.find((x) => x.id === collection);
  const s = SUBJECTS.find((x) => x.id === subject);
  if (!c || !s || !VAT.some((x) => x.id === vat) || !Number.isFinite(value) || value <= 0) return null;
  const preparation = Math.round(
    Math.min(byBrackets(PREPARATION, value), PREPARATION_MAX, (s.preparationCap ?? Infinity) * POINT),
  );
  // The tariff does not say whether caps apply before or after the član 14 reduction; we cap first.
  const success = Math.round(
    Math.min(byBrackets(SUCCESS, value), SUCCESS_MAX, (s.successCap ?? Infinity) * POINT) * c.factor,
  );
  const tax = vat === "da" ? Math.round((preparation + success) * VAT_RATE) : 0;
  return { preparation, success, tax, total: preparation + success + tax, collection: c, subject: s };
}

// Shareable calculation: ?vrednost=500000&naplata=redovno&predmet=ostalo&pdv=ne. Unknown or invalid params are ignored.
export function readQuery(search) {
  const q = new URLSearchParams(search);
  const out = {};
  const value = positiveInt(q.get("vrednost"));
  if (value) out.value = value;
  if (COLLECTIONS.some((x) => x.id === q.get("naplata"))) out.collection = q.get("naplata");
  if (SUBJECTS.some((x) => x.id === q.get("predmet"))) out.subject = q.get("predmet");
  if (VAT.some((x) => x.id === q.get("pdv"))) out.vat = q.get("pdv");
  return out;
}

export const toParams = ({ value, collection, subject, vat }) => ({
  vrednost: value,
  naplata: collection,
  predmet: subject,
  pdv: vat,
});
