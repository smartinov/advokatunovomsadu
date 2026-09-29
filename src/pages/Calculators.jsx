import { routes } from "../routes";
import { href } from "../components/Layout";

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
        <ul className="calc-hub container">
          {routes
            .filter((r) => r.hub)
            .map((r) => (
              <li key={r.path}>
                <a href={href(r.path)}>
                  <h2>{r.title.split(" | ")[0]}</h2>
                  <p>{r.hub}</p>
                </a>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
