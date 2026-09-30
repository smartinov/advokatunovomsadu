import { articles } from "../content";
import { href } from "../components/Layout";
import { ArticleCard, readingMinutes } from "./Articles";

export function Article({ article: a }) {
  const others = articles.filter((x) => x !== a).slice(0, 3);
  return (
    <article>
      <div className="progress" aria-hidden="true" />
      <header className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Putanja">
            <ol>
              <li>
                <a href={href("/")}>Početna</a>
              </li>
              <li>
                <a href={href("/tekstovi/")}>Stručni tekstovi</a>
              </li>
              <li aria-current="page">{a.tag}</li>
            </ol>
          </nav>
          <h1>{a.title}</h1>
          <p className="lede">{a.lede}</p>
          <p className="article-meta meta">
            <span className="tag">{a.tag}</span>
            <span>{readingMinutes(a)} min čitanja</span>
          </p>
          <div className="article-cover">
            <img src={a.img} alt="" width="1200" height="514" />
          </div>
        </div>
      </header>
      <div className="container article-layout">
        <div className="article-body">
          {a.body.map((b, i) =>
            b.h2 ? (
              <h2 key={i}>{b.h2}</h2>
            ) : b.h3 ? (
              <h3 key={i}>{b.h3}</h3>
            ) : b.ul ? (
              <ul key={i}>
                {b.ul.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b}</p>
            ),
          )}
        </div>
        <div className="article-aside">
          <aside className="cta-card" aria-labelledby="cta-title">
            <h2 id="cta-title">Treba vam pravni savet?</h2>
            <p>Za savet o svom predmetu pozovite advokata ili mu pišite i dogovorite sastanak u kancelariji.</p>
            <a href={href("/kontakt/")} className="btn btn-primary">
              Kontakt advokata
            </a>
          </aside>
        </div>
      </div>
      <section className="section more" aria-labelledby="more-title">
        <div className="container">
          <h2 id="more-title" className="section-head">
            Još tekstova
          </h2>
          <ul className="articles-grid">
            {others.map((o) => (
              <li key={o.slug}>
                <ArticleCard article={o} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
