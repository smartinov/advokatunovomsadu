// Shared by the calculators: amounts are whole dinars in Serbian formatting.
export const rsd = (n) => new Intl.NumberFormat("sr-RS").format(n);
// "." groups thousands and "," starts decimals, which whole-dinar amounts ignore.
export const parseRsd = (s) => Number(String(s).split(",")[0].replace(/\D/g, "")) || 0;

// Query values from shared links are untrusted: accept only positive whole numbers.
export function positiveInt(s) {
  const n = Number(s);
  return Number.isSafeInteger(n) && n > 0 ? n : undefined;
}
