import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { office, team } from "../content";

// Root-relative site path to a URL that works under the GitHub Pages subpath too.
export const href = (path) => import.meta.env.BASE_URL + path.replace(/^\//, "");

const NAV = [
  { path: "/#o-nama", label: "O nama" },
  { path: "/#oblasti-rada", label: "Oblasti rada" },
  { path: "/#tim", label: "Naš tim" },
  { path: "/tekstovi/", label: "Stručni tekstovi", page: ["articles", "article"] },
  {
    path: "/kalkulatori/",
    label: "Kalkulatori",
    page: ["calculators", "calculator", "attorneyFee", "enforcementFee", "aprFee", "cadastreFee", "propertyTax"],
  },
  { path: "/cesta-pitanja/", label: "Česta pitanja", page: ["faq"] },
  { path: "/kontakt/", label: "Kontakt", page: ["contact"] },
];

function navHref(path, page) {
  // On the home page, section links stay in-page instead of reloading it.
  return page === "home" && path.startsWith("/#") ? path.slice(1) : href(path);
}

function Header({ page, open, setOpen }) {
  const overHero = page === "home";
  const [dark, setDark] = useState(overHero);
  const toggle = useRef(null);

  useEffect(() => {
    if (!overHero) return;
    const hero = document.querySelector(".hero");
    const update = () => setDark(window.scrollY < hero.offsetHeight - 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [overHero]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current.focus();
    };
    // Past the menu breakpoint the toggle is hidden, so an open menu could not be closed.
    const wide = window.matchMedia("(min-width: 1081px)");
    const onWide = (e) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open, setOpen]);

  const links = (onClick) =>
    NAV.map((n) => (
      <a
        key={n.path}
        href={navHref(n.path, page)}
        className={onClick ? undefined : "nav-link"}
        aria-current={n.page?.includes(page) ? "page" : undefined}
        onClick={onClick}
      >
        {n.label}
      </a>
    ));

  return (
    <>
      <header className={`site-header${dark && !open ? " dark" : ""}`}>
        <a href={href("/")} className="brand">
          <Logo className="brand-logo" />
          <span className="brand-text">
            <span className="l1">Marić · Nedić · Biro</span>
            <span className="l2">Advokati u Novom Sadu</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Glavna navigacija">
          {links()}
        </nav>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-controls="mobile-nav"
          aria-expanded={open}
          aria-label={open ? "Zatvori meni" : "Otvori meni"}
          onClick={() => setOpen(!open)}
        >
          <span className="bars" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </header>
      <nav id="mobile-nav" className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobilna navigacija" inert={!open}>
        {links(() => setOpen(false))}
        <address>
          {office.street}
          <br />
          {office.postalCode} {office.city}
        </address>
      </nav>
    </>
  );
}

function Footer({ inert }) {
  return (
    <footer className="site-footer" inert={inert}>
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-brand">
            <Logo className="brand-logo" />
            <h2>Marić · Nedić · Biro</h2>
          </div>
          <address>
            {office.street}
            <br />
            {office.postalCode} {office.city}
          </address>
          <a href={office.mapUrl} rel="noopener noreferrer" target="_blank">
            Mapa (otvara se u novom prozoru)
          </a>
        </div>
        {team.map((m) => (
          <div className="footer-col" key={m.slug}>
            <h2>{m.name}</h2>
            <a href={`mailto:${m.email}`}>{m.email}</a>
            <a href={`tel:${m.phone}`}>{formatPhone(m.phone)}</a>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>Advokatska kancelarija Marić, Nedić i Biro</span>
        <span>
          <a href={href("/tekstovi/")}>Stručni tekstovi</a> · <a href={href("/kalkulatori/")}>Kalkulatori</a> ·{" "}
          <a href={href("/cesta-pitanja/")}>Česta pitanja</a> · <a href={href("/pripravnici/")}>Pripravnici</a> ·{" "}
          <a href={href("/kontakt/")}>Kontakt</a>
        </span>
      </div>
    </footer>
  );
}

// +381637457275 -> +381 63 745 7275
export const formatPhone = (p) => p.replace(/^\+381(\d{2})(\d{3})(\d+)$/, "+381 $1 $2 $3");

export function Layout({ page, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a href="#main" className="skip-link">
        Preskoči na sadržaj
      </a>
      <Header page={page} open={menuOpen} setOpen={setMenuOpen} />
      {/* The open menu covers the page; inert keeps keyboard focus out of what is hidden behind it. */}
      <main id="main" tabIndex={-1} inert={menuOpen}>
        {children}
      </main>
      <Footer inert={menuOpen} />
    </>
  );
}
