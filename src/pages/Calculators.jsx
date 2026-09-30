import { routes } from "../routes";
import { href } from "../components/Layout";

export function CalcHub({ Heading = "h2", className = "" }) {
  return (
    <ul className={`calc-hub ${className}`}>
      {routes
        .filter((r) => r.hub)
        .map((r) => (
          <li key={r.path}>
            <a href={href(r.path)}>
              <Heading>{r.title.split(" | ")[0]}</Heading>
              <p>{r.hub}</p>
            </a>
          </li>
        ))}
    </ul>
  );
}

export function Calculators() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Kalkulatori</p>
          <h1>Pravni kalkulatori</h1>
          <p className="lede">
            Takse, tarife i porezi koje plaćate u sudskom postupku, izvršenju, APR-u, katastru i poreskoj upravi, prema
            važećim propisima.
          </p>
        </div>
      </section>
      <section className="list-section">
        <CalcHub className="container" />
      </section>
    </>
  );
}
