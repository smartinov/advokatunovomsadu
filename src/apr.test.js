import test from "node:test";
import assert from "node:assert/strict";
import { SERVICES, aprFee, readQuery, toParams } from "./apr.js";

const total = (service, counts, late) => aprFee({ service, counts, late })?.total;

test("flat fees follow the APR decision 95/2025", () => {
  const expected = {
    "osnivanje-drustva": 8_000,
    "osnivanje-udruzenja": 8_000,
    "osnivanje-preduzetnika": 2_500,
    "promena-drustva": 4_000,
    "promena-preduzetnika": 1_400,
    "brisanje-drustva": 4_000,
    "brisanje-preduzetnika": 1_400,
    "naziv-drustva": 2_000,
    "naziv-preduzetnika": 1_400,
    "zaloga-10": 3_000,
    "zaloga-200": 7_000,
    "zaloga-vise": 14_000,
    "zaloga-izmena": 3_000,
    "zaloga-brisanje": 1_500,
    "izvod-drustva": 2_500,
    "izvod-preduzetnika": 1_500,
  };
  assert.deepEqual(Object.keys(expected).sort(), SERVICES.map((s) => s.id).sort());
  for (const [id, amount] of Object.entries(expected)) assert.equal(total(id), amount, id);
});

test("extra changes, members, pledge items and late filing", () => {
  assert.equal(total("promena-drustva", { promene: 3 }), 10_000);
  assert.equal(total("promena-drustva", { clanovi: 2 }), 5_000);
  assert.equal(total("promena-drustva", { promene: 2, clanovi: 1 }, true), 4_000 + 3_000 + 500 + 6_260);
  assert.equal(total("promena-preduzetnika", { promene: 3 }), 2_800);
  assert.equal(total("zaloga-200", { stvari: 4 }), 7_900);
  assert.equal(total("zaloga-izmena", { stvari: 2 }), 3_300);
  // Counts at or below the included minimum and late filing on services without it change nothing.
  assert.equal(total("promena-preduzetnika", { promene: 1 }, true), 1_400);
  assert.equal(total("osnivanje-drustva", { promene: 5 }), 8_000);
});

test("rejects an unknown service", () => {
  assert.equal(aprFee({ service: "x" }), null);
});

test("query round-trips and drops invalid params", () => {
  const q = { service: "promena-drustva", counts: { promene: 2, clanovi: 3 }, late: true };
  assert.deepEqual(readQuery(new URLSearchParams(toParams(q)).toString()), q);
  assert.deepEqual(toParams({ service: "osnivanje-drustva", counts: { promene: 4 }, late: true }), { usluga: "osnivanje-drustva" });
  assert.deepEqual(readQuery("?usluga=x&promene=-1&stvari=1.5&kasno=da"), { counts: {} });
});
