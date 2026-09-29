import { useState } from "react";
import {
  COLLECTIONS,
  LAW,
  SOURCES,
  SUBJECTS,
  VAT,
  VERIFIED_ON,
  enforcementFee,
  readQuery,
  toParams,
} from "../izvrsitelj";
import { rsd, parseRsd } from "../calc";
import { ShareLink, Sources, replaceQuery, useQueryOnLoad } from "../components/CalcParts";

export function EnforcementFee() {
  const [collection, setCollection] = useState("redovno");
  const [subject, setSubject] = useState("ostalo");
  const [vat, setVat] = useState("ne");
  const [input, setInput] = useState("500.000");
  const value = parseRsd(input);
  const r = enforcementFee({ value, collection, subject, vat });

  useQueryOnLoad((params) => {
    const q = readQuery(params);
    if (q.collection) setCollection(q.collection);
    if (q.subject) setSubject(q.subject);
    if (q.vat) setVat(q.vat);
    if (q.value) setInput(rsd(q.value));
  });

  const share = (next) => {
    const q = { value, collection, subject, vat, ...next };
    if (q.value > 0) replaceQuery(toParams(q));
  };

  const radios = (name, options, current, set, key) =>
    options.map((o) => (
      <label key={o.id}>
        <input
          type="radio"
          name={name}
          value={o.id}
          checked={current === o.id}
          onChange={() => {
            set(o.id);
            share({ [key]: o.id });
          }}
        />
        {o.label}
      </label>
    ));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Javnoizvršiteljska tarifa</p>
          <h1>Kalkulator troškova javnog izvršitelja</h1>
          <p className="lede">
            Naknada za pripremu i vođenje predmeta i nagrada za uspešnost javnog izvršitelja, prema visini novčanog
            potraživanja i Javnoizvršiteljskoj tarifi.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="calc-wrap">
          <form className="calc-card" onSubmit={(e) => e.preventDefault()} aria-describedby="calc-source">
            <div className="field">
              <label className="field-label" htmlFor="value">
                Glavni dug (RSD)
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
                {r ? "Bez kamate i troškova, u dinarima." : "Unesite iznos veći od nule."}
              </p>
            </div>

            {/* Radios rather than a select: the longer labels must wrap on phones. */}
            <fieldset>
              <legend>Kako se dug naplaćuje</legend>
              <div className="choice-list">{radios("collection", COLLECTIONS, collection, setCollection, "collection")}</div>
            </fieldset>

            <fieldset>
              <legend>Predmet izvršenja</legend>
              <div className="choice-list">{radios("subject", SUBJECTS, subject, setSubject, "subject")}</div>
            </fieldset>

            <fieldset>
              <legend>Javni izvršitelj je obveznik PDV-a</legend>
              <div className="segmented">{radios("vat", VAT, vat, setVat, "vat")}</div>
            </fieldset>
          </form>

          <section className="calc-result" aria-labelledby="result-title">
            <p className="label" id="result-title">
              Naknada javnog izvršitelja
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
                  <dt>Priprema, vođenje i arhiviranje predmeta, deo predujma (Tarifni broj 1)</dt>
                  <dd>{rsd(r.preparation)}</dd>
                </div>
                <div>
                  <dt>Nagrada za uspešnost ako se naplati ceo dug ({r.collection.note})</dt>
                  <dd>{rsd(r.success)}</dd>
                </div>
                {r.tax > 0 && (
                  <div>
                    <dt>PDV 20%</dt>
                    <dd>{rsd(r.tax)}</dd>
                  </div>
                )}
                <div className="total">
                  <dt>Ukupno</dt>
                  <dd>{rsd(r.total)} RSD</dd>
                </div>
              </dl>
            )}
            {r && <ShareLink params={toParams({ value, collection, subject, vat })} />}
            <div className="calc-notes">
              <strong>Važno</strong>
              <ul>
                <li>
                  Predujam uplaćuje izvršni poverilac, a troškove na kraju snosi izvršni dužnik (član 2). Nagrada za
                  uspešnost računa se od iznosa koji je stvarno naplaćen (član 12).
                </li>
                <li>
                  Posebno se plaćaju pojedinačne radnje i stvarni troškovi (Tarifni broj 2), na primer dostavljanje
                  poštom 525 RSD, lično dostavljanje rešenja dužniku 1.125 RSD i sastavljanje rešenja ili zaključka 20%
                  naknade iz Tarifnog broja 1, bez PDV-a.
                </li>
                <li>
                  Naknada raste ako u postupku ima više stranaka ili se radnja preduzima van radnog vremena (član 19).
                  Za postupke pokrenute pre 4. marta 2023. važi niža vrednost boda.
                </li>
              </ul>
            </div>
          </section>
        </div>

        <Sources law={LAW} basis="tarifni brojevi 1 i 3, članovi 9–15 i 18" verifiedOn={VERIFIED_ON} sources={SOURCES}>
          stvarni iznos predujma javni izvršitelj određuje zaključkom, prema radnjama u predmetu.
        </Sources>
      </div>
    </>
  );
}
