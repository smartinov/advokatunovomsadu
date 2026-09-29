import test from "node:test";
import assert from "node:assert/strict";
import { propertyTax, readQuery, toParams } from "./porez.js";

const tax = (mode, value, extra = {}) => propertyTax({ mode, value, ...extra })?.total;

test("transfer tax is 2,5% of the price, none when the sale carries PDV", () => {
  assert.equal(tax("prenos", 10_000_000), 250_000);
  assert.equal(tax("prenos", 1_234_567), 30_864);
  assert.equal(tax("prenos", 10_000_000, { pdv: true }), 0);
});

test("inheritance and gift rates follow the order of succession", () => {
  const v = 8_000_000;
  assert.equal(tax("nasledje", v, { relation: "potomak" }), 0);
  assert.equal(tax("poklon", v, { relation: "supruznik" }), 0);
  assert.equal(tax("nasledje", v, { relation: "roditelj" }), 0);
  assert.equal(tax("poklon", v, { relation: "roditelj" }), 120_000);
  assert.equal(tax("nasledje", v, { relation: "drugi-red" }), 120_000);
  assert.equal(tax("poklon", v, { relation: "treci-red" }), 200_000);
  assert.equal(tax("nasledje", v, { relation: "ostali" }), 200_000);
});

test("rejects invalid input", () => {
  assert.equal(propertyTax({ mode: "prenos", value: 0 }), null);
  assert.equal(propertyTax({ mode: "x", value: 1 }), null);
  assert.equal(propertyTax({ mode: "poklon", relation: "x", value: 1 }), null);
});

test("query round-trips and drops invalid params", () => {
  const roundTrip = (s) => readQuery(new URLSearchParams(toParams(s)).toString());
  const gift = { mode: "poklon", relation: "roditelj", value: 8_000_000 };
  assert.deepEqual(roundTrip(gift), gift);
  const sale = { mode: "prenos", pdv: true, value: 12_500_000 };
  assert.deepEqual(roundTrip(sale), sale);
  assert.deepEqual(roundTrip({ mode: "prenos", pdv: false, value: 5 }), { mode: "prenos", value: 5 });
  assert.deepEqual(readQuery("?vrsta=x&srodstvo=komsija&pdv=da&vrednost=-1"), {});
});
