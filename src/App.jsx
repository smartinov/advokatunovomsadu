import { GeneralProvider } from "./context/GeneralContext";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/700.css";
import "./styles/styles.scss";
import { Home } from "./components/Home/Home";
import { Articles } from "./components/Articles/articles";
import { Header } from "./components/Header/Header";
import { ArticlesProvider } from "./context/ArticlesContext";
import { useScroll, useTransform, motion } from "framer-motion";

function App({ page }) {
  const isArticles = page === "tekstovi";

  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <GeneralProvider>
      <ArticlesProvider>
        <div className="App">
          <Header isArticles={isArticles} />
          <main>{isArticles ? <Articles /> : <Home />}</main>
          <motion.div className="c-bottom-bg" style={{ y }}></motion.div>
        </div>
      </ArticlesProvider>
    </GeneralProvider>
  );
}

export default App;
