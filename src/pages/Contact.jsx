import { office, team } from "../content";
import { formatPhone } from "../components/Layout";

// No backend: the form composes an email in the visitor's own mail app.
function onSubmit(e) {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const subject = `Upit sa sajta: ${f.get("name")}`;
  const body = [f.get("message"), "", f.get("name"), f.get("phone")].join("\n").trim();
  window.location.href = `mailto:${f.get("to")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Kontakt</p>
          <h1>Pozovite ili pišite advokatu</h1>
          <p className="lede">Svaki advokat ima zaseban telefon i adresu e-pošte, navedene ispod. Sastanci se održavaju u kancelariji u Ulici Maksima Gorkog 10A.</p>
        </div>
      </section>
      <div className="container contact-grid">
        <div>
          <div className="info-block">
            <p className="label">Adresa</p>
            <address>
              {office.street}, {office.postalCode} {office.city}
            </address>
            <p>
              <a href={office.mapUrl} rel="noopener noreferrer" target="_blank">
                Otvori na Google mapama (novi prozor)
              </a>
            </p>
          </div>
          {team.map((m) => (
            <div className="info-block" key={m.slug}>
              <p className="label">{m.title}</p>
              <h2 className="h3-like">{m.name}</h2>
              <p>
                <a href={`tel:${m.phone}`}>{formatPhone(m.phone)}</a>
                <br />
                <a href={`mailto:${m.email}`}>{m.email}</a>
              </p>
            </div>
          ))}
        </div>

        <form className="contact-form" onSubmit={onSubmit} aria-labelledby="form-title">
          <h2 id="form-title" className="h3-like">
            Pošaljite upit e-poštom
          </h2>
          <div className="field">
            <label className="field-label" htmlFor="to">
              Advokat
            </label>
            <select id="to" name="to" className="select">
              {team.map((m) => (
                <option key={m.slug} value={m.email}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="field">
              <label className="field-label" htmlFor="name">
                Ime i prezime
              </label>
              <input id="name" name="name" className="input" autoComplete="name" required />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="phone">
                Telefon (nije obavezno)
              </label>
              <input id="phone" name="phone" type="tel" className="input" autoComplete="tel" />
            </div>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="message">
              Poruka
            </label>
            <textarea id="message" name="message" className="textarea" required />
          </div>
          <button type="submit" className="btn btn-primary">
            Otvori poruku u programu za e-poštu
          </button>
          <p className="form-note">
            Forma ne šalje podatke preko ovog sajta: otvara vaš program za e-poštu sa popunjenom porukom, koju zatim sami
            šaljete.
          </p>
        </form>
      </div>
    </>
  );
}
