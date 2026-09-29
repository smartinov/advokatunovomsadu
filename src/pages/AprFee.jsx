import { useState } from "react";
import { LAW, SERVICES, SOURCES, VERIFIED_ON, aprFee, readQuery, toParams } from "../apr";
import { rsd, parseRsd } from "../calc";
import { ShareLink, Sources, replaceQuery, useQueryOnLoad } from "../components/CalcParts";

// Shared by the APR and cadastre pages: both pick one service from a fixed fee list and add per-item extras.
export function FeeCalculator({ label, title, lede, resultLabel, services, fee, readQuery, toParams, valueLabel, notes, sources }) {
  const [service, setService] = useState(services[0].id);
  const [counts, setCounts] = useState({});
  const [late, setLate] = useState(false);
  const [input, setInput] = useState("");
  const value = parseRsd(input);
  const s = services.find((x) => x.id === service);
  const state = { service, counts, late, value };
  const r = fee(state);

  useQueryOnLoad((params) => {
    const q = readQuery(params);
    if (q.service) setService(q.service);
    setCounts(q.counts);
    if (q.late) setLate(true);
    if (q.value) setInput(rsd(q.value));
  });

  const share = (next) => replaceQuery(toParams({ ...state, ...next }));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">{label}</p>
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
        </div>
      </section>

      <div className="container">
        <div className="calc-wrap">
          <form className="calc-card" onSubmit={(e) => e.preventDefault()} aria-describedby="calc-source">
            <fieldset>
              <legend>Usluga</legend>
              <div className="choice-list">
                {services.map((x) => (
                  <label key={x.id}>
                    <input
                      type="radio"
                      name="service"
                      value={x.id}
                      checked={service === x.id}
                      onChange={() => {
                        setService(x.id);
                        setCounts({});
                        share({ service: x.id, counts: {} });
                      }}
                    />
                    {x.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {s.tiers && (
              <div className="field">
                <label className="field-label" htmlFor="value">
                  {valueLabel}
                </label>
                <input
                  id="value"
                  className="input input-money"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onBlur={() => {
                    if (!value) return;
                    setInput(rsd(value));
                    share({});
                  }}
                  aria-describedby="value-hint"
                  aria-invalid={!r}
                />
                <p className="field-hint" id="value-hint">
                  {r ? "Iznos u dinarima, bez decimala." : "Unesite iznos veći od nule."}
                </p>
              </div>
            )}

            {s.extras?.map((e) => (
              <div className="field" key={e.key}>
                <label className="field-label" htmlFor={`count-${e.key}`}>
                  {e.label}
                </label>
                <input
                  id={`count-${e.key}`}
                  className="input"
                  type="number"
                  min={e.from}
                  step="1"
                  value={counts[e.key] ?? e.from}
                  onChange={(ev) => {
                    const next = { ...counts, [e.key]: Math.floor(Number(ev.target.value)) || 0 };
                    setCounts(next);
                    share({ counts: next });
                  }}
                />
              </div>
            ))}

            {s.late && (
              <div className="choice-list field">
                <label>
                  <input
                    type="checkbox"
                    checked={late}
                    onChange={(e) => {
                      setLate(e.target.checked);
                      share({ late: e.target.checked });
                    }}
                  />
                  Prijava se podnosi posle roka od 15 dana
                </label>
              </div>
            )}
          </form>

          <section className="calc-result" aria-labelledby="result-title">
            <p className="label" id="result-title">
              {resultLabel}
            </p>
            <p className="calc-total" aria-live="polite" aria-atomic="true">
              {r ? rsd(r.total) : "—"}
              <span className="visually-hidden"> dinara</span>
            </p>
            <p className="calc-currency" aria-hidden="true">
              RSD
            </p>
            {r && (
              <dl className="calc-breakdown">
                {r.lines.map((l) => (
                  <div key={l.label}>
                    <dt>
                      {l.label}
                      {l.basis && ` (${l.basis})`}
                    </dt>
                    <dd>{rsd(l.amount)}</dd>
                  </div>
                ))}
                <div className="total">
                  <dt>Ukupno</dt>
                  <dd>{rsd(r.total)} RSD</dd>
                </div>
              </dl>
            )}
            {r && <ShareLink params={toParams(state)} />}
            <div className="calc-notes">
              <strong>Važno</strong>
              <ul>{notes}</ul>
            </div>
          </section>
        </div>

        {sources}
      </div>
    </>
  );
}

export function AprFee() {
  return (
    <FeeCalculator
      label="APR"
      title="Kalkulator naknada APR"
      lede="Naknade Agencije za privredne registre za osnivanje, promenu podataka i brisanje privrednog društva, udruženja ili preduzetnika i za registar zaloge."
      resultLabel="Naknada APR"
      services={SERVICES}
      fee={aprFee}
      readQuery={readQuery}
      toParams={toParams}
      notes={
        <>
          <li>Naknada se plaća unapred, uz prijavu. Isti iznos važi za elektronsku i papirnu prijavu.</li>
          <li>
            Naknade za privredna društva, preduzetnike i udruženja uplaćuju se na račun 840-1308664-17, model 97, sa
            pozivom na broj koji generiše APR.
          </li>
          <li>Iznose APR usklađuje jednom godišnje sa indeksom potrošačkih cena.</li>
        </>
      }
      sources={
        <Sources law={LAW} basis="član 2–18" verifiedOn={VERIFIED_ON} sources={SOURCES}>
          naknada zavisi od onoga što se u prijavi zaista upisuje.
        </Sources>
      }
    />
  );
}
