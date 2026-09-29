import { positiveInt } from "./calc.js";

// Cadastre fees are republičke administrativne takse, Tarifni broj 215b, at the amounts indexed in Sl. glasnik RS 54/2026.
// Amounts are indexed yearly, so recheck them after each published adjustment.

export const LAW = "Zakon o republičkim administrativnim taksama (usklađeni iznosi, Sl. glasnik RS 54/2026)";
export const VERIFIED_ON = "29. 9. 2026.";

export const SOURCES = [
  { label: "Zakon o republičkim administrativnim taksama, prečišćen tekst, Pravno-informacioni sistem RS (zvanični)", url: "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2003/43/2/reg" },
  {
    label: "Zakon o republičkim administrativnim taksama, prečišćen tekst, Paragraf Lex",
    url: "https://www.paragraf.rs/propisi_download/zakon_o_republickim_administrativnim_taksama.pdf",
  },
  {
    label: "Zakon o izmenama i dopunama Zakona o republičkim administrativnim taksama (109/2025), Paragraf Lex",
    url: "https://www.paragraf.rs/izmene_i_dopune/041225-zakon-o-izmenama-i-dopunama-zakona-o-republickim-administrativnim-taksama.html",
  },
];

// Tarifni broj 1: the request fee, shown separately because RGZ practice charges it on top of TB 215b.
export const REQUEST_FEE = { label: "Taksa za zahtev", basis: "tarifni broj 1", amount: 430 };

// TB 215b st. 5 t. 16: tier by the secured claim; upper bounds are inclusive ("do", then "preko … do").
const MORTGAGE_TIERS = [
  { upTo: 6_000_000, amount: 29_390 },
  { upTo: 30_000_000, amount: 73_490 },
  { upTo: 60_000_000, amount: 146_930 },
  { upTo: Infinity, amount: 220_390 },
];

const perDocument = (amount) => ({ key: "isprave", label: "Broj isprava", amount, from: 1 });

export const SERVICES = [
  {
    id: "svojina",
    label: "Upis prava svojine (promena vlasnika)",
    amount: 7_010,
    basis: "TB 215b st. 5 t. 12",
    extras: [{ key: "isprave", label: "Broj isprava u nizu od upisanog vlasnika", amount: 2_100, from: 1 }],
  },
  { id: "susvojina", label: "Upis susvojine supružnika ili prava osobe sa invaliditetom", amount: 420, basis: "TB 215b st. 5 t. 13" },
  { id: "hipoteka", label: "Upis hipoteke", tiers: MORTGAGE_TIERS, basis: "TB 215b st. 5 t. 16" },
  { id: "brisanje-hipoteke", label: "Brisanje hipoteke", amount: 4_830, basis: "TB 215b st. 5 t. 20", extras: [perDocument(4_830)] },
  { id: "zabelezba", label: "Upis zabeležbe koja se odnosi na nepokretnost", amount: 4_830, basis: "TB 215b st. 5 t. 19", extras: [perDocument(4_830)] },
  { id: "zabelezba-licnost", label: "Upis zabeležbe koja se odnosi na ličnost", amount: 1_010, basis: "TB 215b st. 5 t. 19", extras: [perDocument(1_010)] },
  { id: "zabelezba-izdrzavanje", label: "Upis zabeležbe ugovora o doživotnom izdržavanju", amount: 4_210, basis: "TB 215b st. 5 t. 19", extras: [perDocument(4_210)] },
  { id: "brisanje-zabelezbe", label: "Brisanje zabeležbe", amount: 1_200, basis: "TB 215b st. 5 t. 20", extras: [perDocument(1_200)] },
  { id: "objekat", label: "Upis objekta izgrađenog sa upisom vlasnika", amount: 7_710, basis: "TB 215b st. 5 t. 3" },
  {
    id: "poseban-deo",
    label: "Upis posebnog dela objekta (stan, lokal)",
    amount: 6_290,
    basis: "TB 215b st. 5 t. 5",
    extras: [{ key: "delovi", label: "Broj posebnih delova u istom postupku", amount: 2_100, from: 1 }],
  },
  {
    id: "list",
    label: "List nepokretnosti (izvod iz baze katastra)",
    amount: 710,
    basis: "TB 215b st. 3 t. 1",
    extras: [{ key: "nepokretnosti", label: "Broj nepokretnosti", amount: 710, from: 1 }],
  },
  {
    id: "kopija-plana",
    label: "Kopija plana (izvod iz digitalnog plana nepokretnosti)",
    amount: 1_010,
    basis: "TB 215b st. 3 t. 2",
    extras: [{ key: "parcele", label: "Broj katastarskih parcela", amount: 430, from: 1 }],
  },
  { id: "uverenje", label: "Uverenje o podacima poslednjeg stanja", amount: 1_310, basis: "TB 215b st. 3 t. 3" },
  { id: "uverenje-promene", label: "Uverenje o promenama, do pet promena", amount: 5_900, basis: "TB 215b st. 3 t. 4" },
  { id: "uverenje-promene-vise", label: "Uverenje o promenama, više od pet promena", amount: 9_450, basis: "TB 215b st. 3 t. 4" },
];

// counts: extra key → entered count; value: secured claim in dinars, used only for the mortgage.
export function cadastreFee({ service, counts = {}, value }) {
  const s = SERVICES.find((x) => x.id === service);
  if (!s) return null;
  let amount = s.amount;
  if (s.tiers) {
    if (!(value > 0)) return null;
    amount = s.tiers.find((t) => value <= t.upTo).amount;
  }
  const lines = [REQUEST_FEE, { label: s.label, basis: s.basis, amount }];
  for (const e of s.extras ?? []) {
    const extra = Math.max(0, (counts[e.key] ?? e.from) - e.from);
    if (extra) lines.push({ label: `${e.label}: još ${extra}`, amount: extra * e.amount });
  }
  return { service: s, lines, total: lines.reduce((sum, l) => sum + l.amount, 0) };
}

const EXTRA_KEYS = ["isprave", "delovi", "nepokretnosti", "parcele"];

// Shareable calculation: ?usluga=hipoteka&vrednost=5000000. Unknown or invalid params are ignored.
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
