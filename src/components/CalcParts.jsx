import { useEffect, useState } from "react";
import { href } from "./Layout";

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

export function Sources({ law, basis, verifiedOn, sources, children }) {
  return (
    <div className="calc-source" id="calc-source">
      <p>
        Izvor: {law}, {basis}. Iznose smo proverili {verifiedOn} Kalkulator daje iznos prema propisu i ne zamenjuje
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
