import { useRef, useState } from "react";
import { articles, fields, sayings, team, teamSummary, values } from "../content";
import { formatPhone, href } from "../components/Layout";

const sentence = (s) => s.charAt(0).toUpperCase() + s.slice(1) + (/[.!?]$/.test(s) ? "" : ".");
import { ArticleCard } from "./Articles";
import bannerBg from "../assets/images/bannerBg.webp";
import aboutImg from "../assets/images/aboutImg.webp";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${bannerBg})` }} aria-hidden="true" />
      <div className="hero-content container">
        <p className="label">Maksima Gorkog 10A · Novi Sad</p>
        <h1>
          Advokati u Novom Sadu
          <em>Marić, Nedić i Biro</em>
        </h1>
        <p className="hero-lede">
          Zastupamo klijente pred sudovima svih nadležnosti i pred državnim organima: krivični i prekršajni postupci,
          parnice, porodični i radni sporovi, privredno pravo, naknada štete i naplata potraživanja.
        </p>
        <div className="hero-actions">
          <a href={href("/kontakt/")} className="btn btn-primary">
            Kontakt advokata
          </a>
          <a href={href("/sudska-taksa/")} className="btn btn-ghost">
            Izračunajte sudsku taksu
          </a>
        </div>
      </div>
    </section>
  );
}

function Sayings() {
  const [i, setI] = useState(0);
  const s = sayings[i];
  return (
    <section className="sayings" aria-label="Latinske pravne izreke">
      <blockquote lang="la" aria-live="polite">
        <p className="saying-latin">{s.latin}</p>
        <p className="saying-translation" lang="sr">
          {s.translation}
        </p>
      </blockquote>
      <button type="button" className="saying-next" onClick={() => setI((i + 1) % sayings.length)}>
        Sledeća izreka ({i + 1}/{sayings.length})
      </button>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="o-nama">
      <div className="container about-grid">
        <div className="about-image">
          <img src={aboutImg} alt="" width="640" height="800" loading="lazy" />
        </div>
        <div className="about-text">
          <p className="label">O nama</p>
          <h2>Tri advokata, jedna kancelarija</h2>
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
            <p>{sentence(v.desc)}</p>
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
  const [member, setMember] = useState(team[0]);
  const open = (m) => {
    setMember(m);
    dialog.current.showModal();
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
                <span className="member-summary">{teamSummary[m.slug]}</span>
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
        <div className="member-dialog-inner">
          <div className="member-dialog-img">
            <img src={member.img} alt={member.name} width="600" height="800" />
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
        <button type="button" className="dialog-close" onClick={() => dialog.current.close()} aria-label="Zatvori">
          ×
        </button>
      </dialog>
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
      <Sayings />
      <About />
      <Values />
      <Fields />
      <Team />
      <LatestArticles />
    </>
  );
}
