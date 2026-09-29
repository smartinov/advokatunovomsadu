import React, { useEffect, useRef, useState } from "react";
import { Logo } from "../Icons/Logo/logo";
import { AnimatePresence, motion } from "framer-motion";
import { slideIn, slideInFade } from "../../animations/SlideIn.animaiton";
import { clickable } from "../../a11y";
import "./header.scss";

const home = import.meta.env.BASE_URL;
const articles = `${home}tekstovi`;

export const Header = ({ isArticles }) => {
  const header = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const scrollListener = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (window.scrollY > window.innerHeight - 50) {
        if (scrollTop > lastScrollTop) {
          header.current.className = "c-header c-header--short hide";
          setOpen(false);
        } else {
          header.current.className = "c-header c-header--short";
        }

        lastScrollTop = scrollTop;

        return;
      }

      header.current.className = "c-header";
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <>
      <header ref={header} className="c-header">
        <a className="c-logo-wrapper" href={home} aria-label="Početna">
          <Logo customClass="c-icon c-icon--logo" />
        </a>
        <nav className="c-header-nav-wrapper c-header-nav-wrapper--desktop">
          <ul className="c-header-nav">
            {!isArticles ? (
              <>
                <a href="#" className="c-header__link">
                  Početak
                </a>
                <a href="#about" className="c-header__link">
                  O Nama
                </a>
                <a href="#services" className="c-header__link">
                  Oblasti Rada
                </a>
                <a href="#our-team" className="c-header__link">
                  Upoznaj naš tim
                </a>
                <a href="#footer" className="c-header__link">
                  Kontakt
                </a>
                <a href={articles} className="c-header__link">
                  Stručni Tekstovi
                </a>
              </>
            ) : (
              <a href={home} className="c-header__link">
                Početna
              </a>
            )}
          </ul>
        </nav>
        <nav className="c-header-nav-wrapper c-header-nav-wrapper--mobile">
          <div
            className={`c-hamburger ${open && "open"}`}
            aria-label="Meni"
            aria-expanded={open}
            {...clickable(() => setOpen(!open))}
          >
            <div className="c-line-holder">
              <div className="c-line"></div>
              <div className="c-line"></div>
              <div className="c-line"></div>
            </div>
          </div>
          <AnimatePresence>
            {open && (
              <motion.ul
                className="c-header-nav"
                variants={slideIn}
                initial="initial"
                animate="open"
                exit="initial"
              >
                {!isArticles ? (
                  <>
                    <motion.a
                      variants={slideInFade}
                      onClick={() => setOpen(!open)}
                      href="#"
                      className="c-header__link"
                    >
                      Početna
                    </motion.a>
                    <motion.a
                      variants={slideInFade}
                      onClick={() => setOpen(!open)}
                      href="#about"
                      className="c-header__link"
                    >
                      O Nama
                    </motion.a>
                    <motion.a
                      variants={slideInFade}
                      onClick={() => setOpen(!open)}
                      href="#services"
                      className="c-header__link"
                    >
                      Oblasti Rada
                    </motion.a>
                    <motion.a
                      variants={slideInFade}
                      onClick={() => setOpen(!open)}
                      href="#our-team"
                      className="c-header__link"
                    >
                      Upoznaj Naš Tim
                    </motion.a>
                    <motion.a
                      variants={slideInFade}
                      onClick={() => setOpen(!open)}
                      href="#footer"
                      className="c-header__link"
                    >
                      Kontakt
                    </motion.a>
                    <motion.a
                      variants={slideInFade}
                      href={articles}
                      className="c-header__link"
                    >
                      Stručni Tekstovi
                    </motion.a>
                  </>
                ) : (
                  <motion.a
                    variants={slideInFade}
                    href={home}
                    className="c-header__link"
                  >
                    Početna
                  </motion.a>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
};
