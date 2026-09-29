import { positiveInt } from "./calc.js";

// Zakon o porezima na imovinu: porez na nasleđe i poklon (čl. 14–22) i porez na prenos apsolutnih prava (čl. 23–42).
// Rates are set by the law itself; cities collect the tax but add no rates or exemptions of their own.

export const LAW = "Zakon o porezima na imovinu (Sl. glasnik RS 26/2001 … 94/2024)";
export const VERIFIED_ON = "29. 9. 2026.";

export const SOURCES = [
  { label: "Zakon o porezima na imovinu, prečišćen tekst, Pravno-informacioni sistem RS (zvanični)", url: "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2001/26/1/reg" },
  {
    label: "Zakon o porezima na imovinu, prečišćen tekst, Paragraf Lex",
    url: "https://www.paragraf.rs/propisi/zakon_o_porezima_na_imovinu.html",
  },
  {
    label: "Zakon o nasleđivanju (nasledni redovi), Paragraf Lex",
    url: "https://www.paragraf.rs/propisi/zakon_o_nasledjivanju.html",
  },
];

export const MODES = [
  { id: "prenos", label: "Kupoprodaja" },
  { id: "nasledje", label: "Nasleđe" },
  { id: "poklon", label: "Poklon" },
];

// Rates in percent; first order and spouse are exempt, a parent only as heir (član 21 st. 1 tačka 1).
export const RELATIONS = [
  { id: "potomak", label: "Dete, unuk ili drugi potomak", nasledje: 0, poklon: 0 },
  { id: "supruznik", label: "Bračni drug", nasledje: 0, poklon: 0 },
  { id: "roditelj", label: "Roditelj", nasledje: 0, poklon: 1.5 },
  { id: "drugi-red", label: "Brat, sestra ili njihov potomak", nasledje: 1.5, poklon: 1.5 },
  { id: "treci-red", label: "Deda, baba, stric, ujak, tetka ili njihov potomak", nasledje: 2.5, poklon: 2.5 },
  { id: "ostali", label: "Dalji srodnik ili lice koje nije u srodstvu", nasledje: 2.5, poklon: 2.5 },
];

export function propertyTax({ mode, relation, pdv, value }) {
  if (!MODES.some((m) => m.id === mode) || !Number.isFinite(value) || value <= 0) return null;
  let rate, basis;
  if (mode === "prenos") {
    // A sale that carries PDV (e.g. first transfer of a new build) is outside this tax (član 24a tačka 1).
    [rate, basis] = pdv ? [0, "član 24a tačka 1"] : [2.5, "član 30"];
  } else {
    const r = RELATIONS.find((x) => x.id === relation);
    if (!r) return null;
    rate = r[mode];
    basis = { 0: "član 21 st. 1 tačka 1", 1.5: "član 19 st. 1", 2.5: "član 19 st. 2" }[rate];
  }
  return { rate, basis, total: Math.round((value * rate) / 100) };
}

// Shareable calculation: ?vrsta=poklon&srodstvo=roditelj&vrednost=8000000. Unknown or invalid params are ignored.
export function readQuery(search) {
  const q = new URLSearchParams(search);
  const out = {};
  if (MODES.some((m) => m.id === q.get("vrsta"))) out.mode = q.get("vrsta");
  if (RELATIONS.some((r) => r.id === q.get("srodstvo"))) out.relation = q.get("srodstvo");
  if (q.get("pdv") === "1") out.pdv = true;
  const value = positiveInt(q.get("vrednost"));
  if (value) out.value = value;
  return out;
}

export const toParams = ({ mode, relation, pdv, value }) =>
  mode === "prenos"
    ? { vrsta: mode, ...(pdv && { pdv: 1 }), vrednost: value }
    : { vrsta: mode, srodstvo: relation, vrednost: value };
