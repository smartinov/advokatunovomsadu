import React, { useContext } from "react";
import { DividerCenter } from "../Decoratives/divider-center";
import "./our-work.scss";
import GeneralContext from "../../context/GeneralContext";
import { WorkCard } from "../WorkCard/work-card";

export const OurWork = () => {
  const { values } = useContext(GeneralContext);

  return (
    <>
      <div className="c-our-work">
        <h2 className="c-our-work__heading">
          Ovo su naša načela zastupanja klijenata
        </h2>
        <p className="c-our-work__text">
          Pouzdanje u tajnost podataka koje je klijent preneo advokatu od suštinske je važnosti za pružanje pravne pomoći, pravnu sigurnost i sprovođenje pravde. Privilegija poverljivosti u odnosima advokata i klijenta predstavlja ljudsko pravo, bitnu pretpostavku stručnog i savesnog zastupanja i nezamenljiv uslov nezavisnosti i samostalnosti advokatske profesije i to je princip kojim se vodimo sa svim klijentima.
        </p>
        <DividerCenter />
        <div className="c-our-work__content-holder">
          {values.map((work, index) => (
            <WorkCard
              title={work.type}
              img={work.img}
              desc={work.desc}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};
