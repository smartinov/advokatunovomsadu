import { team } from "../content";

const emails = team.map((m) => m.email);
const mailto = `mailto:${emails.join(",")}?subject=${encodeURIComponent("Prijava za advokatskog pripravnika")}`;

export function Trainees() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Pripravnici</p>
          <h1>Prijava za advokatske pripravnike</h1>
          <p className="lede">
            Diplomirani pravnici koji žele da obave pripravnički staž u advokaturi mogu nam poslati prijavu e-poštom.
          </p>
        </div>
      </section>
      <div className="container list-section">
        <section className="cta-card" aria-labelledby="apply-title">
          <h2 id="apply-title">Pošaljite prijavu</h2>
          <p>
            Priložite biografiju (CV) i napišite nekoliko rečenica o sebi. Prijava stiže svim advokatima kancelarije:{" "}
            {emails.join(", ")}.
          </p>
          <a href={mailto} className="btn btn-primary">
            Pošaljite prijavu e-poštom
          </a>
        </section>
      </div>
    </>
  );
}
