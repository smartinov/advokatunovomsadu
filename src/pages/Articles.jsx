import { articles } from "../content";
import { href } from "../components/Layout";

export const readingMinutes = (a) => Math.max(1, Math.round(a.body.join(" ").split(/\s+/).length / 200));

export function ArticleCard({ article: a }) {
  return (
    <a className="article-card" href={href(`/tekstovi/${a.slug}/`)}>
      <span className="article-card-img">
        <img src={a.img} alt="" width="800" height="600" loading="lazy" />
      </span>
      <span className="meta">
        {a.tag} · {readingMinutes(a)} min čitanja
      </span>
      <h3>{a.title}</h3>
      <p>{a.lede}</p>
    </a>
  );
}

export function Articles() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Stručni tekstovi</p>
          <h1>Pravni tekstovi iz naše prakse</h1>
          <p className="lede">
            Porodično, radno, nasledno, krivično i privredno pravo: šta zakon propisuje, koji su rokovi i kako se
            postupak odvija.
          </p>
        </div>
      </section>
      <section className="list-section">
        <ul className="article-list container">
          {articles.map((a) => (
            <li key={a.slug}>
              <a className="article-row" href={href(`/tekstovi/${a.slug}/`)}>
                <span className="article-row-img">
                  <img src={a.img} alt="" width="800" height="600" loading="lazy" />
                </span>
                <div>
                  <h2>{a.title}</h2>
                  <p>{a.lede}</p>
                </div>
                <span className="meta">
                  <span>{a.tag}</span>
                  {readingMinutes(a)} min čitanja
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
