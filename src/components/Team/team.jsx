import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GeneralContext from "../../context/GeneralContext";
import { DividerSide } from "../Decoratives/divider-side";
import { heightMotion } from "../../animations/heightSwitch.animation";
import { clickable } from "../../a11y";
import "./team.scss";
import { Modal } from "../Modal/modal";
import { FieldsOfWork } from "../FieldOfWork/fields-of-work";
import { Interns } from "../Interns/interns";

export const Team = () => {
  const { ourTeam } = useContext(GeneralContext);
  const [hoverState, setHoverState] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const holder = useRef(null);

  // Hover-expanding a member while the page scrolls under a still pointer cancels smooth anchor scrolling.
  useEffect(() => {
    let timer;
    const onScroll = () => {
      holder.current.style.pointerEvents = "none";
      clearTimeout(timer);
      timer = setTimeout(() => (holder.current.style.pointerEvents = ""), 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="c-team">
        <FieldsOfWork />
        <h2 className="c-team__title">Upoznajte naš tim</h2>
        <DividerSide />
        <div className="c-team__holder" id="our-team" ref={holder}>
          {ourTeam.map((member, index) => {
            return (
              <div
                className={`c-member__image-wrapper ${
                  hoverState === index ? "active" : ""
                }`}
                key={`${index}img`}
                aria-label={member.name}
                {...clickable(() => {
                  modalOpen ? closeModal() : openModal();
                  setHoverState(index);
                  setModalData(index);
                })}
              >
                <img
                  className="c-member__image"
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                />
              </div>
            );
          })}
          {ourTeam.map((member, index) => {
            return (
              <motion.div
                className={`c-member__name ${
                  hoverState === index ? "active" : ""
                } `}
                initial="initial"
                whileHover="hover"
                animate="initial"
                key={`${index}name`}
                onHoverStart={() => setHoverState(index)}
                onFocus={() => setHoverState(index)}
                {...clickable(() => {
                  modalOpen ? closeModal() : openModal();
                  setModalData(index);
                })}
              >
                <div className="c-member-text-wrapper">
                  <p className="c-member__title">{member.title}</p>
                  <h5 className="c-member__full-name">{member.name}</h5>
                  <img
                    alt=""
                    src={member.logo}
                    className="c-member__logo"
                    loading="lazy"
                  ></img>
                </div>
                <motion.p className="c-member__desc" variants={heightMotion}>
                  {member.desc}
                </motion.p>
              </motion.div>
            );
          })}
          <AnimatePresence>
            {modalOpen && (
              <Modal
                modalOpen={modalOpen}
                handleClose={closeModal}
                data={ourTeam[modalData]}
              />
            )}
          </AnimatePresence>
        </div>
        <Interns />
      </div>
    </>
  );
};
