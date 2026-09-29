import React from "react";
import { DividerSide } from "../Decoratives/divider-side";
import aboutImg from "../../assets/images/aboutImg.webp";
import "./about.scss";

export const About = () => {
  return (
    <>
      <div className="c-about" id="about">
        <div className="c-about-text__container">
          <h2 className="c-about__heading">O nama</h2>
          <DividerSide />
          <p className="c-about__text">
            Advokat Dijana Biro, advokat Davor Marić i advokat Milan Nedić se
            bave stručnim pružanjem pravne pomoći koje pokrivaju veliki broj
            oblasti prava. Pružanje pravne pomoći advokati Dijana Biro, advokat
            Davor Marić i advokat Milan Nedić vrše pred sudovima svih
            nadležnosti, kao i pred svim drugim državnim organima i drugim
            subjektima. U društvu koje se bazira na vladavini prava, advokat
            Dijana Biro, advokat Davor Marić i advokat Milan Nedić imaju visoki
            stepen profesionalne odgovornosti, koja proističe iz obaveze da
            svoja znanja i sposobnosti podjednako posvete klijentima i
            interesima zakonitosti i pravde.
          </p>
        </div>
        <img
          className="c-about-img"
          src={aboutImg}
          alt="Advokatska kancelarija Marić, Nedić i Biro"
          loading="lazy"
        />
      </div>
    </>
  );
};
