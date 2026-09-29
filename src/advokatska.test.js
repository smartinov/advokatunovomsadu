import test from "node:test";
import assert from "node:assert/strict";
import { attorneyFee, readQuery, toParams } from "./advokatska.js";

const civil = (action, value) => attorneyFee({ mode: "parnica", action, value })?.total;
const criminal = (action, penalty) => attorneyFee({ mode: "krivicni", action, penalty })?.total;

test("civil brackets follow Tarifni broj 13 at 50 RSD per point, upper limit inclusive", () => {
  assert.equal(civil("tuzba", 1), 10_000);
  assert.equal(civil("tuzba", 50_000), 10_000);
  assert.equal(civil("tuzba", 50_001), 15_000);
  assert.equal(civil("tuzba", 500_000), 15_000);
  assert.equal(civil("tuzba", 850_000), 15_000);
  assert.equal(civil("tuzba", 850_001), 18_750);
  assert.equal(civil("tuzba", 3_350_000), 27_500);
  assert.equal(civil("tuzba", 6_700_000), 37_500);
  assert.equal(civil("tuzba", 13_350_000), 50_000);
  assert.equal(civil("tuzba", 26_700_000), 62_500);
  assert.equal(civil("tuzba", 33_350_000), 75_000);
  assert.deepEqual(attorneyFee({ mode: "parnica", action: "tuzba", value: 33_350_001 }), { over: true });
});

test("civil action factors", () => {
  assert.equal(civil("odgovor", 500_000), 15_000);
  assert.equal(civil("rociste", 500_000), 15_000);
  assert.equal(civil("rociste-odlozeno", 500_000), 7_500);
  assert.equal(civil("podnesak", 500_000), 7_500);
  assert.equal(civil("pravni-lek", 500_000), 30_000);
  assert.equal(attorneyFee({ mode: "parnica", action: "rociste-odlozeno", value: 1_000_000 }).points, 187.5);
});

test("criminal fees follow Tarifni broj 1 by zaprećena kazna", () => {
  assert.equal(criminal("pretres", "do-3"), 30_000);
  assert.equal(criminal("pretres", "do-5"), 37_500);
  assert.equal(criminal("pretres", "do-10"), 50_000);
  assert.equal(criminal("pretres", "do-15"), 75_000);
  assert.equal(criminal("pretres", "preko-15"), 100_000);
  assert.equal(criminal("pretres", "dozivotni"), 125_000);
  assert.equal(criminal("pretres-odlozen", "do-5"), 18_750);
  assert.equal(criminal("prijava", "do-5"), 37_500);
  assert.equal(criminal("krivicni-podnesak", "do-5"), 18_750);
  assert.equal(criminal("zalba", "do-5"), 75_000);
});

test("rejects invalid input", () => {
  assert.equal(attorneyFee({ mode: "parnica", action: "tuzba", value: 0 }), null);
  assert.equal(attorneyFee({ mode: "parnica", action: "pretres", value: 1 }), null);
  assert.equal(attorneyFee({ mode: "krivicni", action: "pretres", penalty: "x" }), null);
  assert.equal(attorneyFee({ mode: "constructor", action: "tuzba", value: 1 }), null);
});

test("query round-trips and drops invalid params", () => {
  const civilQ = { mode: "parnica", action: "pravni-lek", value: 1_250_000 };
  assert.deepEqual(readQuery(new URLSearchParams(toParams(civilQ)).toString()), civilQ);
  const criminalQ = { mode: "krivicni", action: "zalba", penalty: "do-10" };
  assert.deepEqual(readQuery(new URLSearchParams(toParams(criminalQ)).toString()), criminalQ);
  assert.deepEqual(readQuery("?postupak=constructor&radnja=tuzba&vrednost=-5&kazna=x"), { action: "tuzba" });
  assert.deepEqual(readQuery("?radnja=pretres"), {});
  const partial = readQuery("?postupak=krivicni&radnja=tuzba");
  assert.equal(partial.mode, "krivicni");
  assert.ok(attorneyFee({ ...partial, penalty: "do-3" }));
  assert.deepEqual(readQuery(""), {});
});
