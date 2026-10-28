import test from "node:test";
import assert from "node:assert/strict";
import { SERVICES, deedPoints, notaryFee, readQuery, toParams } from "./beleznik.js";

const total = (service, value, counts) => notaryFee({ service, value, counts })?.total;

test("Tarifni broj 1 brackets, the shared 10.000.000 bound and the cap", () => {
  const cases = [
    [1, 60],
    [600_000, 60],
    [600_001, 100],
    [2_500_000, 100],
    [2_500_001, 140],
    [5_000_000, 140],
    [5_000_001, 200],
    [7_000_000, 200],
    [7_000_001, 240],
    [10_000_000, 240],
    [10_000_001, 280],
    [14_000_000, 280],
    [14_000_001, 290],
    [15_000_000, 290],
    [15_000_001, 300],
    [385_000_000, 3_990],
    [385_000_001, 4_000],
    [1_000_000_000, 4_000],
  ];
  for (const [value, points] of cases) assert.equal(deedPoints(value), points, String(value));
});

test("value-based services: 60% for solemnization, 8 points of costs, PDV on top", () => {
  assert.equal(total("solemnizacija", 600_000), 9_504);
  assert.equal(total("solemnizacija", 600_001), 14_688);
  assert.equal(total("solemnizacija", 10_000_000), 32_832);
  assert.equal(total("solemnizacija", 11_700_000), 38_016);
  assert.equal(total("solemnizacija", 14_000_001), 39_312);
  assert.equal(total("zapis", 14_000_000), 62_208);
  assert.equal(total("zapis", 385_000_001), 865_728);
  assert.equal(total("solemnizacija"), undefined);
});

test("fixed services", () => {
  assert.equal(total("potpis"), 648);
  assert.equal(total("potpis", undefined, { primerci: 3 }), 1_080);
  assert.equal(total("potpis-zastupnik"), 2_160);
  assert.equal(total("potpis-zastupnik", undefined, { primerci: 2 }), 2_160);
  assert.equal(total("prepis", undefined, { stranice: 5 }), 1_512);
  assert.equal(total("punomocje"), 5_184);
  assert.equal(total("punomocje-zapis"), 7_344);
  assert.equal(total("testament"), 21_600);
});

test("breakdown lines add up to the total", () => {
  for (const s of SERVICES) {
    const r = notaryFee({ service: s.id, value: 3_000_000, counts: { primerci: 2, stranice: 4 } });
    assert.equal(r.lines.reduce((sum, l) => sum + l.amount, 0), r.total, s.id);
  }
});

test("query round-trips and drops invalid params", () => {
  const q = { service: "prepis", counts: { stranice: 5 } };
  assert.deepEqual(readQuery(new URLSearchParams(toParams(q)).toString()), q);
  const v = { service: "solemnizacija", counts: {}, value: 10_000_000 };
  assert.deepEqual(readQuery(new URLSearchParams(toParams(v)).toString()), v);
  assert.deepEqual(readQuery("?usluga=x&vrednost=-5&primerci=1.5"), { counts: {} });
});
