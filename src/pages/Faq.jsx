import { faq } from "../content";
import { href } from "../components/Layout";

export function Faq() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Česta pitanja</p>
          <h1>Pre prvog sastanka</h1>
          <p className="lede">
            Kratki odgovori o zakazivanju sastanka i troškovima. Za savet o vašem predmetu obratite se advokatu.
          </p>
        </div>
      </section>
      <div className="container">
        <div className="faq">
          {faq.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <div className="faq-answer">
                {item.a.map((p, i) =>
                  Array.isArray(p) ? (
                    <ul key={i}>
                      {p.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{p}</p>
                  )
                )}
                {item.link && <a href={href(item.link.path)}>{item.link.label}</a>}
              </div>
            </details>
          ))}
          <aside className="cta-card" aria-labelledby="cta-title">
            <h2 id="cta-title">Niste našli odgovor?</h2>
            <p>Pozovite ili pišite advokatu i dogovorite sastanak u kancelariji.</p>
            <a href={href("/kontakt/")} className="btn btn-primary">
              Kontakt advokata
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
