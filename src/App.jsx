import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "./styles/site.css";
import "./styles/pages.css";
import { Layout, href } from "./components/Layout";
import { Home } from "./pages/Home";
import { Articles } from "./pages/Articles";
import { Article } from "./pages/Article";
import { Calculator } from "./pages/Calculator";
import { Contact } from "./pages/Contact";

function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="label">Greška 404</p>
        <h1>Stranica nije pronađena</h1>
        <p className="lede">
          Adresa je možda promenjena. Pogledajte <a href={href("/tekstovi/")}>stručne tekstove</a> ili se vratite na{" "}
          <a href={href("/")}>početnu stranu</a>.
        </p>
      </div>
    </section>
  );
}

const PAGES = { home: Home, articles: Articles, article: Article, calculator: Calculator, contact: Contact, notfound: NotFound };

export default function App({ route }) {
  const Page = PAGES[route.page];
  return (
    <Layout page={route.page}>
      <Page slug={route.slug} />
    </Layout>
  );
}
