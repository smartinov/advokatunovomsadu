import { useState } from "react";
import { office, team } from "../content";
import { formatPhone, href } from "../components/Layout";

const compose = (form) => {
  const f = new FormData(form);
  return {
    to: f.get("to"),
    subject: `Upit sa sajta: ${f.get("name")}`,
    body: [f.get("message"), "", f.get("name"), f.get("phone")].join("\n").trim(),
  };
};

export function Contact() {
  const [to, setTo] = useState(team[0].email);
  const [copyStatus, setCopyStatus] = useState("");

  // No backend: the form composes an email in the visitor's own mail app.
  const onSubmit = (e) => {
    e.preventDefault();
    const m = compose(e.currentTarget);
    window.location.href = `mailto:${m.to}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;
  };

  // Fallback for visitors without a mail app configured.
  const onCopy = async (e) => {
    const form = e.currentTarget.form;
    if (!form.reportValidity()) return;
    const m = compose(form);
    try {
      await navigator.clipboard.writeText(`${m.subject}\n\n${m.body}`);
      setCopyStatus(`Poruka je kopirana. Nalepite je u novu e-poruku na adresu ${m.to}.`);
    } catch {
      setCopyStatus(`Kopiranje nije uspelo. Kopirajte tekst iz polja „Poruka“ ručno i pošaljite ga na adresu ${m.to}.`);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="label">Kontakt</p>
          <h1>Pozovite ili pišite advokatu</h1>
          <p className="lede">
            Telefoni i adrese e-pošte advokata navedeni su ispod. Sastanci se održavaju u kancelariji u Ulici
            Maksima Gorkog 10A. Šta da ponesete na prvi sastanak, pročitajte u <a href={href("/cesta-pitanja/")}>čestim
            pitanjima</a>.
          </p>
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
          <div className="info-block">
            <p className="label">Pripravnici</p>
            <p>
              <a href={href("/pripravnici/")}>Prijava za advokatske pripravnike</a>
            </p>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit} aria-labelledby="form-title">
          <h2 id="form-title" className="h3-like">
            Pošaljite upit e-poštom
          </h2>
          <div className="field">
            <label className="field-label" htmlFor="to">
              Advokat
            </label>
            <select id="to" name="to" className="select" value={to} onChange={(e) => setTo(e.target.value)}>
              {team.map((m) => (
                <option key={m.slug} value={m.email}>
                  {m.name}
                </option>
              ))}
            </select>
            <p className="field-hint">Adresa primaoca: {to}</p>
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
            <textarea
              id="message"
              name="message"
              className="textarea"
              aria-describedby="message-hint"
              required
            />
            <p className="field-hint" id="message-hint">
              Ukratko opišite o čemu se radi i da li teče neki rok. Dokumente ponesite na sastanak.
            </p>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Otvori poruku u programu za e-poštu
            </button>
            <button type="button" className="btn btn-ghost" onClick={onCopy}>
              Kopiraj poruku
            </button>
          </div>
          <p className="form-note">
            Forma ne šalje podatke preko ovog sajta: otvara vaš program za e-poštu sa popunjenom porukom, koju zatim sami
            šaljete.{" "}
            <span aria-live="polite">
              {copyStatus || "Ako se program ne otvori, kopirajte poruku i pošaljite je sa svoje adrese."}
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
