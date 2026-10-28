import { articles } from "./content.js";
import { VERIFIED_ON as taksa } from "./taksa.js";
import { VERIFIED_ON as advokatska } from "./advokatska.js";
import { VERIFIED_ON as izvrsitelj } from "./izvrsitelj.js";
import { VERIFIED_ON as beleznik } from "./beleznik.js";
import { VERIFIED_ON as apr } from "./apr.js";
import { VERIFIED_ON as katastar } from "./katastar.js";
import { VERIFIED_ON as porez } from "./porez.js";

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
    title: "Stručni pravni tekstovi | Advokati u Novom Sadu",
    description:
      "Tekstovi advokata iz Novog Sada o razvodu braka, nasilju u porodici, otkazu ugovora o radu, naknadi štete, naplati duga i osnivanju firme.",
  },
  ...articles.map((a) => ({
    path: `/tekstovi/${a.slug}/`,
    page: "article",
    article: a,
    title: `${a.title} | Advokati u Novom Sadu`,
    description: a.lede,
  })),
  {
    path: "/kalkulatori/",
    page: "calculators",
    title: "Kalkulatori troškova | Advokati u Novom Sadu",
    description:
      "Kalkulatori sudske takse, advokatske, javnoizvršiteljske i javnobeležničke tarife, naknada APR-a, taksi za katastar i poreza na prenos, nasleđe i poklon.",
  },
  {
    path: "/sudska-taksa/",
    page: "calculator",
    verified: taksa,
    hub: "Taksa za tužbu, presudu, žalbu, reviziju ili predlog za izvršenje prema vrednosti spora.",
    title: "Kalkulator sudske takse | Advokati u Novom Sadu",
    description:
      "Izračunajte sudsku taksu za tužbu, presudu, žalbu, reviziju ili predlog za izvršenje prema Taksenoj tarifi Zakona o sudskim taksama.",
  },
  {
    path: "/advokatska-tarifa/",
    page: "attorneyFee",
    verified: advokatska,
    hub: "Nagrada advokata za tužbu, ročište, žalbu ili odbranu u krivičnom postupku prema Advokatskoj tarifi.",
    title: "Kalkulator advokatske tarife | Advokati u Novom Sadu",
    description:
      "Izračunajte nagradu advokata po Tarifi o nagradama i naknadama troškova za rad advokata za parnični i krivični postupak.",
  },
  {
    path: "/javnoizvrsiteljska-tarifa/",
    page: "enforcementFee",
    verified: izvrsitelj,
    hub: "Troškovi javnog izvršitelja i nagrada za uspešnost prema visini potraživanja.",
    title: "Kalkulator javnoizvršiteljske tarife | Advokati u Novom Sadu",
    description:
      "Izračunajte troškove javnog izvršitelja za pripremu i sprovođenje izvršenja i nagradu za uspešnost prema Javnoizvršiteljskoj tarifi.",
  },
  {
    path: "/javnobeleznicka-tarifa/",
    page: "notaryFee",
    verified: beleznik,
    hub: "Nagrada javnog beležnika za solemnizaciju ugovora, overu potpisa i prepisa, punomoćje i testament.",
    title: "Kalkulator javnobeležničke tarife | Advokati u Novom Sadu",
    description:
      "Koliko košta javni beležnik: izračunajte nagradu za overu ugovora o kupoprodaji, overu potpisa i prepisa, punomoćje i testament, sa troškovima i PDV-om.",
  },
  {
    path: "/apr-naknade/",
    page: "aprFee",
    verified: apr,
    hub: "Naknade za osnivanje, promene i brisanje privrednog društva ili preduzetnika i za registar zaloge.",
    title: "Kalkulator naknada APR | Advokati u Novom Sadu",
    description:
      "Naknade Agencije za privredne registre za osnivanje, promenu podataka i brisanje privrednog društva ili preduzetnika i za registar zaloge.",
  },
  {
    path: "/katastar-takse/",
    page: "cadastreFee",
    verified: katastar,
    hub: "Takse za upis svojine, hipoteke i zabeležbe i za list nepokretnosti u katastru.",
    title: "Kalkulator taksi za katastar | Advokati u Novom Sadu",
    description:
      "Republičke administrativne takse za upis prava svojine, hipoteke i zabeležbe u katastar nepokretnosti i za izvod iz lista nepokretnosti.",
  },
  {
    path: "/porez-na-prenos-i-nasledje/",
    page: "propertyTax",
    verified: porez,
    hub: "Porez na prenos apsolutnih prava pri kupoprodaji i porez na nasleđe i poklon.",
    title: "Kalkulator poreza na prenos, nasleđe i poklon | Advokati u Novom Sadu",
    description:
      "Izračunajte porez na prenos apsolutnih prava pri kupoprodaji nepokretnosti i porez na nasleđe i poklon prema Zakonu o porezima na imovinu.",
  },
  {
    path: "/cesta-pitanja/",
    page: "faq",
    title: "Česta pitanja | Advokati u Novom Sadu",
    description:
      "Kako zakazati sastanak sa advokatom u Novom Sadu, šta poneti na prvi sastanak i kako se obračunavaju troškovi advokata i sudske takse.",
  },
  {
    path: "/pripravnici/",
    page: "trainees",
    title: "Advokatski pripravnici | Advokati u Novom Sadu",
    description:
      "Prijava za pripravnički staž u advokatskoj kancelariji Marić, Nedić i Biro u Novom Sadu. Pošaljite biografiju e-poštom.",
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
  title: "Stranica nije pronađena | Advokati u Novom Sadu",
  description: "Tražena stranica ne postoji.",
  noindex: true,
};

export const findRoute = (path) =>
  routes.find((r) => r.path === path || r.path === `${path}/`) ?? notFound;
