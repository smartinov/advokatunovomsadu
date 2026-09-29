import { positiveInt } from "./calc.js";

// Attorney fees under the AKS Tarifa o nagradama i naknadama troškova za rad advokata (Sl. glasnik RS 43/2023, 56/2025).
// The tariff states both fees and dispute-value limits in poeni, so a new point value rescales both.

export const LAW = "Tarifa o nagradama i naknadama troškova za rad advokata (Sl. glasnik RS 43/2023 i 56/2025)";
export const VERIFIED_ON = "29. 9. 2026.";
export const POINT_VALUE = 50; // Član 15.

export const SOURCES = [
  {
    label: "Tarifa o nagradama i naknadama troškova za rad advokata, prečišćen tekst, Paragraf Lex",
    url: "https://www.paragraf.rs/propisi/tarifa_o_nagradama_i_naknadama_troskova_za_rad_advokata.html",
  },
  {
    label: "Tabelarni prikaz tarife, Advokatska komora Srbije",
    url: "https://aks.org.rs/sr_lat/tabelarni-prikaz-tarife-o-nagradama-i-naknadama-troskova-za-rad-advokata/",
  },
];

// Tarifni broj 13: [vrednost spora do (poena), nagrada (poena)], upper limit inclusive.
const CIVIL_BRACKETS = [
  [1_000, 200],
  [17_000, 300],
  [33_500, 375],
  [67_000, 550],
  [134_000, 750],
  [267_000, 1_000],
  [534_000, 1_250],
  [667_000, 1_500],
];
// ponytail: above 667.000 poena the tariff adds stepped increments with an ambiguous start; the page asks users to call instead.
export const CIVIL_MAX_VALUE = 667_000 * POINT_VALUE;

// Tarifni broj 1, by zaprećena kazna.
export const PENALTIES = [
  { id: "do-3", label: "Novčana kazna ili zatvor do 3 godine", points: 600 },
  { id: "do-5", label: "Zatvor preko 3 do 5 godina", points: 750 },
  { id: "do-10", label: "Zatvor preko 5 do 10 godina", points: 1_000 },
  { id: "do-15", label: "Zatvor preko 10 do 15 godina", points: 1_500 },
  { id: "preko-15", label: "Zatvor preko 15 godina", points: 2_000 },
  { id: "dozivotni", label: "Zatvor od 30 do 40 godina ili doživotni zatvor", points: 2_500 },
];

export const MODES = [
  { id: "parnica", label: "Parnični postupak" },
  { id: "krivicni", label: "Krivični postupak" },
];

export const ACTIONS = {
  parnica: [
    { id: "tuzba", label: "Tužba ili protivtužba", factor: 1, share: "puna nagrada", basis: "Tarifni broj 13" },
    { id: "odgovor", label: "Odgovor na tužbu ili drugi obrazloženi podnesak", factor: 1, share: "puna nagrada", basis: "Tarifni broj 13" },
    { id: "rociste", label: "Zastupanje na održanom ročištu", factor: 1, share: "puna nagrada", basis: "Tarifni broj 15" },
    { id: "rociste-odlozeno", label: "Ročište koje nije održano", factor: 1 / 2, share: "polovina nagrade", basis: "Tarifni broj 15" },
    { id: "podnesak", label: "Ostali podnesci", factor: 1 / 2, share: "polovina nagrade", basis: "Tarifni broj 13" },
    { id: "pravni-lek", label: "Žalba, revizija ili odgovor na njih", factor: 2, share: "nagrada uvećana za 100%", basis: "Tarifni broj 16" },
  ],
  krivicni: [
    { id: "pretres", label: "Odbrana na održanom glavnom pretresu", factor: 1, share: "puna nagrada", basis: "Tarifni broj 3" },
    { id: "pretres-odlozen", label: "Glavni pretres koji nije održan", factor: 1 / 2, share: "polovina nagrade", basis: "Tarifni broj 3" },
    { id: "prijava", label: "Krivična prijava, privatna tužba ili pismena odbrana", factor: 1, share: "puna nagrada", basis: "Tarifni broj 4" },
    { id: "krivicni-podnesak", label: "Ostali podnesci", factor: 1 / 2, share: "polovina nagrade", basis: "Tarifni broj 4" },
    { id: "zalba", label: "Žalba protiv presude", factor: 2, share: "nagrada uvećana za 100%", basis: "Tarifni broj 5" },
  ],
};

// Returns null for invalid input and { over: true } for disputes above the modelled table.
export function attorneyFee({ mode, action, value, penalty }) {
  const a = MODES.some((m) => m.id === mode) && ACTIONS[mode].find((x) => x.id === action);
  if (!a) return null;
  let base;
  if (mode === "parnica") {
    if (!Number.isFinite(value) || value <= 0) return null;
    const row = CIVIL_BRACKETS.find(([upTo]) => value <= upTo * POINT_VALUE);
    if (!row) return { over: true };
    base = row[1];
  } else {
    base = PENALTIES.find((p) => p.id === penalty)?.points;
    if (!base) return null;
  }
  const points = base * a.factor;
  return { base, points, total: points * POINT_VALUE, action: a };
}

// Shareable calculation: ?postupak=parnica&radnja=tuzba&vrednost=500000 or ?postupak=krivicni&radnja=pretres&kazna=do-5.
export function readQuery(search) {
  const q = new URLSearchParams(search);
  const out = {};
  if (MODES.some((m) => m.id === q.get("postupak"))) out.mode = q.get("postupak");
  if (ACTIONS[out.mode ?? "parnica"].some((a) => a.id === q.get("radnja"))) out.action = q.get("radnja");
  const value = positiveInt(q.get("vrednost"));
  if (value) out.value = value;
  if (PENALTIES.some((p) => p.id === q.get("kazna"))) out.penalty = q.get("kazna");
  return out;
}

export const toParams = ({ mode, action, value, penalty }) =>
  mode === "parnica"
    ? { postupak: mode, radnja: action, vrednost: value }
    : { postupak: mode, radnja: action, kazna: penalty };
