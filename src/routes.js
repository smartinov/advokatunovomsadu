import { articles } from "./content";

export const SITE = "https://www.advokatunovomsadu.rs";

export const routes = [
  {
    path: "/",
    page: "home",
    title: "Advokati u Novom Sadu | Marić, Nedić i Biro",
    description:
      "Advokatska kancelarija Marić, Nedić i Biro, Maksima Gorkog 10A, Novi Sad. Krivično, parnično, porodično, radno i privredno pravo, naknada štete i naplata potraživanja.",
  },
  {
    path: "/tekstovi/",
    page: "articles",
    title: "Stručni pravni tekstovi | Advokati Novi Sad",
    description:
      "Tekstovi advokata iz Novog Sada o razvodu braka, nasilju u porodici, otkazu ugovora o radu, naknadi štete, naplati duga i osnivanju firme.",
  },
  ...articles.map((a) => ({
    path: `/tekstovi/${a.slug}/`,
    page: "article",
    slug: a.slug,
    title: `${a.title} | Advokati Novi Sad`,
    description: a.lede,
  })),
  {
    path: "/sudska-taksa/",
    page: "calculator",
    title: "Kalkulator sudske takse | Advokati Novi Sad",
    description:
      "Izračunajte sudsku taksu za tužbu, presudu, žalbu, reviziju ili predlog za izvršenje prema Taksenoj tarifi Zakona o sudskim taksama.",
  },
  {
    path: "/kontakt/",
    page: "contact",
    title: "Kontakt | Advokati Marić, Nedić i Biro, Novi Sad",
    description:
      "Adresa, telefoni i e-pošta advokata Davora Marića, Milana Nedića i Dijane Biro. Maksima Gorkog 10A, 21000 Novi Sad.",
  },
];

export const notFound = {
  path: "/404.html",
  page: "notfound",
  title: "Stranica nije pronađena | Advokati Novi Sad",
  description: "Tražena stranica ne postoji.",
  noindex: true,
};

export const findRoute = (path) =>
  routes.find((r) => r.path === path || r.path === `${path}/`) ?? notFound;
