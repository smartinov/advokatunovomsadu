import { useEffect, useRef, useState } from "react";
import { articles, fields, sayings, team, values } from "../content";
import { formatPhone, href } from "../components/Layout";
import { ArticleCard } from "./Articles";
import { CalcHub } from "./Calculators";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content container">
        <p className="label">Maksima Gorkog 10A · Novi Sad</p>
        <h1>
          Advokati u Novom Sadu
          <em>Marić, Nedić i Biro</em>
        </h1>
        <p className="hero-lede">
          Pred sudovima svih nadležnosti i državnim organima zastupamo klijente u krivičnim i prekršajnim postupcima,
          parnicama, porodičnim i radnim sporovima, kao i u predmetima privrednog prava, naknade štete i naplate
          potraživanja.
        </p>
        <div className="hero-actions">
          <a href={href("/kontakt/")} className="btn btn-primary">
            Kontakt advokata
          </a>
          <a href={href("/kalkulatori/")} className="btn btn-ghost">
            Kalkulator troškova
          </a>
        </div>
      </div>
    </section>
  );
}

// ponytail: text length approximates rendered height; measure in the DOM if a saying still shifts the layout
const tallestSaying = sayings.reduce((a, b) =>
  b.latin.length + b.translation.length > a.latin.length + a.translation.length ? b : a,
);

function SayingText({ saying }) {
  return (
    <>
      <p className="saying-latin">{saying.latin}</p>
      <p className="saying-translation" lang="sr">
        {saying.translation}
      </p>
    </>
  );
}

function Sayings() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto || held) return;
    const timer = setInterval(() => setI((n) => (n + 1) % sayings.length), 8000);
    return () => clearInterval(timer);
  }, [auto, held]);

  return (
    <section
      className="sayings"
      aria-label="Latinske pravne izreke"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      {/* Rotation stays silent for screen readers; only a user-chosen saying is announced. */}
      <blockquote lang="la" aria-live={auto ? "off" : "polite"}>
        <div className="saying-slot" aria-hidden="true">
          <SayingText saying={tallestSaying} />
        </div>
        <div key={i} className="saying">
          <SayingText saying={sayings[i]} />
        </div>
      </blockquote>
      <div className="saying-controls">
        <button
          type="button"
          className="saying-btn"
          onClick={() => {
            // Hover and focus already sit on this button, so an explicit start must override them.
            setHeld(false);
            setAuto(!auto);
          }}
        >
          {auto ? "Pauziraj" : "Pokreni"}
        </button>
        <button
          type="button"
          className="saying-btn"
          onClick={() => {
            setAuto(false);
            setI((i + 1) % sayings.length);
          }}
        >
          Sledeća izreka ({i + 1}/{sayings.length})
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="o-nama">
      <div className="container">
        <div className="about-text">
          <p className="label">O nama</p>
          <h2>Advokati u Novom Sadu</h2>
          <p>
            Advokat Dijana Biro, advokat Davor Marić i advokat Milan Nedić bave se stručnim pružanjem pravne pomoći u
            velikom broju oblasti prava, pred sudovima svih nadležnosti, kao i pred svim drugim državnim organima i
            drugim subjektima.
          </p>
          <p>
            U društvu koje se zasniva na vladavini prava imamo visok stepen profesionalne odgovornosti, koja proističe
            iz obaveze da svoja znanja i sposobnosti podjednako posvetimo klijentima i interesima zakonitosti i pravde.
          </p>
          <ul className="facts">
            <li>
              <strong>Advokatska komora</strong> Članovi Advokatske komore Vojvodine
            </li>
            <li>
              <strong>Sertifikati</strong> Odbrana maloletnih učinilaca i zastupanje maloletnih oštećenih, medijacija,
              zaštita od nasilja u porodici
            </li>
            <li>
              <strong>Jezici</strong> Srpski, engleski, ruski
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="values" aria-labelledby="nacela">
      <h2 id="nacela" className="visually-hidden">
        Načela zastupanja
      </h2>
      <ul className="values-grid">
        {values.map((v) => (
          <li className="value" key={v.title}>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Fields() {
  return (
    <section className="section" id="oblasti-rada">
      <div className="container">
        <div className="section-head">
          <p className="label">Oblasti rada</p>
          <h2>Čime se bavimo</h2>
        </div>
        <ol className="fields-list">
          {fields.map((f, i) => (
            <li className="field-row" key={f.title}>
              <span className="field-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Team() {
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const [member, setMember] = useState(team[0]);
  const open = (m) => {
    setMember(m);
    dialog.current.showModal();
    // The dialog would otherwise focus its first link, scrolled below the fold on phones.
    closeButton.current.focus();
  };
  return (
    <section className="section team" id="tim">
      <div className="container">
        <div className="section-head">
          <p className="label">Naš tim</p>
          <h2>Advokati</h2>
        </div>
        <ul className="team-grid">
          {team.map((m) => (
            <li key={m.slug}>
              <button type="button" className="member" onClick={() => open(m)} aria-haspopup="dialog">
                <span className="member-image">
                  <img src={m.img} alt="" width="600" height="800" loading="lazy" />
                </span>
                <span className="member-role">{m.title}</span>
                <span className="member-name">{m.name}</span>
                <span className="member-summary">{m.summary}</span>
                <span className="member-more">Biografija i kontakt</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <dialog
        ref={dialog}
        className="member-dialog"
        aria-labelledby="member-dialog-title"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <button type="button" className="dialog-close" ref={closeButton} onClick={() => dialog.current.close()} aria-label="Zatvori">
          ×
        </button>
        <div className="member-dialog-inner">
          <div className="member-dialog-img">
            <img src={member.img} alt="" width="600" height="800" />
          </div>
          <div className="member-dialog-body">
            <p className="label">{member.title}</p>
            <h2 id="member-dialog-title">{member.name}</h2>
            {member.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="member-contact">
              <a href={`mailto:${member.email}`}>{member.email}</a>
              <a href={`tel:${member.phone}`}>{formatPhone(member.phone)}</a>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}

function Calculators() {
  return (
    <section className="section" id="kalkulatori">
      <div className="container">
        <div className="section-head">
          <p className="label">Kalkulatori</p>
          <h2>Takse, tarife i porezi</h2>
        </div>
      </div>
      <CalcHub Heading="h3" className="container" />
    </section>
  );
}

function LatestArticles() {
  return (
    <section className="section more">
      <div className="container">
        <div className="section-head head-row">
          <div>
            <p className="label">Stručni tekstovi</p>
            <h2>Iz naše prakse</h2>
          </div>
          <a href={href("/tekstovi/")} className="nav-link">
            Svi tekstovi ({articles.length})
          </a>
        </div>
        <ul className="articles-grid">
          {articles.slice(0, 3).map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Values />
      <Fields />
      <Team />
      <Sayings />
      <Calculators />
      <LatestArticles />
    </>
  );
}
