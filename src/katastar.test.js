import test from "node:test";
import assert from "node:assert/strict";
import { SERVICES, cadastreFee, readQuery, toParams } from "./katastar.js";

const total = (service, counts, value) => cadastreFee({ service, counts, value })?.total;

test("each service adds the 430 dinar request fee to its TB 215b amount", () => {
  const expected = {
    svojina: 7_010,
    susvojina: 420,
    "brisanje-hipoteke": 4_830,
    zabelezba: 4_830,
    "zabelezba-licnost": 1_010,
    "zabelezba-izdrzavanje": 4_210,
    "brisanje-zabelezbe": 1_200,
    objekat: 7_710,
    "poseban-deo": 6_290,
    list: 710,
    "kopija-plana": 1_010,
    uverenje: 1_310,
    "uverenje-promene": 5_900,
    "uverenje-promene-vise": 9_450,
  };
  assert.deepEqual(Object.keys(expected).concat("hipoteka").sort(), SERVICES.map((s) => s.id).sort());
  for (const [id, amount] of Object.entries(expected)) assert.equal(total(id), 430 + amount, id);
});

test("mortgage tiers by secured claim, upper bounds inclusive", () => {
  assert.equal(total("hipoteka", {}, 1), 430 + 29_390);
  assert.equal(total("hipoteka", {}, 6_000_000), 430 + 29_390);
  assert.equal(total("hipoteka", {}, 6_000_001), 430 + 73_490);
  assert.equal(total("hipoteka", {}, 30_000_000), 430 + 73_490);
  assert.equal(total("hipoteka", {}, 30_000_001), 430 + 146_930);
  assert.equal(total("hipoteka", {}, 60_000_000), 430 + 146_930);
  assert.equal(total("hipoteka", {}, 60_000_001), 430 + 220_390);
  assert.equal(cadastreFee({ service: "hipoteka" }), null);
});

test("per-item increments", () => {
  assert.equal(total("svojina", { isprave: 3 }), 430 + 7_010 + 2 * 2_100);
  assert.equal(total("brisanje-hipoteke", { isprave: 2 }), 430 + 2 * 4_830);
  assert.equal(total("poseban-deo", { delovi: 4 }), 430 + 6_290 + 3 * 2_100);
  assert.equal(total("list", { nepokretnosti: 3 }), 430 + 3 * 710);
  assert.equal(total("kopija-plana", { parcele: 3 }), 430 + 1_010 + 2 * 430);
});

test("rejects an unknown service", () => {
  assert.equal(cadastreFee({ service: "x" }), null);
});

test("query round-trips and drops invalid params", () => {
  const q = { service: "hipoteka", counts: {}, value: 12_000_000 };
  assert.deepEqual(readQuery(new URLSearchParams(toParams(q)).toString()), q);
  const s = { service: "svojina", counts: { isprave: 2 } };
  assert.deepEqual(readQuery(new URLSearchParams(toParams(s)).toString()), s);
  assert.deepEqual(toParams({ service: "list", counts: { isprave: 3 }, value: 5 }), { usluga: "list" });
  assert.deepEqual(readQuery("?usluga=x&isprave=0&vrednost=abc"), { counts: {} });
});
