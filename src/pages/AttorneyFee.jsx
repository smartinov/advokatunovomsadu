import { useState } from "react";
import {
  ACTIONS,
  CIVIL_MAX_VALUE,
  LAW,
  MODES,
  PENALTIES,
  POINT_VALUE,
  SOURCES,
  VERIFIED_ON,
  attorneyFee,
  readQuery,
  toParams,
} from "../advokatska";
import { rsd, parseRsd } from "../calc";
import { ShareLink, Sources, replaceQuery, useQueryOnLoad } from "../components/CalcParts";

const factorLabel = (f) => (f === 1 / 2 ? "1/2" : f);

export function AttorneyFee() {
  const [mode, setMode] = useState("parnica");
  const [action, setAction] = useState("tuzba");
  const [input, setInput] = useState("500.000");
  const [penalty, setPenalty] = useState("do-3");
  const value = parseRsd(input);
  const r = attorneyFee({ mode, action, value, penalty });
  const ok = r && !r.over;

  useQueryOnLoad((params) => {
    const q = readQuery(params);
    if (q.mode) setMode(q.mode);
    if (q.action) setAction(q.action);
    if (q.value) setInput(rsd(q.value));
    if (q.penalty) setPenalty(q.penalty);
  });

  const share = (next) => {
    const q = { mode, action, value, penalty, ...next };
    if (q.mode === "krivicni" || q.value > 0) replaceQuery(toParams(q));
  };

  const civil = mode === "parnica";

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Advokatska tarifa</p>
          <h1>Kalkulator advokatske tarife</h1>
          <p className="lede">
            Nagrada advokata za tužbu, ročište, žalbu ili odbranu u krivičnom postupku, prema Tarifi o nagradama i
            naknadama troškova za rad advokata.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="calc-wrap">
          <form className="calc-card" onSubmit={(e) => e.preventDefault()} aria-describedby="calc-source">
            <fieldset>
              <legend>Postupak</legend>
              <div className="segmented">
                {MODES.map((m) => (
                  <label key={m.id}>
                    <input
                      type="radio"
                      name="mode"
                      value={m.id}
                      checked={mode === m.id}
                      onChange={() => {
                        const first = ACTIONS[m.id][0].id;
                        setMode(m.id);
                        setAction(first);
                        share({ mode: m.id, action: first });
                      }}
                    />
                    {m.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Radnja advokata</legend>
              <div className="choice-list">
                {ACTIONS[mode].map((a) => (
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

            {civil ? (
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
                  aria-invalid={!ok}
                />
                <p className="field-hint" id="value-hint">
                  {r?.over
                    ? `Za spor vredniji od ${rsd(CIVIL_MAX_VALUE)} RSD nagrada zavisi od predmeta. Pitajte advokata.`
                    : r
                      ? "Iznos u dinarima, bez decimala."
                      : "Unesite vrednost veću od nule."}
                </p>
              </div>
            ) : (
              <fieldset>
                <legend>Zaprećena kazna za krivično delo</legend>
                <div className="choice-list">
                  {PENALTIES.map((p) => (
                    <label key={p.id}>
                      <input
                        type="radio"
                        name="penalty"
                        value={p.id}
                        checked={penalty === p.id}
                        onChange={() => {
                          setPenalty(p.id);
                          share({ penalty: p.id });
                        }}
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </form>

          <section className="calc-result" aria-labelledby="result-title">
            <p className="label" id="result-title">
              Nagrada advokata
            </p>
            <p className="calc-total" aria-live="polite" aria-atomic="true">
              {ok ? rsd(r.total) : "—"}
              <span className="visually-hidden"> dinara</span>
            </p>
            <p className="calc-currency" aria-hidden="true">
              RSD, bez PDV-a
            </p>
            {ok && (
              <dl className="calc-breakdown">
                <div>
                  <dt>
                    Osnovica:{" "}
                    {civil
                      ? `Tarifni broj 13, vrednost ${rsd(value)} RSD`
                      : `Tarifni broj 1, ${PENALTIES.find((p) => p.id === penalty).label.toLowerCase()}`}
                  </dt>
                  <dd>{rsd(r.base)} poena</dd>
                </div>
                <div>
                  <dt>
                    {r.action.label}: {r.action.share} ({r.action.basis})
                  </dt>
                  <dd>× {factorLabel(r.action.factor)}</dd>
                </div>
                {r.attendance > 0 && (
                  <div>
                    <dt>Prisustvo, prvi započeti sat ({r.action.basis})</dt>
                    <dd>+ {r.attendance} poena</dd>
                  </div>
                )}
                <div>
                  <dt>Vrednost poena (član 15)</dt>
                  <dd>
                    {rsd(r.points)} × {POINT_VALUE} RSD
                  </dd>
                </div>
                <div className="total">
                  <dt>Ukupno</dt>
                  <dd>{rsd(r.total)} RSD</dd>
                </div>
              </dl>
            )}
            {ok && <ShareLink params={toParams({ mode, action, value, penalty })} />}
            <div className="calc-notes">
              <strong>Važno</strong>
              <ul>
                <li>Advokat koji je obveznik PDV-a na nagradu dodaje i PDV (član 13).</li>
                <li>
                  Za prisustvo na ročištu ili pretresu advokatu pripada i 100 poena za svaki započeti sat. U nagradu za
                  ročište i pretres uračunat je prvi sat.
                </li>
                <li>
                  Na nagradu za radnje obračunava se i paušalna naknada troškova od 2% za poštanske, telefonske i slične
                  usluge (član 9).
                </li>
                <li>Kada advokat zastupa više stranaka, nagrada se za drugu i svaku narednu stranku uvećava za 50%.</li>
                <li>
                  Advokat i stranka mogu pisano ugovoriti drugačiju nagradu, ali ne manju od polovine tarifne (član 4).
                </li>
                {!civil && <li>Zaprećenu kaznu propisuje zakon za svako krivično delo. Ako niste sigurni, pitajte advokata.</li>}
              </ul>
            </div>
          </section>
        </div>

        <Sources law={LAW} basis="član 9, tarifni brojevi 1, 3–5, 13, 15 i 16" verifiedOn={VERIFIED_ON} sources={SOURCES}>
          nagrada zavisi i od toka postupka i dogovora sa advokatom.
        </Sources>
      </div>
    </>
  );
}
