import { useState } from "react";
import { ACTIONS, COURTS, LAW, SOURCES, VERIFIED_ON, courtFee, readQuery, toParams } from "../taksa";
import { rsd, parseRsd } from "../calc";
import { ShareLink, Sources, replaceQuery, useQueryOnLoad } from "../components/CalcParts";

export function Calculator() {
  const [court, setCourt] = useState("opsti");
  const [action, setAction] = useState("tuzba");
  const [input, setInput] = useState("500.000");
  const value = parseRsd(input);
  const r = courtFee({ court, action, value });

  useQueryOnLoad((params) => {
    const q = readQuery(params);
    if (q.court) setCourt(q.court);
    if (q.action) setAction(q.action);
    if (q.value) setInput(rsd(q.value));
  });

  const share = (next) => {
    const q = { court, action, value, ...next };
    if (q.value > 0) replaceQuery(toParams(q));
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Sudska taksa</p>
          <h1>Kalkulator sudske takse</h1>
          <p className="lede">
            Taksa za tužbu, presudu, žalbu, reviziju ili predlog za izvršenje, prema vrednosti predmeta spora i Taksenoj
            tarifi Zakona o sudskim taksama.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="calc-wrap">
          <form className="calc-card" onSubmit={(e) => e.preventDefault()} aria-describedby="calc-source">
            <fieldset>
              <legend>Sud</legend>
              <div className="segmented">
                {COURTS.map((c) => (
                  <label key={c.id}>
                    <input
                      type="radio"
                      name="court"
                      value={c.id}
                      checked={court === c.id}
                      onChange={() => {
                        setCourt(c.id);
                        share({ court: c.id });
                      }}
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Radios rather than a select: the longer tariff labels must wrap on phones. */}
            <fieldset>
              <legend>Podnesak ili odluka</legend>
              <div className="choice-list">
                {ACTIONS.map((a) => (
                  <label key={a.id}>
                    <input
                      type="radio"
                      name="action"
                      value={a.id}
                      checked={action === a.id}
                      onChange={() => {
                        setAction(a.id);
                        share({ action: a.id });
                      }}
                    />
                    {a.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label className="field-label" htmlFor="value">
                Vrednost predmeta spora (RSD)
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
                {r ? "Iznos u dinarima, bez decimala." : "Unesite vrednost veću od nule."}
              </p>
            </div>
          </form>

          <section className="calc-result" aria-labelledby="result-title">
            <p className="label" id="result-title">
              Sudska taksa
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
                <div>
                  <dt>
                    Osnovica: {r.court.basis}, vrednost {rsd(value)} RSD
                  </dt>
                  <dd>{rsd(r.base)}</dd>
                </div>
                <div>
                  <dt>
                    {r.action.label}: {r.action.share} ({r.action.basis})
                  </dt>
                  <dd>× {r.action.factor === 1 / 3 ? "1/3" : r.action.factor === 1 / 2 ? "1/2" : r.action.factor}</dd>
                </div>
                <div className="total">
                  <dt>Ukupno</dt>
                  <dd>{rsd(r.total)} RSD</dd>
                </div>
              </dl>
            )}
            {r && <ShareLink params={toParams({ court, action, value })} />}
            <div className="calc-notes">
              <strong>Važno</strong>
              <ul>
                <li>
                  Stranke se oslobađaju takse ako se parnični postupak okonča do zaključenja prvog ročišta za glavnu
                  raspravu posredovanjem, mirnim rešavanjem radnog spora, sudskim poravnanjem, priznanjem ili odricanjem od
                  tužbenog zahteva (član 9).
                </li>
                <li>Kada je u sporu pred privrednim sudom jedna stranka fizičko lice koje nije preduzetnik, plaća se taksa kao pred sudom opšte nadležnosti.</li>
                <li>
                  Takse su oslobođena, između ostalih, lica koja zahtevaju zakonsko izdržavanje ili isplatu minimalne
                  zarade (član 9). Sud može osloboditi i stranku čija bi socijalna sigurnost bila ugrožena (član 10).
                </li>
              </ul>
            </div>
          </section>
        </div>

        <Sources law={LAW} basis="Taksena tarifa, tarifni brojevi 1–3" verifiedOn={VERIFIED_ON} sources={SOURCES}>
          taksa zavisi i od okolnosti predmeta.
        </Sources>
      </div>
    </>
  );
}
