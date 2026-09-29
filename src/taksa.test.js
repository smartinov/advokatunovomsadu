import test from "node:test";
import assert from "node:assert/strict";
import { courtFee } from "./taksa.js";

const fee = (court, action, value) => courtFee({ court, action, value })?.total;

test("general court brackets follow Tarifni broj 1 st. 1", () => {
  assert.equal(fee("opsti", "tuzba", 10_000), 2_800);
  assert.equal(fee("opsti", "tuzba", 50_000), 4_800);
  assert.equal(fee("opsti", "tuzba", 500_000), 21_000);
  assert.equal(fee("opsti", "tuzba", 800_000), 40_000);
  assert.equal(fee("opsti", "tuzba", 2_000_000), 63_000);
  assert.equal(fee("opsti", "tuzba", 50_000_000), 105_000);
});

test("commercial court brackets follow Tarifni broj 1 st. 2", () => {
  assert.equal(fee("privredni", "tuzba", 5_000), 5_000);
  assert.equal(fee("privredni", "tuzba", 100_000), 11_000);
  assert.equal(fee("privredni", "tuzba", 5_000_000), 110_000);
  assert.equal(fee("privredni", "tuzba", 100_000_000), 420_000);
});

test("action factors", () => {
  assert.equal(fee("opsti", "presuda", 500_000), 21_000);
  assert.equal(fee("opsti", "presuda-polovina", 500_000), 10_500);
  assert.equal(fee("opsti", "revizija", 500_000), 42_000);
  assert.equal(fee("opsti", "izvrsenje-izvrsitelj", 500_000), 7_000);
});

test("rejects invalid input", () => {
  assert.equal(courtFee({ court: "opsti", action: "tuzba", value: 0 }), null);
  assert.equal(courtFee({ court: "x", action: "tuzba", value: 1 }), null);
});
