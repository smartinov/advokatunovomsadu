import { useEffect, useState } from "react";
import { href } from "./Layout";
import { rsd } from "../calc";

// Applies a shared link after hydration, so the prerendered first render stays the default calculation.
export function useQueryOnLoad(apply) {
  useEffect(() => apply(new URLSearchParams(location.search)), []);
}

// Called on user changes only, so a plain visit keeps a clean URL.
export const replaceQuery = (params) => history.replaceState(null, "", "?" + new URLSearchParams(params));

export function ShareLink({ params }) {
  const [status, setStatus] = useState("");
  const copy = () => {
    const url = location.origin + location.pathname + "?" + new URLSearchParams(params);
    navigator.clipboard.writeText(url).then(
      () => setStatus("Link je kopiran."),
      () => setStatus(`Kopirajte link: ${url}`),
    );
  };
  return (
    <div className="calc-share">
      <button type="button" className="btn btn-ghost" onClick={copy}>
        Kopiraj link do obračuna
      </button>
      <p role="status">{status}</p>
    </div>
  );
}

// VERIFIED_ON is ISO so machines can read it; readers see the Serbian d. m. yyyy. form.
export const formatDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${Number(d)}. ${Number(m)}. ${y}.`;
};

// Worked examples prerendered as a table, so readers and crawlers that run no JavaScript still get real amounts.
export function Examples({ rows }) {
  return (
    <table className="calc-examples">
      <caption>Primeri obračuna</caption>
      <thead>
        <tr>
          <th scope="col">Primer</th>
          <th scope="col">Iznos (RSD)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, amount]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{rsd(amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Sources({ law, basis, verifiedOn, sources, children }) {
  return (
    <div className="calc-source" id="calc-source">
      <p>
        Izvor: {law}, {basis}. Iznose smo proverili <time dateTime={verifiedOn}>{formatDate(verifiedOn)}</time>{" "}
        Kalkulator daje iznos prema propisu i ne zamenjuje
        pravni savet: {children}{" "}
        <a href={href("/kontakt/")}>Pitajte advokata</a>.
      </p>
      <ul>
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url}>{s.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
