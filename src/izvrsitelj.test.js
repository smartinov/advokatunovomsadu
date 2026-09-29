import test from "node:test";
import assert from "node:assert/strict";
import { enforcementFee, readQuery, toParams } from "./izvrsitelj.js";

const fee = (value, collection = "redovno", subject = "ostalo", vat = "ne") =>
  enforcementFee({ value, collection, subject, vat });
const preparation = (v) => fee(v).preparation;
const success = (v) => fee(v).success;

test("Tarifni broj 1 brackets, boundaries and cap", () => {
  assert.equal(preparation(6_000), 1_200);
  assert.equal(preparation(6_001), 1_800);
  assert.equal(preparation(12_001), 3_000);
  assert.equal(preparation(30_000), 3_000);
  assert.equal(preparation(120_000), 5_100);
  assert.equal(preparation(120_001), 6_750);
  assert.equal(preparation(500_000), 10_550);
  assert.equal(preparation(600_000), 11_550);
  assert.equal(preparation(3_000_000), 26_250);
  assert.equal(preparation(12_000_000), 48_000);
  assert.equal(preparation(100_000_000), 147_250);
  assert.equal(preparation(300_000_000), 250_000);
});

test("Tarifni broj 3 brackets, boundaries and cap", () => {
  assert.equal(success(6_000), 1_200);
  assert.equal(success(12_000), 1_800);
  assert.equal(success(30_000), 3_000);
  assert.equal(success(100_000), 7_500);
  assert.equal(success(120_000), 8_700);
  assert.equal(success(500_000), 31_000);
  assert.equal(success(600_000), 36_000);
  assert.equal(success(3_000_000), 146_250);
  assert.equal(success(12_000_000), 360_000);
  assert.equal(success(200_000_000), 2_000_000);
});

test("collection reductions and subject caps", () => {
  assert.equal(fee(500_000, "racun").success, 21_700);
  assert.equal(fee(500_000, "posle-resenja").success, 12_400);
  assert.equal(fee(500_000, "pre-resenja").success, 0);
  assert.equal(fee(500_000, "redovno", "zarada").success, 31_000);
  assert.equal(fee(3_000_000, "redovno", "zarada").success, 62_250);
  assert.equal(fee(3_000_000, "racun", "zarada").success, 43_575);
  assert.equal(fee(12_000_000, "redovno", "budzet").preparation, 30_000);
  assert.equal(fee(12_000_000, "redovno", "budzet").success, 30_000);
});

test("PDV and total", () => {
  const r = fee(500_000, "redovno", "ostalo", "da");
  assert.equal(r.tax, 8_310);
  assert.equal(r.total, 49_860);
  assert.equal(fee(500_000).total, 41_550);
});

test("query round-trips and drops invalid params", () => {
  const q = { value: 750_000, collection: "racun", subject: "zarada", vat: "da" };
  assert.deepEqual(readQuery(new URLSearchParams(toParams(q)).toString()), q);
  assert.deepEqual(readQuery("?vrednost=-1&naplata=x&predmet=zarada&pdv=mozda"), { subject: "zarada" });
  assert.equal(enforcementFee({ value: 0, collection: "redovno", subject: "ostalo", vat: "ne" }), null);
});
