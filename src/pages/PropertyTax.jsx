import { useState } from "react";
import { LAW, MODES, RELATIONS, SOURCES, VERIFIED_ON, propertyTax, readQuery, toParams } from "../porez";
import { rsd, parseRsd } from "../calc";
import { ShareLink, Sources, replaceQuery, useQueryOnLoad } from "../components/CalcParts";

export function PropertyTax() {
  const [mode, setMode] = useState("prenos");
  const [relation, setRelation] = useState("potomak");
  const [pdv, setPdv] = useState(false);
  const [input, setInput] = useState("10.000.000");
  const value = parseRsd(input);
  const state = { mode, relation, pdv, value };
  const r = propertyTax(state);
  const sale = mode === "prenos";

  useQueryOnLoad((params) => {
    const q = readQuery(params);
    if (q.mode) setMode(q.mode);
    if (q.relation) setRelation(q.relation);
    if (q.pdv) setPdv(true);
    if (q.value) setInput(rsd(q.value));
  });

  const share = (next) => {
    const q = { ...state, ...next };
    if (q.value > 0) replaceQuery(toParams(q));
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Porezi</p>
          <h1>Kalkulator poreza na prenos, nasleđe i poklon</h1>
          <p className="lede">
            Porez na prenos apsolutnih prava kod kupoprodaje nepokretnosti i porez na nasleđe i poklon, prema Zakonu o
            porezima na imovinu.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="calc-wrap">
          <form className="calc-card" onSubmit={(e) => e.preventDefault()} aria-describedby="calc-source">
            <fieldset>
              <legend>Osnov sticanja</legend>
              <div className="segmented">
                {MODES.map((m) => (
                  <label key={m.id}>
                    <input
                      type="radio"
                      name="mode"
                      value={m.id}
                      checked={mode === m.id}
                      onChange={() => {
                        setMode(m.id);
                        share({ mode: m.id });
                      }}
                    />
                    {m.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {sale ? (
              <fieldset>
                <legend>Prodaja</legend>
                <div className="choice-list">
                  {[
                    [false, "Bez PDV-a, npr. polovan stan ili kuća"],
                    [true, "Sa PDV-om, npr. prvi prenos novogradnje od investitora"],
                  ].map(([withPdv, label]) => (
                    <label key={label}>
                      <input
                        type="radio"
                        name="pdv"
                        checked={pdv === withPdv}
                        onChange={() => {
                          setPdv(withPdv);
                          share({ pdv: withPdv });
                        }}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <fieldset>
                <legend>{mode === "nasledje" ? "Naslednik je ostaviocu" : "Poklonoprimac je poklonodavcu"}</legend>
                <div className="choice-list">
                  {RELATIONS.map((x) => (
                    <label key={x.id}>
                      <input
                        type="radio"
                        name="relation"
                        value={x.id}
                        checked={relation === x.id}
                        onChange={() => {
                          setRelation(x.id);
                          share({ relation: x.id });
                        }}
                      />
                      {x.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="field">
              <label className="field-label" htmlFor="value">
                {sale ? "Ugovorena cena (RSD)" : "Tržišna vrednost imovine (RSD)"}
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
              {sale ? "Porez na prenos apsolutnih prava" : "Porez na nasleđe i poklon"}
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
                  <dt>Osnovica: {sale ? "ugovorena cena" : "tržišna vrednost"}</dt>
                  <dd>{rsd(value)}</dd>
                </div>
                <div>
                  <dt>{r.rate ? `Stopa (${r.basis})` : `Oslobođeno poreza (${r.basis})`}</dt>
                  <dd>{rsd(r.rate)}%</dd>
                </div>
                <div className="total">
                  <dt>Ukupno</dt>
                  <dd>{rsd(r.total)} RSD</dd>
                </div>
              </dl>
            )}
            {r && <ShareLink params={toParams(state)} />}
            <div className="calc-notes">
              <strong>Važno</strong>
              {sale ? (
                <ul>
                  <li>
                    Porez plaća prodavac. Kupac jemči za porez ako ga prodavac ne plati, a solidarno ako je ugovorom
                    preuzeo njegovo plaćanje (članovi 25 i 42).
                  </li>
                  <li>
                    Osnovica je ugovorena cena. Ako je niža od tržišne, poreski organ u roku od 60 dana od prijave može
                    porez utvrditi na tržišnu vrednost (član 27).
                  </li>
                  <li>
                    Kupac prvog stana ne plaća porez na do 40 m² i na do 15 m² za svakog člana porodičnog domaćinstva
                    koji od 1. jula 2006. nije imao stan, ako ispunjava uslove iz člana 31a.
                  </li>
                  <li>
                    Za ugovor koji je overio javni beležnik poreska prijava se ne podnosi. Porez se plaća u roku od 15
                    dana od dostavljanja rešenja (članovi 34 i 40).
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    Osnovica je tržišna vrednost koju utvrđuje poreski organ. Kod nasleđa se umanjuje za dugove i
                    troškove koje naslednik plaća iz nasleđa (član 16).
                  </li>
                  <li>
                    Srodnik drugog naslednog reda ne plaća porez na jedan stan ako je sa ostaviocem, odnosno
                    poklonodavcem, živeo u zajedničkom domaćinstvu najmanje godinu dana (član 21).
                  </li>
                  <li>
                    Novac i pokretne stvari do 100.000 dinara godišnje od istog lica ne oporezuju se (član 14). Za
                    nepokretnosti taj prag ne važi.
                  </li>
                  <li>Porez se plaća u roku od 15 dana od dostavljanja rešenja (član 40).</li>
                </ul>
              )}
            </div>
          </section>
        </div>

        <Sources
          law={LAW}
          basis="porez na nasleđe i poklon (članovi 14–22) i porez na prenos apsolutnih prava (članovi 23–42)"
          verifiedOn={VERIFIED_ON}
          sources={SOURCES}
        >
          porez rešenjem utvrđuje poreska uprava grada ili opštine u kojoj se nalazi nepokretnost.
        </Sources>
      </div>
    </>
  );
}
