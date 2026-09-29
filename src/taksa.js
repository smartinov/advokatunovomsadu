// Court fees under the Zakon o sudskim taksama tariff, as amended by Sl. glasnik RS 91/2025.
// Percentages apply to the whole dispute value, as the tariff text reads ("od vrednosti predmeta spora").

export const LAW = "Zakon o sudskim taksama (Sl. glasnik RS 28/94 … 91/2025)";
export const VERIFIED_ON = "29. 9. 2026.";

const round = (n) => Math.round(n);

// Tarifni broj 1 st. 1 (sud opšte nadležnosti).
function generalCourt(value) {
  if (value <= 10_000) return 2_800;
  if (value <= 100_000) return 2_800 + 0.04 * value;
  if (value <= 500_000) return 11_000 + 0.02 * value;
  if (value <= 1_000_000) return 32_000 + 0.01 * value;
  return Math.min(53_000 + 0.005 * value, 105_000);
}

// Tarifni broj 1 st. 2 (privredni sud).
function commercialCourt(value) {
  if (value <= 10_000) return 5_000;
  if (value <= 100_000) return 5_000 + 0.06 * value;
  if (value <= 1_000_000) return 17_000 + 0.02 * value;
  if (value <= 10_000_000) return 60_000 + 0.01 * value;
  return Math.min(275_000 + 0.005 * value, 420_000);
}

export const COURTS = [
  { id: "opsti", label: "Sud opšte nadležnosti", basis: "Tarifni broj 1 st. 1" },
  { id: "privredni", label: "Privredni sud", basis: "Tarifni broj 1 st. 2" },
];

export const ACTIONS = [
  { id: "tuzba", label: "Tužba ili protivtužba", factor: 1, basis: "Tarifni broj 1" },
  { id: "platni-nalog", label: "Tužba sa predlogom za platni nalog", factor: 1 / 2, basis: "Tarifni broj 1, napomena 2" },
  { id: "odgovor", label: "Odgovor na tužbu", factor: 1 / 2, basis: "Tarifni broj 1 st. 3" },
  { id: "presuda", label: "Prvostepena presuda", factor: 1, basis: "Tarifni broj 2 st. 1" },
  { id: "presuda-polovina", label: "Presuda zbog propuštanja, na osnovu priznanja ili odricanja", factor: 1 / 2, basis: "Tarifni broj 2 st. 2" },
  { id: "poravnanje", label: "Sudsko poravnanje", factor: 1 / 2, basis: "Tarifni broj 3 st. 1" },
  { id: "zalba", label: "Žalba protiv presude ili rešenja", factor: 1, basis: "Tarifni broj 1 st. 4" },
  { id: "revizija", label: "Revizija ili predlog za ponavljanje postupka", factor: 2, basis: "Tarifni broj 1 st. 5" },
  { id: "izvrsenje", label: "Predlog za izvršenje ili obezbeđenje", factor: 1 / 2, basis: "Tarifni broj 1 st. 3" },
  { id: "izvrsenje-izvrsitelj", label: "Predlog za izvršenje (sprovodi javni izvršitelj)", factor: 1 / 3, basis: "Tarifni broj 1 st. 3" },
];

export function courtFee({ court, action, value }) {
  const c = COURTS.find((x) => x.id === court);
  const a = ACTIONS.find((x) => x.id === action);
  if (!c || !a || !Number.isFinite(value) || value <= 0) return null;
  const base = round(court === "privredni" ? commercialCourt(value) : generalCourt(value));
  return { base, total: round(base * a.factor), factor: a.factor, court: c, action: a };
}
